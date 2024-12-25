import MergedModel from '@core/models/mergedModel'
import redisConfig from '@src/config/redisConfig'
import Redis from 'ioredis'

class RedisService {
  
  redis: Redis
  listMergedKey = "fusionados"

  constructor () {
    console.log(process.env.REDIS_HOST)
    this.redis = new Redis(redisConfig)
  }

  async saveMergeds(results: MergedModel[], page: number) {
    try {
      
      const key = this.listMergedKey + "/" + page 
      const value = JSON.stringify(results)
      await this.redis.set(key, value, 'EX', 30 * 60)

    } catch {
      console.log("connection with redis failed.")
    }
  }

  async getMergeds(page: number) {
    try { 
      console.log("intentando conexion...")

      const key = this.listMergedKey + "/" + page 
      const value =  await this.redis.get(key)
      return JSON.parse(value ?? "")
    } catch {
      console.log("connection with redis failed.")
      return null
    }
  }
}

export default RedisService