import { TCourseRoundEntity } from "../../src/functions/interface";

export const courseRound2: TCourseRoundEntity = {
  id: "02-1",
  language: "sv",
  canceled: false,
  institution: {
    displayName: "Skolan för matematik och systemteknik",
    displayCode: "CSC",
    kthId: "u9csc000",
  },
  periods: [{ period: "P3", credits: "6 hp" }],
  courseExaminers: [
    {
      userName: "karin",
      kthUserId: "u9karin0",
      email: "karin@example.com",
      fullName: "Karin Karlsson",
    },
    {
      userName: "gunnar",
      kthUserId: "u9gunnar",
      email: "gunnar@example.com",
      fullName: "Gunnar Gunnarsson",
    },
  ],
  ladokCourseId: "21a5ec0a-ea41-4967-8eb2-a824b5a720af-ladokCourseId",
  ladokCourseRoundId: "d682b090-e019-4fdf-8675-f10233394e12-ladokCoursRoundId",
  canvasSisId: "d682b090-e019-4fdf-8675-f10233394e12-ladokCoursRoundId",
  name: "Kemiteknik och Bioteknik med matematiska metoder I",
  courseGoal:
    "Förvärva en djupare förståelse för kemiska reaktioner, kinetik, termodynamik och andra grundläggande principer inom kemi.",
  organization: {
    displayName: "Institutionen för datalogi och datorlingvistik",
    displayCode: "CSC/PK",
    kthId: "u9pk0000",
  },
  courseResponsible: [
    {
      userName: "per",
      kthUserId: "u9per000",
      email: "per@example.com",
      fullName: "Per Persson",
    },
  ],
  courseTeachers: [
    {
      userName: "elisabeth",
      kthUserId: "u9elisab",
      email: "elisabeth@example.com",
      fullName: "Elisabeth Eliadotter",
    },
  ],
  _gradingScheme: ["A", "B", "C", "D", "E", "Fx", "F"],
  courseCode: "BB0001",
  endDate: "2023-01-01",
  displayYear: "2023",
  credits: "6 hp",
  modules: [
    {
      moduleRoundId: "230f8e64-88fb-4913-83e8-023a472d859f-ladokModuleRoundId",
      code: "TEN1",
      name: "Tentamen",
      credits: "5 hp",
      gradingScheme: ["A", "B", "C", "D", "E", "Fx", "F"],
    },
    {
      moduleRoundId: "5e6fafb5-56d4-4c6c-9738-a2d3dbed4354-ladokModuleRoundId",
      code: "LAB",
      name: "Laboration",
      credits: "1 hp",
      gradingScheme: ["P", "F"],
    },
  ],
};
