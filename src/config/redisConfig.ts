const redisConfig = {
  host: process.env.REDIS_HOST,
  port: 6379,
  connectTimeout: 3000
}

export default redisConfig