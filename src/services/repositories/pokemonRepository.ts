import PokemonModel from "@core/models/pokemonModel"
import { Repository } from "@layer"

class PokemonRepository extends Repository{

  static PartitionKey = "id"
  static TableName = process.env.POKEMON_TABLE_NAME

  constructor (){
    super()
  }

  async save (model: PokemonModel) : Promise<PokemonModel> {
    const params = {
      Item: this.getItemByDynamoDb(model),
      TableName: PokemonRepository.TableName
    }

    await this.database.put(params)
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