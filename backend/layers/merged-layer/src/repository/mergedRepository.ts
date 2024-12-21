import { DynamoDB } from "@aws-sdk/client-dynamodb"
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb"
import { MergedModel } from "../models"
import moment from "moment"

const marshallOptions = {
  // Whether to remove undefined values while marshalling.
  removeUndefinedValues: true // false, by default.
}

const translateConfig = { marshallOptions }

const dbClient = new DynamoDB({})
const db = DynamoDBDocument.from(dbClient, translateConfig)

class MergedRepository {

  static PartitionKey = "name"
  static TableName = process.env.MERGED_TABLE_NAME

  constructor (){
  }

  async save (mergedModel: MergedModel) : Promise<MergedModel> {
    const params = {
      Item: this.getItemByDynamoDb(mergedModel),
      TableName: MergedRepository.TableName
    }

    await db.put(params)
    return mergedModel
  }

  private getItemByDynamoDb(mergedModel: MergedModel) {
    return {
      name: mergedModel.name,
      gender: mergedModel.gender,
      nameFilter: mergedModel.name,
      height: mergedModel.height,
      mass: mergedModel.mass,
      homeworld: mergedModel.homeworld,
      createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
      isMigrated: false
    }
  }
}

export default MergedRepository