export interface ResponseClient {
  code: number,
  status: string,
  message?: string,
  data?: any
}