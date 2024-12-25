import { AxiosResponse } from "axios"
import { Api } from "@layer"
import { Exception } from "@utils"

interface Pokemon {
  id: number
  name: string
  order: number
  abilities: Ability[]
  types: TypePoke[]
  // atractivos de usar:
  // moves: moves[]
  // sprites: sprite[]
}

interface Ability {
  is_hidden: boolean
  slot: number
  ability: AbilityDetail
}
  
interface AbilityDetail {
  name: string
  url: string
}

interface TypePoke {
  slot: number
  type: TypePokeDetail
}

interface TypePokeDetail {
  name: string
  url: string
}

class PokeApi extends Api {

  constructor() {
    super(process.env.BASE_URL_API_POKEAPI ?? "")
  }

  async getPokemonById(id: number) : Promise<Pokemon> {
    const response : AxiosResponse<Pokemon> = await this.request({
      url: `/api/v2/pokemon/${id}`,
      method: "GET"
    })

    if (response.status == 200)
      return response.data
    
    if (response.status == 404)
      throw new Exception("POKEAPI_NOT_RESULT")

    throw new Exception("POKEAPI_ERROR")
  }
}

export { PokeApi, Pokemon }