export interface Response<T> {
    statusCode: number;
    message: string;
    status: boolean;
    data: T;
}
  