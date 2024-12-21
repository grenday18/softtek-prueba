import { SwPerson } from "../api/swApi"
import { PokeMapper } from "../mapper"
import { MergedRepository } from "../repository"
import PokemonModel from "./pokemonModel"

export default class MergedModel {
	name: string
	gender: string
  height: number
  mass: number
  homeworld: string
	pokemons: PokemonModel[] = []

	constructor(person: SwPerson) {
		this.name = person.name
		this.height = parseFloat(person.height)
		this.mass = parseFloat(person.mass)
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

	async save() {
		const repo = new MergedRepository
		await repo.save(this)

		const dataPromises: Array<Promise<any>> = []
		const pokemons = await this.getPokemons()

    for (let i = 0; i < pokemons.length; i++) {
			pokemons[i].trainnerName = this.name
			dataPromises.push(pokemons[i].save())
    }

    await Promise.all(dataPromises)
	}

	async toReponse() : Promise<MergedModel> {
		await this.getPokemons()
		return this
	}
}