import { Exception } from "../errors"
import type { APIGatewayEvent } from "aws-lambda"
import Ajv, { ErrorObject } from "ajv"
import ajvErrors from "ajv-errors"

class ApiRequestValidator {
  pathParams: any
  queryParams: any
  body: any

  pathScheme: object
  queryScheme: object
  bodyScheme: object

  ajvOptions: object

  errors: Array<Exception>

  constructor(event: APIGatewayEvent) {
    this.ajvOptions = {
      allErrors: true,
      removeAdditional: true
    }

    // get path, query and body fron request
    this.pathParams = event.pathParameters ?? {}
    this.queryParams = event.queryStringParameters ?? {}
    try {
      this.body = JSON.parse(event.body)
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
  private errorsMessagesToExceptions(errors: Array<ErrorObject>): Array<Exception> {
    if (!errors) return []

    const exceptions = []
    for (const error of errors) {
      const exception = new Exception(error.message)
      if (!exception.code)
        // Unknown error
        continue

      exceptions.push({
        code: exception.code,
        message: exception.message
      })
    }

    return exceptions
  }

  validatePathParams(): Array<Exception> {
    // initialize json validator
    const ajv = new Ajv({ ...this.ajvOptions, coerceTypes: true })
    ajvErrors(ajv)
    const validate = ajv.compile(this.pathScheme)
    validate(this.pathParams)

    return this.errorsMessagesToExceptions(validate.errors)
  }

  validateQueryParams(): Array<Exception> {
    const ajv = new Ajv({ ...this.ajvOptions, coerceTypes: true })
    ajvErrors(ajv)
    const validate = ajv.compile(this.queryScheme)
    validate(this.queryParams)

    return this.errorsMessagesToExceptions(validate.errors)
  }

  validateBody(): Array<Exception> {
    const ajv = new Ajv(this.ajvOptions)
    ajvErrors(ajv)
    const validate = ajv.compile(this.bodyScheme)
    validate(this.body)

    return this.errorsMessagesToExceptions(validate.errors)
  }

  get isValid(): boolean {
    return this.errors.length === 0
  }

  formatErrorsToResponse() {
    if (this.isValid) return null
    const errorResponse = {
      code: this.errors[0].code,
      message: this.errors[0].message,
    }
    if(this.errors.length > 1)
      errorResponse["errors"] = this.errors

    return errorResponse
  }

  convertToClass<T>(cls: new (object: any) => T): T {
    const instance = new cls(this.body);
    return instance;
  }
}
export default ApiRequestValidator