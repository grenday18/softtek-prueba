import { ApiGatewayHelper } from "@layer"
import AuthService from "@src/services/authService"
import { getClientIpFromEvent } from "@src/utils/eventHelper"

const rateLimitHandlingMiddleware = () => { 
  return {
    before: async (handler: any) => {
      console.log("rate limit middleware..")
      const service = new AuthService()
      const requesterId = getClientIpFromEvent(handler.event)
      
      console.log("check rate limit ...")
      const isAllowed = await service.checkRateLimit(requesterId)
      
      if (!isAllowed)
        return ApiGatewayHelper.formatJSONResponseError(
          { message: 'Too many requests. Please try again later.' }, 429)
    },
  }
}

export { rateLimitHandlingMiddleware }