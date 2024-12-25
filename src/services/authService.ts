import HistoryRepository from "./repositories/historyRepository";
import moment from "moment";

class AuthService {

  repository: HistoryRepository
  
  RATE_LIMIT_MINUTES: number
  RATE_LIMIT_MAX_COUNT: number

  constructor () {
    this.repository = new HistoryRepository
    this.RATE_LIMIT_MINUTES = parseInt(process.env.RATE_LIMIT_MINUTES ?? "15")
    this.RATE_LIMIT_MAX_COUNT = parseInt(process.env.RATE_LIMIT_MINUTES ?? "100")
  }

  async checkRateLimit (requesterId: string) : Promise<boolean> {
    const rateLimitMaxTime = moment().add(this.RATE_LIMIT_MINUTES, 'minutes')
                                      .format("YYYY-MM-DDTHH:mm:ss.sssZ")

    const countRequest = await this.repository.countRequestsByRequesterId(requesterId, rateLimitMaxTime)
    return countRequest < this.RATE_LIMIT_MAX_COUNT
  }
}

export default AuthService