import type { APIGatewayEvent, APIGatewayProxyHandler } from "aws-lambda"
import { ApiGatewayHelper, MergedMapper } from "merged-layer"

export const getMerged: APIGatewayProxyHandler = async ( event: APIGatewayEvent) => {

  const mapper = new MergedMapper()
  const result = await mapper.getMergedsList()
  return ApiGatewayHelper.formatJSONResponseOk(result)
}