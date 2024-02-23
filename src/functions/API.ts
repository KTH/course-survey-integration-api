import { app } from "@azure/functions";
import {
  APICourseRoundList,
  APICourseRound,
  APICourseRoundStudentList,
} from "./interface";
import getCourseRound from "./api/getCourseRound";
import getCourseRoundStudents from "./api/getCourseRoundStudents";
import listCourseRounds from "./api/listCourseRounds";
import { API } from "./utils";

// NOTE: These API-endpoints are protected by the function API key "default" when run in Azure
// https://portal.azure.com/#@kth.onmicrosoft.com/resource/subscriptions/89badcd9-244a-4255-af4f-bc0d931d3a69/resourceGroups/course-survey-integration-api-ref/providers/Microsoft.Web/sites/course-survey-integration-api-ref/functionsAppKeys

app.http("APIGetCourseRound", {
  methods: ["GET"],
  authLevel: "function",
  handler: API(getCourseRound<APICourseRound>),
  route: "course-rounds/{id}",
});

app.http("APIGetCourseRoundStudents", {
  methods: ["GET"],
  authLevel: "function",
  handler: API(getCourseRoundStudents<APICourseRoundStudentList>),
  route: "course-rounds/{id}/students",
});

app.http("APIListCourseRounds", {
  methods: ["GET"],
  authLevel: "function",
  handler: API(listCourseRounds<APICourseRoundList>),
  route: "course-rounds",
});
