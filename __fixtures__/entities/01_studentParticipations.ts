import { TStudentParticipationEntity } from "../../src/functions/interface";

export const StudentParticipation2: TStudentParticipationEntity[] = [
  {
    id: "01-1",
    parentId: "41374a41-2bda-404f-b11c-6e007deb61b4-ladokCoursRoundId",
    hashedStudentId: "0cd086ab-78ee-4b7c-a785-29821b364111-hashedStudentId",
    ladokCourseRoundId:
      "41374a41-2bda-404f-b11c-6e007deb61b4-ladokCoursRoundId",
    canvasSisId: "u9sebbe0",
    name: "Sebastian Sebsson",
    email: "sebbe@example.com",
    roles: ["student"],
    program: {
      code: "ARKIT",
      name: "Arkitektur",
      required: "obligatorisk",
      startTerm: "20171",
      studyYear: 4,
    },
  },
  {
    id: "01-2",
    parentId: "41374a41-2bda-404f-b11c-6e007deb61b4-ladokCoursRoundId",
    hashedStudentId: "4c18639a-7e9d-4ebc-9f90-92b40cbd5508-hashedStudentId",
    ladokCourseRoundId:
      "41374a41-2bda-404f-b11c-6e007deb61b4-ladokCoursRoundId",
    canvasSisId: "u9marta0",
    name: "Marta Martsdottir",
    email: "Marta@example.com",
    roles: ["student"],
    program: {
      code: "ARKIT",
      name: "Arkitektur",
      required: "obligatorisk",
      startTerm: "20171",
      studyYear: 4,
    },
  },
];
