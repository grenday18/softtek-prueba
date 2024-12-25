import { errorHandlingMiddleware, validationRequestMiddleware } from "@core/middlewares"
import { getClientIpFromEvent } from "../../../utils/eventHelper"
import { APIGatewayProxyHandlerV2 } from "aws-lambda"
import { ListHistoryRequest } from "@core/requests"
import { ApiGatewayHelper } from "@layer"
import { HistoryService } from "@services"
import middy from "@middy/core"
import HistoryResponse from "@core/responses/historyResponse"


const getHistoryHandler: APIGatewayProxyHandlerV2  = async (event: any) => {
  
  const page = event.queryParams?.page || 1

  const service = new HistoryService()
  const requesterId = getClientIpFromEvent(event)

  const results = await service.getByRequesterId(requesterId, page)
  const response = results.map((x) => new HistoryResponse(x))
  
  return ApiGatewayHelper.formatJSONResponseOk(response)
}

export const getHistory: APIGatewayProxyHandlerV2 = middy(getHistoryHandler)
  .use(validationRequestMiddleware(ListHistoryRequest))
  .use(errorHandlingMiddleware())
