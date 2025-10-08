export interface ApiResponse<T = any> {
  statusCode: number;
  data: T;
  timestamp: string;
  path: string;
}
