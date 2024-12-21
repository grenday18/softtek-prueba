import { Pokemon } from "../api"

export default class PokemonModel {
  
  id: number
  name: string
  order: number
  abilities: string[]
  types: string[]

  constructor (pokemon: Pokemon) {
    this.id = pokemon.id
    this.name = pokemon.name
    this.order = pokemon.order
    this.abilities = pokemon.abilities.map(x => x.ability.name)
    this.types = pokemon.types.map(x => x.type.name)
  }

  async toResponse() {
    return this
  }

}