import { HttpRequest, HttpResponseInit, InvocationContext, app } from "@azure/functions";
import {
  APICourseRoundList, APICourseRound, APICourseRoundStudentList
} from "./interface";
import getCourseRound from "./api/getCourseRound";
import getCourseRoundStudents from "./api/getCourseRoundStudents";
import listCourseRounds from "./api/listCourseRounds";

type APIHandler = (req: HttpRequest, ctx: InvocationContext) => Promise<HttpResponseInit>;

/**
 * This wrapper functions makes sure that the entire process doesn't crash on errors
 * by wrapping it in a try/catch. See note in code.
 * @param handler 
 * @returns 
 */
function API(handler: APIHandler) {
  return async function (req: HttpRequest, ctx: InvocationContext) {
    try {
      ctx.log(`Http function processed request for url "${req.url}"`);
      return await handler(req, ctx);
    } catch (err) {
      ctx.error(err);
      // This rethrown exception will only fail the individual invocation, instead of crashing the whole process
      // https://learn.microsoft.com/en-us/azure/azure-functions/functions-reference-node?pivots=nodejs-model-v4&tabs=typescript%2Cwindows%2Cazure-cli#use-async-and-await
      throw err;
    }
  }
}

// NOTE: These API-endpoints are protected by the function API key "default" when run in Azure
// https://portal.azure.com/#@kth.onmicrosoft.com/resource/subscriptions/89badcd9-244a-4255-af4f-bc0d931d3a69/resourceGroups/course-survey-integration-api-ref/providers/Microsoft.Web/sites/course-survey-integration-api-ref/functionsAppKeys

app.http('APIGetCourseRound', {
  methods: ['GET'],
  authLevel: 'function',
  handler: API(getCourseRound<APICourseRound>),
  route: 'course-rounds/{id}'
});

app.http('APIGetCourseRoundStudents', {
  methods: ['GET'],
  authLevel: 'function',
  handler: API(getCourseRoundStudents<APICourseRoundStudentList>),
  route: 'course-rounds/{id}/students'
});

app.http('APIListCourseRounds', {
  methods: ['GET'],
  authLevel: 'function',
  handler: API(listCourseRounds<APICourseRoundList>),
  route: 'course-rounds'
});
