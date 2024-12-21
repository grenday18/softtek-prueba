import ApiRequestValidator from "./apiRequestValidator"

class createMergedRequest extends ApiRequestValidator {
  constructor(event: any) {
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

export default createMergedRequest