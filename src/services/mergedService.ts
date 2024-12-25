import MergedModel from "@core/models/mergedModel"
import { SwApi } from "./apis"
import RedisService from "./redisService"

class MergedService {

  redisService: RedisService
  constructor(){
    this.redisService = new RedisService()
  }

  async getMergedsList(page: number = 1) : Promise<MergedModel[]> {
    console.log("get mergeds lists...")
    const mergeds = await this.redisService.getMergeds(page)
    if (mergeds) return mergeds

    const list = await this.getMergedListFromApis(page)
    const dataPromises: Array<Promise<any>> = []
    for (let i = 0; i < list.length; i++) {
      list[i].isMigrated = true
      dataPromises.push(list[i].save())
    }
    
    await Promise.all(dataPromises)

    await this.redisService.saveMergeds(list, page)
    return list
  }

  async getMergedListFromApis(page: number) : Promise<MergedModel[]> {
    const swApi = new SwApi()
    const persons = await swApi.getListSwPersons(page)
    return persons.map(x => new MergedModel(x))
  }
}

export default MergedService