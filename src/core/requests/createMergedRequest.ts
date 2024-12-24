import { APIGatewayProxyEventV2 } from "aws-lambda"
import { ApiRequestValidator } from "@utils"

class CreateMergedRequest extends ApiRequestValidator {
  constructor(event: APIGatewayProxyEventV2) {
    super(event)

    this.pathScheme = {}
    this.queryScheme = {} 
    this.bodyScheme = {
      type: "object",
      additionalProperties: false,
      properties: {
        name: {
          type: "string",
          errorMessage: "NAME_ERROR"
        },
        gender: {
          enum: ["male", "female", "n/a"],
          errorMessage: "GENDER_ERROR"
        },
        height: {
          type: "integer",
          minimum: 50,
          maximum: 250,
          errorMessage: "HEIGHT_ERROR"
        },
        mass: {
          type: "integer",
          minimum: 1,
          maximum: 500,
          errorMessage: "MASS_ERROR"
        },
        homeworld: {
          type: "string",
          errorMessage: "HOMEWORLD_ERROR"
        }
      },
      required: ["name", "gender", "height", "mass"]
    }
  }
}

export default CreateMergedRequest