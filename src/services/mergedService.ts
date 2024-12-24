import MergedModel from "@core/models/mergedModel"
import { SwApi } from "./apis"

class MergedService {
  constructor(){
  }

  async getMergedsList(page: number = 1) : Promise<MergedModel[]> {
    const list = await this.getMergedListFromApis(page)

    const dataPromises: Array<Promise<any>> = []
    for (let i = 0; i < list.length; i++) {
      list[i].isMigrated = true
      dataPromises.push(list[i].save())
    }
    
    await Promise.all(dataPromises)
    return list
  }

  async getMergedListFromApis(page: number) : Promise<MergedModel[]> {
    const swApi = new SwApi()
    const persons = await swApi.getListSwPersons(page)
    return persons.map(x => new MergedModel(x))
  }
}

export default MergedService