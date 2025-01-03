import { QueryCommandInput } from "@aws-sdk/client-dynamodb"
import HistoryModel from "@core/models/historyModel"
import { Repository } from "@layer"

class HistoryRepository  extends Repository{
  
  static PartitionKey = "requesterId"
  static SortKey = "timestamp"
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

  async getByRequesterId(requesterId: string, page: number) : Promise<HistoryModel[]> {
    
    const params: any = {
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

    let lastEvaluatedKey = null
    let response

    do {      
      response = await this.database.query(params)
      
      page--
      lastEvaluatedKey = response.LastEvaluatedKey
      if (lastEvaluatedKey) params['ExclusiveStartKey'] = lastEvaluatedKey
    } while(page && lastEvaluatedKey)

    return response.Items?.map((item: any) => this.trasformItemToModel(item)) || []
  }

  async countRequestsByRequesterId(requesterId: string, timestampLimit: string) : Promise<number> 
  {
    const params: any = {
      TableName: HistoryRepository.TableName,
      KeyConditionExpression: '#pk = :pkValue AND #timestamp >= :timestampLimit',
      ExpressionAttributeNames: {
        "#pk": HistoryRepository.PartitionKey,
        "#timestamp": HistoryRepository.SortKey
      },
      ExpressionAttributeValues: {
        ":pkValue": requesterId,
        ':timestampLimit': timestampLimit,
      },
      Select: 'COUNT',
    }
  
    let count = 0;
    let lastEvaluatedKey = null;
  
    do {
      
      console.log("consultar query...")
      const result = await this.database.query(params)

      count += (result?.Count ?? 0)
      lastEvaluatedKey = result.LastEvaluatedKey;
      if (lastEvaluatedKey) params['ExclusiveStartKey'] = lastEvaluatedKey

    } while (lastEvaluatedKey)
  
    return count;
  }

  trasformItemToModel (item: any) {
    const model = new HistoryModel()

    model.requesterId = item.requesterId
    model.timestamp = item.timestamp
    model.userAgent = item.userAgent
    model.routeKey =  item.routeKey
    model.responseStatus = item.responseStatus
    model.responsePayload = item.responsePayload

    return model
  }

}

export default HistoryRepository