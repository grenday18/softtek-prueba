import type { APIGatewayProxyEventV2, APIGatewayProxyHandler } from "aws-lambda"
import { ApiGatewayHelper, HistoryModel, HistoryRepository, ListHistoryRequest } from "merged-layer"

export const getHistory: APIGatewayProxyHandler = async ( event: APIGatewayProxyEventV2) => {
  
  const request = new ListHistoryRequest(event)
  if (!request.validate())
    return ApiGatewayHelper.formatJSONResponseError(request.formatErrorsToResponse())

  try {
    const page = request.queryParams?.page || 1
    console.log(page)
    
    const history = new HistoryModel(event)
    const repository = new HistoryRepository()
    const results = await repository.getByRequesterId(history.requesterId, page)
    return ApiGatewayHelper.formatJSONResponseOk(results)
    
  } catch (error) {
    console.log("ERROR: ", error)
    return ApiGatewayHelper.handleError(error)
  }
}