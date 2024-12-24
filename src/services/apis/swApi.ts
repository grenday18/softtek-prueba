import { AxiosResponse } from "axios"
import { Api } from "@layer"
import { Exception } from "@utils"
import { error } from "console"

interface SwPerson {
  name: string
  height: string
  mass: string
  hair_color: string
  skin_color: string
  eye_color: string
  birth_year: string
  gender: string
  homeworld: string
  films: string[]
  species: string[]
  vehicles: string[]
  starships: string[]
  created: string
  edited: string
  url: string
}

interface SwApiSuccess {
  count: number
  next: string|null
  previous: string|null
  results: SwPerson[]
}

class SwApi extends Api {

  constructor() {
    super(process.env.BASE_URL_API_SWAPI || "")
  }

  async getListSwPersons(page: number = 1) : Promise<SwPerson[]> {
    return this.request.get(`/api/people/?page=${page}`)
        .then((response) => {
          return response.data.results
        })
        .catch((error) => {
          if (error.response.status == 404)
            return []
          throw new Exception("SWAPI_ERROR")
        })
  }
}

export { SwApi, SwPerson } 