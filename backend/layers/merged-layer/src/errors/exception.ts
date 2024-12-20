import { errors } from "."

class Exception {
    httpStatusCode: number
    code: string
    message: string
    constructor(value: string) {
      const error = errors[value]
  
      this.httpStatusCode = error.httpStatusCode
      this.code = error.code
      this.message = error.messageES
    }
  }
  
  export default Exception