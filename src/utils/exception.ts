import { errors } from "../config/errors"

class Exception {
    httpStatusCode: number
    code: string
    message: string
    
    constructor(value: string) {
      type ErrorKey = keyof typeof errors
      const error = errors[value as ErrorKey]
      this.httpStatusCode = error?.httpStatusCode || 500
      this.code = error?.code || "500"
      this.message = error?.messageES || value
    }
  }
  
  export default Exception