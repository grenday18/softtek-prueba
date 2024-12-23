import { HistoryModel } from "../models"
import { Repository } from "./repository"

export default class HistoryRepository  extends Repository{
  
  static PartitionKey = "requesterId"
  static TableName = process.env.HISTORY_TABLE_NAME
  
  constructor () {
    super()
  }

  async save(model: HistoryModel) {
    const params = {
      Item: model,
      TableName: HistoryRepository.TableName
    }

    await this.database.put(params)
    return model
  }

  async getByRequesterId(requesterId: string, page: number) {
    
    const params = {
      TableName: HistoryRepository.TableName,
      KeyConditionExpression: "#pk = :pkValue",
      ExpressionAttributeNames: {
        "#pk": HistoryRepository.PartitionKey
      },
      ExpressionAttributeValues: {
        ":pkValue": requesterId
      },
      ScanIndexForward: false,
      Limit: 10
    }

    let response = null
    let lastEvaluatedKey = null

    do {      
      response = await this.database.query(params)
      
      page--
      lastEvaluatedKey = response.LastEvaluatedKey
      if (lastEvaluatedKey) params["ExclusiveStartKey"] = lastEvaluatedKey
    } while(page && lastEvaluatedKey)

    return response.Items
  }
}