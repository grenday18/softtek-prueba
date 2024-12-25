import { ApiGatewayHelper } from "@layer";
import { ApiRequestValidator } from "@utils";

const validationRequestMiddleware = (ValidatorClass: new (event: any) => ApiRequestValidator) => {
  return {
    before: async (handler: any) => {
      console.log("validation middleware..")
      
      const request = new ValidatorClass(handler.event)
      if (!request.validate()) {
        const response = ApiGatewayHelper.formatJSONResponseError(request.formatErrorsToResponse())
        handler.response = response
        handler.callback(null, response)
        return response
      }

      handler.event.queryParams = request.queryParams
      handler.event.pathParams = request.pathParams
      handler.event.body = request.body
    }
  }
}

export { validationRequestMiddleware }