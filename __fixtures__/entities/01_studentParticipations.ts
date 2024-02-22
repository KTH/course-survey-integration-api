import { TStudentParticipationEntity } from "../../src/functions/interface";

export const StudentParticipation2: TStudentParticipationEntity[] = [
  {
    id: "1",
    parentId: "41374a41-2bda-404f-b11c-6e007deb61b4-ladokCoursRoundId",
    hashedStudentId: "0cd086ab-78ee-4b7c-a785-29821b364111",
    ladokCourseRoundId: "41374a41-2bda-404f-b11c-6e007deb61b4-ladokCoursRoundId",
    canvasSisId: "u9sebbe0",
    name: "Sebastian Sebsson",
    email: "sebbe@example.com",
    roles: ["student"],
    program: {
      code: "ARKIT",
      name: "Arkitektur",
      required: "mandatory?",
      startTerm: "20171",
      studyYear: 4,
    }
  }
]
