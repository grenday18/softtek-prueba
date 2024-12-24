import HistoryModel from "@core/models/historyModel"

const historyHandlingMiddleware = () => {
  return {
    after: async (handler: any) => {
      
      const history = new HistoryModel(handler.event)
      await history.notify(handler.response.statusCode, handler.response.body.data)
    },
  }
}

export { historyHandlingMiddleware }