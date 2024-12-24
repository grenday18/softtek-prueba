import { errorHandlingMiddleware, historyHandlingMiddleware, validationRequestMiddleware } from "@core/middlewares"
import { ListMergedRequest } from "@core/requests"
import MergedResponse from "@core/responses/mergedResponse"
import { ApiGatewayHelper } from "@layer"
import { MergedService } from "@services"
import type { APIGatewayProxyHandlerV2 } from "aws-lambda"
import middy from "@middy/core"


const getMergedHandler: APIGatewayProxyHandlerV2 = async (event: any) => {
  
  const page = event.queryParams?.page || 1
  
  const mapper = new MergedService()
  const result = await mapper.getMergedsList(page)
  const response = result.map((x) => new MergedResponse(x))
  
  return ApiGatewayHelper.formatJSONResponseOk(response)
}

export const getMerged: APIGatewayProxyHandlerV2 = middy(getMergedHandler)
                                                    .use(validationRequestMiddleware(ListMergedRequest))
                                                    .use(errorHandlingMiddleware())
                                                    .use(historyHandlingMiddleware())
