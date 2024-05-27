import { TStudentParticipationEntity } from "../../src/functions/interface";

export const studentParticipations1: TStudentParticipationEntity[] = [
  {
    id: "01-1",
    // parentId: "41374a41-2bda-404f-b11c-6e007deb61b4-ladokCoursRoundId",
    ladokStudentId: "0cd086ab-78ee-4b7c-a785-29821b364111-studentId",
    ladokCourseId: "d682b090-e019-4fdf-8675-f10233394e12-ladokCourseId",
    ladokCourseRoundId:
      "41374a41-2bda-404f-b11c-6e007deb61b4-ladokCoursRoundId",
    canvasSisId: "u9sebbe0",
    name: "Sebastian Sebsson",
    email: "sebbe@example.com",
    roles: ["student"],
    locations: [],
    program: {
      code: "ARKIT",
      name: { sv: "Arkitektur", en: "Arkitektur" },
      required: "O",
      startTerm: "20221",
      studyYear: 4,
    },
  },
  {
    id: "01-2",
    // parentId: "41374a41-2bda-404f-b11c-6e007deb61b4-ladokCoursRoundId",
    ladokStudentId: "4c18639a-7e9d-4ebc-9f90-92b40cbd5508-studentId",
    ladokCourseId: "d682b090-e019-4fdf-8675-f10233394e12-ladokCourseId",
    ladokCourseRoundId:
      "41374a41-2bda-404f-b11c-6e007deb61b4-ladokCoursRoundId",
    canvasSisId: "u9marta0",
    name: "Marta Martsdottir",
    email: "Marta@example.com",
    roles: ["student"],
    locations: [],
    program: {
      code: "ARKIT",
      name: { sv: "Arkitektur", en: "Arkitektur"},
      required: "O",
      startTerm: "20221",
      studyYear: 4,
    },
  },
];
