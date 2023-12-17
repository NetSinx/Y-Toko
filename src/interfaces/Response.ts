export interface ResponseClient {
  code: number,
  status: string,
  message?: string | any[],
  data?: any
}