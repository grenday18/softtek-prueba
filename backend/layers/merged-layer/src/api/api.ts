import axios, { AxiosInstance } from "axios"

export default class Api {
  public request: AxiosInstance
  
  constructor(BASE_URL: string) {
    console.log("base url:", BASE_URL)
    this.request = axios.create({
        baseURL: BASE_URL,
        timeout: 30000
    })
  }
}