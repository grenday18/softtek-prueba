export const pathSchemeByTest = {
  type: "object",
  additionalProperties: false,
  properties: {
    id: { type: 'integer', minimum: 1 }
  },
  required: ["id"]
}

export const querySchemeByTest = {
  type: "object",
  additionalProperties: false,
  properties: {
    name: { type: 'string' },
    age: { type: 'integer', minimum: 0 }
  },
  required: ["name", "age"]
}

export const bodySchemeByTest = {
  type: "object",
  additionalProperties: false,
  properties: {
    key: { type: 'integer' },
  },
  required: ["key"]
}