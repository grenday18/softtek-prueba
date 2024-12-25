import type { APIGatewayProxyEventV2 } from "aws-lambda"
import Ajv, { ErrorObject } from "ajv"
import ajvErrors from "ajv-errors"
import Exception from "./exception"

class ApiRequestValidator {
  pathParams: any
  queryParams: any
  body: any

  pathScheme: object = {} 
  queryScheme: object = {}
  bodyScheme: object = {}

  ajvOptions: object

  errors: Array<Exception> = []

  constructor(event: APIGatewayProxyEventV2) {
    this.ajvOptions = {
      allErrors: true,
      removeAdditional: true
    }

    // get path, query and body fron request
    this.pathParams = event.pathParameters ?? {}
    this.queryParams = event.queryStringParameters ?? {}
    try {
      this.body = JSON.parse(event?.body ?? "")
    } catch {
      this.body = null
    }

  }

  
  validate(): boolean {
    const errorsPath = this.validatePathParams()
    const errorsQuery = this.validateQueryParams()
    const errorsBody = this.validateBody()

    this.errors = [...errorsPath, ...errorsQuery, ...errorsBody]

    return this.isValid
  }

  // parse ErrorObject to Exception
  private errorsMessagesToExceptions(errors: ErrorObject[]): Exception[] {
    if (!errors) return []

    const exceptions: Exception[] = []
    for (const error of errors) {
      const exception = new Exception(error.message || "")
      if (!exception.code)
        continue

      exceptions.push(exception)
    }

    return exceptions
  }

  validatePathParams(): Exception[] {
    // initialize json validator
    const ajv = new Ajv({ ...this.ajvOptions, coerceTypes: true })
    ajvErrors(ajv)
    const validate = ajv.compile(this.pathScheme)
    validate(this.pathParams)

    return this.errorsMessagesToExceptions(validate.errors as ErrorObject[])
  }

  validateQueryParams(): Exception[] {
    const ajv = new Ajv({ ...this.ajvOptions, coerceTypes: true })
    ajvErrors(ajv)
    const validate = ajv.compile(this.queryScheme)
    validate(this.queryParams)

    return this.errorsMessagesToExceptions(validate.errors as ErrorObject[])
  }

  validateBody(): Exception[] {
    const ajv = new Ajv(this.ajvOptions)
    ajvErrors(ajv)
    const validate = ajv.compile(this.bodyScheme)
    validate(this.body)

    return this.errorsMessagesToExceptions(validate.errors as ErrorObject[])
  }

  get isValid(): boolean {
    return this.errors.length === 0
  }

  formatErrorsToResponse() {
    if (this.isValid) return {}
    const errorResponse = {
      code: this.errors[0].code,
      message: this.errors[0].message,
      errors: this.errors
    }

    return errorResponse
  }
}
export default ApiRequestValidator