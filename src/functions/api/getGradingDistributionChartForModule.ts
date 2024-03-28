import {
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";
import { Blob } from "buffer";
import { ChartJSNodeCanvas } from "chartjs-node-canvas";
import { ChartTypeRegistry } from "chart.js";
import { APIModuleGradingDistributionChart, APIModuleGradingDistributionChartParams, TCourseRoundEntity, TCourseRoundModuleEntity, TReportedResultEntity } from "../interface";
import { Database } from "../utils";

const width = 600; //px
const height = 400; //px
const backgroundColour = 'white';
const chartType: keyof ChartTypeRegistry = 'bar';

export default async function handler<T extends APIModuleGradingDistributionChart>(
  request: HttpRequest,
  context: InvocationContext,
  db: Database,
): Promise<HttpResponseInit> {
  const { id, moduleCode } = request.params as APIModuleGradingDistributionChartParams["path"];
  let outp: APIModuleGradingDistributionChart;
  
  try {
    const courseRound = await db.fetchById<TCourseRoundEntity>(id, "CourseRound");

    if (!courseRound) {
      return {
        status: 404,
        jsonBody: {
          error: "Not found",
          description: `CourseRound with id ${id} not found`,
        },
      };
    }

    const { modules } = courseRound;
    const module = modules.find((m: TCourseRoundModuleEntity) => m.code.toLowerCase() === moduleCode.toLowerCase());

    if (!module) {
      return {
        status: 404,
        jsonBody: {
          error: "Not found",
          description: `Module with code ${moduleCode} not found`,
        },
      };
    }

    const reportedResults = await db.queryByProperty<TReportedResultEntity>(
      "parentId",
      module.moduleRoundId,
      "ReportedResult",
    );

    const gradingDistribution = reportedResults.reduce(
      (acc: Record<string, number>, res: any) => {
        acc[res.result] = (acc[res.result] ?? 0) + 1;
        return acc;
      },
      Object.fromEntries(courseRound._gradingScheme.map((key: string) => [key, 0])),
    );

    const chartJSNodeCanvas = new ChartJSNodeCanvas({ width, height, backgroundColour});
    const data = {
      labels: Object.keys(gradingDistribution),
      datasets: [{
        data: Object.values(gradingDistribution),
      }]
    };
    const configuration = {
      // https://www.chartjs.org/docs/latest/charts/bar.html
      type: chartType,
      data,
    };
    const image = await chartJSNodeCanvas.renderToBuffer(configuration);
    outp = new Blob([image]);
  } finally {
    await db.close();
  }

  if (!outp) {
    return {
      status: 500,
      jsonBody: { error: "Failed to render chart" },
    };
  }

  // TODO: Should we set headers such as content type?
  return {
    status: 200,
    body: outp,
  };
}
