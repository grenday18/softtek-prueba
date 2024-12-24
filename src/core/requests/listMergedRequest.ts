import { ApiRequestValidator } from "@utils"

class ListMergedRequest extends ApiRequestValidator {
  constructor(event: any) {
    super(event)

    this.pathScheme = {}
    this.bodyScheme = {}
    this.queryScheme = {
      type: "object",
      additionalProperties: false,
      properties: {
        name: {
          type: "string",
          nullable: true,
          errorMessage: "NAME_ERROR"
        },
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

export default ListMergedRequest