/**
 * This script is used to seed the database with some initial data.
 * 
 * Set up the database connection in .env file.
 * 
 *   COSMOSDB_CONNECTION_STRING="..."
 * 
 * Usage:
 * 
 *   npx ts-node src/scripts/seed-database.ts
 * 
 */
import "./config";
import { Database, DbCollectionName } from "../functions/utils";
import { courseRound1 } from "../../__fixtures__/entities/01_courseRound";
import { courseRound2 } from "../../__fixtures__/entities/02_courseRound";
import { reportedResults1 } from "../../__fixtures__/entities/01_reportedResults";
import { reportedResults2 } from "../../__fixtures__/entities/02_reportedResults";
import { studentParticipations1 } from "../../__fixtures__/entities/01_studentParticipations";
import { studentParticipations2 } from "../../__fixtures__/entities/02_studentParticipations";


async function updateOrInsert(db: Database, id: string, entity: any, collection: DbCollectionName): Promise<void> {
  if (await db.fetchById(id, collection)) {
    await db.update(id, entity, collection)
  } else {
    await db.insert(entity, collection);
  }
}

async function main() {
  const db = new Database();
  await db.connect();

  for (const courseRound of [courseRound1, courseRound2]) {
    await updateOrInsert(db, courseRound.id, courseRound, "CourseRound")
  }

  for (const reportedResult of [...reportedResults1, ...reportedResults2]) {
    await updateOrInsert(db, reportedResult.id, reportedResult, "ReportedResult")
  }

  for (const studentParticipation of [...studentParticipations1, ...studentParticipations2]) {
    await updateOrInsert(db, studentParticipation.id, studentParticipation, "StudentParticipation")
  }

  await db.close();
}

main();
