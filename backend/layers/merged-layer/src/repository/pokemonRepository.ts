import { DynamoDB } from "@aws-sdk/client-dynamodb"
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb"
import { PokemonModel } from "../models"

const marshallOptions = {
  // Whether to remove undefined values while marshalling.
  removeUndefinedValues: true // false, by default.
}

const translateConfig = { marshallOptions }

const dbClient = new DynamoDB({})
const db = DynamoDBDocument.from(dbClient, translateConfig)

class PokemonRepository {

  static PartitionKey = "id"
  static TableName = process.env.POKEMON_TABLE_NAME

  constructor (){
  }

  async save (model: PokemonModel) : Promise<PokemonModel> {
    const params = {
      Item: this.getItemByDynamoDb(model),
      TableName: PokemonRepository.TableName
    }

    await db.put(params)
    return model
  }

  private getItemByDynamoDb(model: PokemonModel) {
    return {
      id: model.id,
      name: model.name,
      order: model.order,
      abilities: model.abilities.join(","),
      types: model.types.join(","),
      trainner: model.trainnerName
    }
  }
}

export default PokemonRepository