import PokemonModel from "@core/models/pokemonModel";
import { PokeApi } from "./apis";

class PokemonService {
	maxIdOfPokemon = 1010
	maxCantOfPokemons = 1

	constructor () {
	}
	
	async getPokemonById(idRandom: number) : Promise<PokemonModel> {
		const api = new PokeApi()
		const pokemon = await api.getPokemonById(idRandom)
		return new PokemonModel(pokemon);
	}

	async getPokemonsRandoms() : Promise<PokemonModel[]> {

		const dataPromises: Array<Promise<any>> = []
		for (let i = 0; i < this.maxCantOfPokemons; i++) {
			const idRandom = Math.floor(Math.random() * this.maxIdOfPokemon) + 1;			
			const pokemon = this.getPokemonById(idRandom)
			dataPromises.push(pokemon)
		}

		const data = await Promise.all(dataPromises)
    return data
	}

	async getPokemonsByCharacter(name: string) : Promise<PokemonModel[]> {
		let response : PokemonModel[] = []
		if (name)
			response = await this.getPokemonsRandoms()
		
		return response
	}
}

export default PokemonService