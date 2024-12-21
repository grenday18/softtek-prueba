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
    }
  }
  
  const errorCodes = Object.values(errors).map(({ code }) => code)
  
  export { errors, errorCodes }
  