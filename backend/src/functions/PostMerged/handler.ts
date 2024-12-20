import type { APIGatewayEvent, APIGatewayProxyHandler } from "aws-lambda"
import { ApiGatewayHelper } from "merged-layer"

export const postMerged: APIGatewayProxyHandler = async ( event: APIGatewayEvent) => {
  return ApiGatewayHelper.formatJSONResponseOk({
    status: "ok"
  })
}