/**
 * This script is used to seed the database with some initial data.
 */
import { Database } from "../functions/utils";
import { courseRound1 } from "../../__fixtures__/entities/01_courseRound";
import { courseRound2 } from "../../__fixtures__/entities/02_courseRound";
import { reportedResults1 } from "../../__fixtures__/entities/01_reportedResults";
import { reportedResults2 } from "../../__fixtures__/entities/02_reportedResults";
import { studentParticipations1 } from "../../__fixtures__/entities/01_studentParticipations";
import { studentParticipations2 } from "../../__fixtures__/entities/02_studentParticipations";

async function main() {
  const db = new Database();
  await db.connect();

  await db.insert(courseRound1, "CourseRound");
  await db.insert(courseRound2, "CourseRound");

  for (const reportedResult of reportedResults1) {
    await db.insert(reportedResult, "ReportedResult");
  }
  for (const reportedResult of reportedResults2) {
    await db.insert(reportedResult, "ReportedResult");
  }

  for (const studentParticipation of studentParticipations1) {
    await db.insert(studentParticipation, "StudentParticipation");
  }
  for (const studentParticipation of studentParticipations2) {
    await db.insert(studentParticipation, "StudentParticipation");
  }

  await db.close();
}

main();
