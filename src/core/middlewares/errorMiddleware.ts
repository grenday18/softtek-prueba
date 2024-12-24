
import { ApiGatewayHelper } from "@layer"

const errorHandlingMiddleware = () => {
  return {
    onError: async (handler: any) => {
      console.log("ERROR: ", handler.error)
      handler.response = ApiGatewayHelper.handleError(handler.error)
    },
  }
}

export { errorHandlingMiddleware }