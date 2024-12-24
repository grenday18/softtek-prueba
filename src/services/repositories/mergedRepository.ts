import MergedModel from "@core/models/mergedModel"
import { Repository } from "@layer"
import moment from "moment"

class MergedRepository extends Repository {

  static PartitionKey = "name"
  static TableName = process.env.MERGED_TABLE_NAME

  constructor (){
    super()
  }

  async save (mergedModel: MergedModel) : Promise<MergedModel> {
    const params = {
      Item: this.getItemByDynamoDb(mergedModel),
      TableName: MergedRepository.TableName
    }

    await this.database.put(params)
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
      createdAt: moment().format("YYYY-MM-DDTHH:mm:ss.sssZ"),
      isMigrated: false
    }
  }
}

export default MergedRepository