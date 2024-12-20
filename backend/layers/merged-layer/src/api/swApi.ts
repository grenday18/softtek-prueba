import { AxiosResponse } from "axios"
import Api from "./api"
import { Exception } from "../errors"

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
    super(process.env.BASE_URL_API_SWAPI)
  }

  async getListSwPersons(page: number = 1) : Promise<SwPerson[]> {
    const response : AxiosResponse<SwApiSuccess> = await this.request({
      url: `/api/people/?page=${page}`,
      method: "GET"
    })

    if (response.status == 200)
      return response.data.results
    
    if (response.status == 404)
      throw new Exception("SWAPI_NOT_RESULT")

    throw new Exception("SWAPI_ERROR")
  }
}

export { SwApi, SwPerson } 