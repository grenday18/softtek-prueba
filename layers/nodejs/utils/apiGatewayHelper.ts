import { statusCodeHelper } from "./statusCodeHelper"

interface IError {
  code: string
  message: string
}

class ApiGatewayHelper {
  static response = function (body: object, statusCode: number) {

    const result = {
      message: statusCodeHelper(statusCode),
      data: body
    }

    return {
      statusCode: statusCode,
      body: JSON.stringify(result),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true
      }
    }
  }

  static formatJSONResponseOk = (body: object, httpCode = 200) => {
    return this.response(body, httpCode)
  }

  static formatJSONResponseError = (body: object|IError, httpCode = 400) => {
    return this.response(body, httpCode)
  }

  static handleError(error: any) {
    let httpCode: number = error?.httpStatusCode
    const errorCode: string = error?.code
    let message: string = error?.message

    return this.response(
      {
        code: errorCode,
        message: message
      },
      httpCode
    )
  }
}

export default ApiGatewayHelper