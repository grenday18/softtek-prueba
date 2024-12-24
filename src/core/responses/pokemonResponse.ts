import PokemonModel from "@core/models/pokemonModel"

class PokemonResponse {
  id: number
  name: string
  order: number
  abilities: string[]
  types: string[]

  constructor (model: PokemonModel) {
    this.id = model.id
    this.name = model.name
    this.order = model.order
    this.abilities = model.abilities
    this.types = model.types
  } 
}

export default PokemonResponse