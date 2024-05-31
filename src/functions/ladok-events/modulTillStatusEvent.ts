import { InvocationContext } from "@azure/functions";
import { TLadokAttributvarde, TLadokEventContext } from "./types";
import { isValidEvent } from "../utils";
import { Database } from "../db";
import { TCourseRoundEntity, TCourseRoundModuleEntity } from "../interface";
import { getGradingScheme } from "ladok-integration";

export type TModulTillStatusEvent = {
  HandelseUID: string; // "6b79e669-9505-11ee-a0ce-a9a57d284dbd",
  EventContext: TLadokEventContext;
  OrganisationUID: string; // "e842afc9-73d6-11e8-8c58-f9aa7f7e4fb6",
  Status: number; // 2,
  UtbildningUID: string; // "6b741a06-9505-11ee-a0ce-a9a57d284dbd",
  Attributvarde: TLadokAttributvarde[];
  /*
    {
      "Grupp": 0,
      "Namn": "utbildning.attribut.betygsskala",
      "Varde": "131657",
      "Uid": "6b7419ff-9505-11ee-a0ce-a9a57d284dbd"
    },
    {
      "Grupp": 0,
      "Namn": "utbildning.attribut.titel.ska.anges",
      "Varde": "false",
      "Uid": "6b741a00-9505-11ee-a0ce-a9a57d284dbd"
    },
    {
      "Grupp": 0,
      "Namn": "utbildning.attribut.utbildningsomrade.organisation",
      "Varde": "e842afc9-73d6-11e8-8c58-f9aa7f7e4fb6",
      "Uid": "6b741a01-9505-11ee-a0ce-a9a57d284dbd"
    },
    {
      "Grupp": 0,
      "Namn": "utbildning.attribut.utbildningsomrade",
      "Varde": "2",
      "Uid": "6b741a02-9505-11ee-a0ce-a9a57d284dbd"
    },
    {
      "Grupp": 0,
      "Namn": "utbildning.attribut.utbildningsomrade.procent",
      "Varde": "100",
      "Uid": "6b741a03-9505-11ee-a0ce-a9a57d284dbd"
    }
  */
  UtbildningsinstansUID: string; // "6b741a05-9505-11ee-a0ce-a9a57d284dbd",
  UtbildningstypID: number; // 4,
  Benamningar: {
    Benamning: {
      Sprakkod: string; // "en",
      Text: string; // "Testmodule 1239"
    }[];
  };
  EnhetID: number; // 2,
  Omfattningsvarde: string; // "10.0",
  StudieordningID: number; // 1,
  UtbildningsformID: number; // 1,
  Utbildningskod: string; // "1239",
  Versionsinformation: {
    GiltigFranPeriodID: {
      value: number; // 151878
    };
    Versionsnummer: number; // 1,
    ArSenasteVersion: boolean; // true,
    Uid: string; // "6b741a04-9505-11ee-a0ce-a9a57d284dbd"
  };
  OverliggandeUtbildningUID: string; // "e51b9586-9501-11ee-a0ce-a9a57d284dbd",
  OverliggandeUtbildningsinstansUID: string; // "e51b9585-9501-11ee-a0ce-a9a57d284dbd",
  BetygsskalaID: number; // 131657,
  TitelSkaAnges: boolean; // false,
  Utbildningsomradesfordelning: {
    UtbildningsomradenPerOrganisation: {
      OrganisationUID: string; // "e842afc9-73d6-11e8-8c58-f9aa7f7e4fb6",
      Procent: number; // 100,
      UtbildningsomradeID: number; // 2
    }[];
  };
};

enum MODUL_STATUS {
  active = 2,
}

function convertBenamningToName(
  inp: TModulTillStatusEvent["Benamningar"]["Benamning"],
  lang: "en" | "sv",
) {
  return inp.reduce<string | undefined>((prev, curr) => {
    if (prev) return prev;
    if (curr["Sprakkod"] === lang) return curr["Text"];
  }, undefined);
}

function convertBetygsskalaToGradingScheme(id: number): string[] {
  const gradingScheme = getGradingScheme(id);
  return gradingScheme.grades.map((grade) => grade.code);
}

export default async function handler(
  message: TModulTillStatusEvent,
  context: InvocationContext,
  db: Database,
): Promise<void> {
  if (
    !isValidEvent(
      "se.ladok.schemas.utbildningsinformation.ModulTillStatusEvent",
      context?.triggerMetadata?.userProperties,
    )
  )
    return;

  const ladokCourseRoundId = message.OverliggandeUtbildningsinstansUID;
  const moduleId = message.UtbildningsinstansUID;
  const moduleCode = message.Utbildningskod;
  const moduleStatus = message.Status;

  context.log(
    `ModulTillStatusEvent: ${ladokCourseRoundId} ${moduleCode} ${moduleStatus}`,
  );

  try {
    // If we don't have the course round, we can't update the module
    // so we create a thin dummy
    const courseRound = await db.fetchById<TCourseRoundEntity>(
      ladokCourseRoundId,
      "CourseRound",
    );

    const language = courseRound?.language ?? 'sv';

    const newModule: TCourseRoundModuleEntity = {
      moduleRoundId: moduleId, //
      code: moduleCode,
      canceled: moduleStatus !== MODUL_STATUS.active,
      name:
        convertBenamningToName(message.Benamningar.Benamning, language) ??
        "",
      credits: message.Omfattningsvarde,
      gradingScheme: convertBetygsskalaToGradingScheme(
        message.BetygsskalaID,
      ),
    };

    // Add module if it doesn't exist, otherwise update
    let updatedModules = courseRound?.modules ?? [];
    if (updatedModules.find(m => m.code === moduleCode)) {
      updatedModules = courseRound.modules.map((module) => module.code !== moduleCode ? module : {...module, status: moduleStatus});
    } else {
      updatedModules = [...updatedModules, newModule];
    }
    
    await db.upsert<TCourseRoundEntity>(
      ladokCourseRoundId,
      { modules: updatedModules, },
      "CourseRound",
    );
  } finally {
    await db.close();
  }
}
