import { TStudentParticipationEntity } from "../../src/functions/interface";

export const studentParticipations2: TStudentParticipationEntity[] = [
  {
    id: "02-1",
    // parentId: "d682b090-e019-4fdf-8675-f10233394e12-ladokCoursRoundId",
    ladokStudentId: "4cf163f8-c2a5-4f32-9eaf-4447341cfe99-studentId",
    ladokCourseId: "d682b090-e019-4fdf-8675-f10233394e12-ladokCourseId",
    ladokCourseRoundId:
      "d682b090-e019-4fdf-8675-f10233394e12-ladokCoursRoundId",
    canvasSisId: "u9rasmus",
    name: "Rasmus Rasmusson",
    email: "rust@example.com",
    roles: ["student"],
    locations: [],
    program: {
      code: "BIO",
      name: { sv: "Biologi och bioteknik", en: "Biologi och bioteknik" },
      required: "O",
      startTerm: "20231",
      studyYear: 1,
      specialization: {
        code: "BMRU",
        name: { sv: "Biokemi och molekylärbiologianalys med Rust", en: "Biokemi och molekylärbiologianalys med Rust" },
      },
    },
  },
  {
    id: "02-2",
    // parentId: "d682b090-e019-4fdf-8675-f10233394e12-ladokCoursRoundId",
    ladokStudentId: "ca3dd14e-3e58-464c-91e1-4c21cbd3a46b-studentId",
    ladokCourseId: "d682b090-e019-4fdf-8675-f10233394e12-ladokCourseId",
    ladokCourseRoundId:
      "d682b090-e019-4fdf-8675-f10233394e12-ladokCoursRoundId",
    canvasSisId: "u9sara00",
    name: "Sara Sarasdottir",
    email: "sara@example.com",
    roles: ["student"],
    locations: [],
    program: {
      code: "BIO",
      name: { sv: "Biologi och bioteknik", en: "Biologi och bioteknik" },
      required: "O",
      startTerm: "20231",
      studyYear: 1,
    },
  },
];
