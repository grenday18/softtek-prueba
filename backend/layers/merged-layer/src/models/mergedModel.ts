import { SwPerson } from "../api/swApi"
import { PokeMapper } from "../mapper"
import PokemonModel from "./pokemonModel"

export default class MergedModel {
	name: string
  height: string
  mass: string
	gender: string
  homeworld: string
	pokemons: PokemonModel[] = []

	constructor(person: SwPerson) {
		this.name = person.name
		this.height = person.height
		this.mass = person.mass
		this.gender = person.gender
		this.homeworld = person.homeworld
		// propuesta: calcular la edad, 
		// obtener el nombre del planeta accediendo a la info
	}

	async getPokemons() {
		if (this.pokemons.length === 0) {
			const pokeMapper = new PokeMapper
			this.pokemons = await pokeMapper.getPokemonsByCharacter(this.name)
		}

		return this.pokemons
	}

	async toReponse() : Promise<MergedModel> {
		await this.getPokemons()
		return this
	}
}