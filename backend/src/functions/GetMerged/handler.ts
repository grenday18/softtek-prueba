import type { APIGatewayProxyEventV2, APIGatewayProxyHandler } from "aws-lambda"
import { ApiGatewayHelper, HistoryModel, ListMergedRequest, MergedMapper, RedisRepository } from "merged-layer"

export const getMerged: APIGatewayProxyHandler = async ( event: APIGatewayProxyEventV2) => {
  
  const history = new HistoryModel(event)
  let response

  const request = new ListMergedRequest(event)
  if (!request.validate()){
    response = ApiGatewayHelper.formatJSONResponseError(request.formatErrorsToResponse())
    await history.notify(response.statusCode, response.body)
    return response
  }

  try {
    const page = request.queryParams?.page || 1
    
    //const redis = new RedisRepository()
    //response = await redis.getMergeds(page)
    
    // Si no se encuentra en redis se obtiene de manera normal
    if (!response) {
      const mapper = new MergedMapper()
      const result = await mapper.getMergedsList(page)
      response = ApiGatewayHelper.formatJSONResponseOk(result)

      //await redis.saveMergeds(response, page)
    }

  } catch (error) {
    response = ApiGatewayHelper.handleError(error)
  }

  await history.notify(response.statusCode, response.body)
  return response

}