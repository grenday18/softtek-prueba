import { SwPerson } from "../api/swApi"

export default class MergedModel {
	name: string
  height: string
  mass: string
	gender: string
  homeworld: string

	constructor(person: SwPerson) {
		this.name = person.name
		this.height = person.height
		this.mass = person.mass
		this.gender = person.gender
		this.homeworld = person.homeworld
		// propuesta: calcular la edad, 
		// obtener el nombre del planeta accediendo a la info
	}

	async toReponse() : Promise<MergedModel> {
		return this
	}
}