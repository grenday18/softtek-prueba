import HistoryModel from "@core/models/historyModel";
import HistoryRepository from "./repositories/historyRepository";

class HistoryService {

  repository: HistoryRepository
  
  constructor () {
    this.repository = new HistoryRepository
  }

  async getByRequesterId (requesterId: string, page: number) : Promise<HistoryModel[]> {
    return await this.repository.getByRequesterId(requesterId, page)
  }
}

export default HistoryService