import { MergedRepository, PokemonService } from "@services"
import PokemonModel from "./pokemonModel"

export default class MergedModel {
	name: string
	gender: string
  height: number
  mass: number
  homeworld: string
	pokemons: PokemonModel[] = []
	isMigrated: boolean = false

	constructor(person: any) {
		this.name = person.name
		this.gender = person.gender
		this.height = parseFloat(person.height) || 0
		this.mass = parseFloat(person.mass) || 0
		this.homeworld = person.homeworld
	}

	async getPokemons() {
		if (this.pokemons.length === 0) {
			const pokemonService = new PokemonService
			this.pokemons = await pokemonService.getPokemonsByCharacter(this.name)
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