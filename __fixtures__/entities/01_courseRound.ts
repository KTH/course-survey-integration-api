import { TCourseRoundEntity } from "../../src/functions/interface"

export const courseRound1: TCourseRoundEntity = {
  id: "01-1",
  language: "sv",
  canceled: false,
  institution: {
    displayName: "Skolan för elektroteknik och datavetenskap",
    displayCode: "ITM",
    kthId: "u9itm000"
  },
  periods: [{ period: "P1", credits: "7.5 hp" }],
  courseExaminers: [
    { userName: "sven", kthUserId: "u9sven00", email: "sven@example.com", fullName: "Sven Svensson" },
    { userName: "anna", kthUserId: "u9anna00", email: "anna@example.com", fullName: "Anna Annasdotter" }
  ],
  ladokCourseId: "8734afdf-1da9-415d-8c08-9ed160f87c0a-ladokCourseId",
  ladokCourseRoundId: "41374a41-2bda-404f-b11c-6e007deb61b4-ladokCoursRoundId",
  canvasSisId: "41374a41-2bda-404f-b11c-6e007deb61b4-ladokCoursRoundId",
  name: "Introduktion till programmering",
  courseGoal: "Förståelse av grundläggande koncept: Studenten bör kunna förklara och tillämpa grundläggande begrepp inom programmering, såsom variabler, datatyper, villkorssatser, loopar och funktioner.",
  organization: { displayName: "Institution för datavetenskap", displayCode: "ITM/JA", kthId: "u9ja0000" },
  courseResponsible: [
    {
      userName: "emil",
      kthUserId: "u9emil00",
      email: "emil@example.com",
      fullName: "Emil Emilsson"
    }
  ],
  courseTeachers: [
    {
      userName: "elin",
      kthUserId: "u9elin00",
      email: "elin@example.com",
      fullName: "Elin Elinsson"
    }
  ],
  _gradingScheme: ["P", "F"],
  courseCode: "AA0000",
  endDate: "2021-01-01",
  displayYear: "2021",
  credits: "7.5 hp",
  modules: [
    {
      moduleRoundId: "531ea06f-a5dd-40f4-8709-cfd846e6e09d-ladokModuleRoundId",
      code: "TEN1",
      name: "Tentamen",
      credits: "7.5 hp",
      gradingScheme: ["P", "F"]
    }
  ]
}
