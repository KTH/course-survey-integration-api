import { app } from "@azure/functions";
import {
  APICourseRoundList,
  APICourseRound,
  APICourseRoundStudentList,
  APICourseRoundGradingDistributionChart,
  APIModuleGradingDistributionChart,
} from "./interface";
import getCourseRound from "./api/getCourseRound";
import getCourseRoundStudents from "./api/getCourseRoundStudents";
import listCourseRounds from "./api/listCourseRounds";
import getGradingDistributionChart from "./api/getGradingDistributionChart";
import getGradingDistributionChartForModule from "./api/getGradingDistributionChartForModule";
import { API, APIPathFromSpec } from "./utils";

// NOTE: These API-endpoints are protected by the function API key "default" when run in Azure
// https://portal.azure.com/#@kth.onmicrosoft.com/resource/subscriptions/89badcd9-244a-4255-af4f-bc0d931d3a69/resourceGroups/course-survey-integration-api-ref/providers/Microsoft.Web/sites/course-survey-integration-api-ref/functionsAppKeys

app.http("APIGetCourseRound", {
  methods: ["GET"],
  authLevel: "function",
  handler: API(getCourseRound<APICourseRound>),
  route: APIPathFromSpec("/course-rounds/{id}"),
});

app.http("APIGetCourseRoundStudents", {
  methods: ["GET"],
  authLevel: "function",
  handler: API(getCourseRoundStudents<APICourseRoundStudentList>),
  route: APIPathFromSpec("/course-rounds/{id}/students"),
});


app.http("APIGetCourseRoundDistributionChart", {
  methods: ["GET"],
  authLevel: "function",
  handler: API(getGradingDistributionChart<APICourseRoundGradingDistributionChart>),
  route: APIPathFromSpec("/course-rounds/{id}/grading-distribution.png"),
});

app.http("APIGetModuleDistributionChart", {
  methods: ["GET"],
  authLevel: "function",
  handler: API(getGradingDistributionChartForModule<APIModuleGradingDistributionChart>),
  route: APIPathFromSpec("/course-rounds/{id}/modules/{moduleCode}/grading-distribution.png"),
});

app.http("APIListCourseRounds", {
  methods: ["GET"],
  authLevel: "function",
  handler: API(listCourseRounds<APICourseRoundList>),
  route: APIPathFromSpec("/course-rounds"),
});
