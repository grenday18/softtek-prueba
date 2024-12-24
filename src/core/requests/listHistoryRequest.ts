import { ApiRequestValidator } from "@utils"

class ListHistoryRequest extends ApiRequestValidator {
  constructor(event: any) {
    super(event)

    this.pathScheme = {}
    this.bodyScheme = {}
    this.queryScheme = {
      type: "object",
      additionalProperties: false,
      properties: {
        page: {
          type: "integer",
          minimum: 1,
          nullable: true,
          errorMessage: "PAGE_ERROR"
        }
      },
      required: []
    }
  }
}

export default ListHistoryRequest