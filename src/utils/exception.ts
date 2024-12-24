import { errors } from "../config/errors"

class Exception {
    httpStatusCode: number
    code: string
    message: string
    
    constructor(value: string) {
      type ErrorKey = keyof typeof errors
      const error = errors[value as ErrorKey]
  
      this.httpStatusCode = error.httpStatusCode
      this.code = error.code
      this.message = error.messageES
    }
  }
  
  export default Exception