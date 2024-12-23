const errors = {
    SWAPI_NOT_RESULT: {
      httpStatusCode: 404,
      code: "40401",
      message: "No results of external service (swapi).",
      messageES: "Sin resultados del servicio externo."
    },
    SWAPI_ERROR: {
      httpStatusCode: 404,
      code: "40402",
      message: "No communication with external service (swapi).",
      messageES: "Sin comunicación con servicio externo."
    },
    POKEAPI_NOT_RESULT: {
      httpStatusCode: 404,
      code: "40403",
      message: "No results of external service (pokeapi).",
      messageES: "Sin resultados del servicio externo."
    },
    POKEAPI_ERROR: {
      httpStatusCode: 404,
      code: "40404",
      message: "No communication with external service (pokeapi).",
      messageES: "Sin comunicación con servicio externo."
    },
    TRAINNER_NAME_IS_REQUIRED: {
      httpStatusCode: 400,
      code: "40101",
      message: "TrainnerName is required.",
      messageES: "El atributo trainnerName es obligatorio."
    },
    NAME_ERROR: {
      httpStatusCode: 400,
      code: "40002",
      message: "The field 'name' must be a string with at least one character.",
      messageES: "El campo 'name' debe ser un string con al menos un caracter."
    },
    GENDER_ERROR: {
      httpStatusCode: 400,
      code: "40002",
      message: "The field 'gender' must be male, female or n/a.",
      messageES: "El campo 'gender' debe ser male, female or n/a."
    },
    HEIGHT_ERROR: {
      httpStatusCode: 400,
      code: "40003",
      message: "The field 'height' must be a integer between 50 and 250.",
      messageES: "El campo 'height' debe ser un entero entre 50 y 250."
    },
    MASS_ERROR: {
      httpStatusCode: 400,
      code: "40004",
      message: "The field 'mass' must be a integer between 1 and 500.",
      messageES: "El campo 'mass' debe ser un entero entre 1 y 500."
    },
    HOMEWORLD_ERROR: {
      httpStatusCode: 400,
      code: "40005",
      message: "The field 'homeworld' must be a string with at least one character.",
      messageES: "El campo 'homeworld' debe ser un string con al menos un caracter."
    },
    PAGE_ERROR: {
      httpStatusCode: 400,
      code: "40006",
      message: "The field 'page' must be a integer.",
      messageES: "El campo 'page' debe ser un entero."
    },
  }
  
  const errorCodes = Object.values(errors).map(({ code }) => code)
  
  export { errors, errorCodes }
  