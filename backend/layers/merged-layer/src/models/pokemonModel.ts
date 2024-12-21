import { Pokemon } from "../api"
import { Exception } from "../errors"
import { PokemonRepository } from "../repository"

export default class PokemonModel {
  
  id: number
  name: string
  order: number
  abilities: string[]
  types: string[]
  trainnerName: string

  constructor (pokemon: Pokemon) {
    this.id = pokemon.id
    this.name = pokemon.name
    this.order = pokemon.order
    this.abilities = pokemon.abilities.map(x => x.ability.name)
    this.types = pokemon.types.map(x => x.type.name)
  }

  async save() {
    if (!this.trainnerName)
      throw new Exception("TRAINNER_NAME_IS_REQUIRED")

    const repo = new PokemonRepository
    await repo.save(this)
  }

  async toResponse() {
    return this
  }

}