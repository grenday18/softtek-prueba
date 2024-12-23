import { DynamoDB } from "@aws-sdk/client-dynamodb"
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb"

export class Repository {
  
  database: DynamoDBDocument

  constructor () {
    const marshallOptions = {
      // Whether to remove undefined values while marshalling.
      removeUndefinedValues: true // false, by default.
    }
    
    const translateConfig = { marshallOptions }
    
    const dbClient = new DynamoDB({})
    this.database = DynamoDBDocument.from(dbClient, translateConfig)
  }
}