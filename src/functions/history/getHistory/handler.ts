import { errorHandlingMiddleware, validationRequestMiddleware } from "@core/middlewares"
import { ListHistoryRequest } from "@core/requests"
import { ApiGatewayHelper } from "@layer"
import { HistoryService } from "@services"
import { APIGatewayProxyHandlerV2 } from "aws-lambda"
import middy from "middy"
import { getClientIpFromEvent } from "../../../utils/eventHelper"

const getHistoryHandler: APIGatewayProxyHandlerV2  = async (event: any) => {
  
  const page = event.queryParams?.page || 1

  const service = new HistoryService()
  const requesterId = getClientIpFromEvent(event)

  const results = await service.getByRequesterId(requesterId, page)
  return ApiGatewayHelper.formatJSONResponseOk(results)
}

export const getHistory: APIGatewayProxyHandlerV2 = middy(getHistoryHandler)
                                                    .use(validationRequestMiddleware(ListHistoryRequest))
                                                    .use(errorHandlingMiddleware())
