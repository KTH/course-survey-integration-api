import "dotenv/config";
import {
  getCurrentUser,
  getKurstillfallesdeltagande,
  getStudiestruktur,
} from "./src/api";
import { diffTerms, findStudiestruktur, getTermFromDate } from "./src/utils";

async function main() {
  const u = await getCurrentUser();
  console.log(u.Anvandarnamn);
  // return;
  // const studentUID = "dbdcb20b-2c55-11ee-998a-6a4f18c04b6e";
  // const tillfalleUID = "2df97a56-76eb-11ed-99dd-9bc8699d49f1";

  // Med "barn"
  const studentUID = "63a138cf-f042-11eb-8cb6-0bb93b844502";
  const tillfalleUID = "83702026-7b7f-11ed-83fc-99df00a14a2f";
  const d = await getKurstillfallesdeltagande(studentUID);

  const d1 = d.Tillfallesdeltaganden.find(
    (t) => t.Utbildningsinformation.UtbildningstillfalleUID === tillfalleUID,
  );

  if (d1?.Studiestrukturreferens) {
    const s = await getStudiestruktur(studentUID);

    const arr = findStudiestruktur(
      d1.Studiestrukturreferens,
      s.Studiestrukturer,
    );

    if (arr.length === 0) {
      // TODO: this is an error
      return;
    }

    const courseRoundStartTerm = getTermFromDate(
      d1.Utbildningsinformation.Studieperiod.Startdatum,
    );
    const program = arr[0];
    const programStartTerm = getTermFromDate(
      program.Utbildningsinformation.Studieperiod.Startdatum,
    );
    const diff = diffTerms(courseRoundStartTerm, programStartTerm);
    const studyYear = Math.floor(diff / 2) + 1;
    const programData = {
      code: program.Utbildningsinformation.Utbildningskod,
      name: program.Utbildningsinformation.Benamning,
      startTerm: programStartTerm,
      studyYear,
    };

    if (arr.length === 1) {
      return programData;
    }

    const specialization = arr[1];
    const specializationData = {
      code: specialization.Utbildningsinformation.Utbildningskod,
      name: specialization.Utbildningsinformation.Benamning,
    };

    if (arr.length === 2) {
      return {
        ...programData,
        specification: specializationData,
      };
    }

    // TODO: this is an error
    return;
  }
}

main().then((r) => {
  console.log(r);
});
