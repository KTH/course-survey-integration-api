import { UGRestClient, UGRestClientError } from "./ugRestClient";

const {
  OAUTH_SERVER_BASE_URI,
  UG_REST_API_BASE_URI,
  UG_REST_API_CLIENT_ID,
  UG_REST_API_CLIENT_SECRET,
} = process.env;

const ugClient = new UGRestClient({
  authServerDiscoveryURI: OAUTH_SERVER_BASE_URI ?? '',
  resourceBaseURI: UG_REST_API_BASE_URI ?? '',
  clientId: UG_REST_API_CLIENT_ID ?? '',
  clientSecret: UG_REST_API_CLIENT_SECRET ?? '',
});

type TUgResult = {

}

export async function getStudentInfo(ladokStudentId: string) {
  // TODO: Write actual filter etc, this is only mocking
  const { data, json, statusCode } =
    (await ugClient
      .get<TUgResult>(
        `users?$filter=kthid eq '${ladokStudentId}'&$expand=memberOf`
      )
      .catch(ugClientGetErrorHandler)) ?? {};

  if (statusCode !== 200) {
    throw new Error(`UGRestClient: ${statusCode} ${data}`);
  }

  return data;
}

function ugClientGetErrorHandler(err: any) {
  if (err instanceof UGRestClientError) {
    throw err;
  }

  Error.captureStackTrace(err, ugClientGetErrorHandler);
  throw err;
}