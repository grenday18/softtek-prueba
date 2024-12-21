import type { APIGatewayEvent, APIGatewayProxyHandler } from "aws-lambda"
import { ApiGatewayHelper, CreateMergedRequest, MergedModel } from "merged-layer"

export const postMerged: APIGatewayProxyHandler = async ( event: APIGatewayEvent) => {

  const request = new CreateMergedRequest(event)
  if (!request.validate())
    return ApiGatewayHelper.formatJSONResponseError(request.formatErrorsToResponse())

  try {
    
    const model = new MergedModel(request.body)
    await model.save()
  
    return ApiGatewayHelper.formatJSONResponseOk(model)
    
  } catch (error) {
    console.log("ERROR: ", error)
    return ApiGatewayHelper.handleError(error)
  }
}