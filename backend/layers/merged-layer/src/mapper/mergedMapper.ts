import { SwApi } from "../api"
import { MergedModel } from "../models"

class MergedMapper {
  constructor(){
  }

  async getMergedsList(page: number = 1) : Promise<MergedModel[]> {
    const list = await this.getMergedListFromApis(page)
    // Si se obtiene desde apis, debemos guardar la info:
    const dataPromises: Array<Promise<any>> = []
    for (let i = 0; i < list.length; i++) {
      dataPromises.push(list[i].save())
    }
    
    await Promise.all(dataPromises)
    return list
  }

  async getMergedListFromApis(page: number) : Promise<MergedModel[]> {
    const swApi = new SwApi()
    const persons = await swApi.getListSwPersons(page)

    const dataPromises: Array<Promise<any>> = []
    for (let i = 0; i < persons.length; i++) {
      const person = new MergedModel(persons[i])
      dataPromises.push(person.toReponse())
    }

    const data = await Promise.all(dataPromises)
    return data
  }
}

export default MergedMapper