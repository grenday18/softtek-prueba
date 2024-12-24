import MergedModel from "../../../src/core/models/mergedModel"
import { swPersonMock } from "../mocks/swPersonMock"

describe('Tests by mergedModel', () => {

  test('Expect the correct init by mergedModel', () => {

    const model = new MergedModel(swPersonMock)

    expect(model.name).toBe("Anakin Skywalker")
    expect(model.height).toBe(188)
    expect(model.mass).toBe(84)
  })
})