import { SwApi } from "../../../src/services/apis/swApi"

describe('Test of integration with SW API', () => {

  test('Expect the correct lists of persons', async () => {
    const api = new SwApi()
    const results = await api.getListSwPersons()

    expect(results).toHaveLength(10)
    results.forEach(person => {
      expect(person).toHaveProperty('name');
      expect(person).toHaveProperty('gender');
      expect(person).toHaveProperty('height');
    });

    expect(results[0].name).toBeTruthy()
    expect(results[0].gender).toBeTruthy()
  })
})