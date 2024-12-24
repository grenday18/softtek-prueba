import { errorHandlingMiddleware, validationRequestMiddleware } from "@core/middlewares"
import type { APIGatewayProxyEventV2, APIGatewayProxyHandlerV2 } from "aws-lambda"
import MergedResponse from "@core/responses/mergedResponse"
import { CreateMergedRequest } from "@core/requests"
import MergedModel from "@core/models/mergedModel"
import { ApiGatewayHelper } from "@layer"
import middy from "@middy/core"


const postMergedHandler: APIGatewayProxyHandlerV2 = async ( event: APIGatewayProxyEventV2) => {

  const model = new MergedModel(event.body)
  await model.save()

  const response = new MergedResponse(model)
  return ApiGatewayHelper.formatJSONResponseOk(response)
}

export const postMerged: APIGatewayProxyHandlerV2 = middy(postMergedHandler)
                                                      .use(validationRequestMiddleware(CreateMergedRequest))
                                                      .use(errorHandlingMiddleware())
