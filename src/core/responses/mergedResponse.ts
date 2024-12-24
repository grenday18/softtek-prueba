import MergedModel from "@core/models/mergedModel"
import PokemonResponse from "./pokemonResponse"

class MergedResponse {
  name: string
	gender: string
  height: number
  mass: number
	pokemons: PokemonResponse[] = []

	constructor(model: MergedModel) {
		this.name = model.name
		this.gender = model.gender
		this.height = model.height
		this.mass = model.mass
    this.pokemons = model.pokemons.map(x => new PokemonResponse(x))
	}
}

export default MergedResponse