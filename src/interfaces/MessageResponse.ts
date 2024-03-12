export interface ResponseT<T = null> {
  data: T;
  success: boolean;
  error: boolean;
  status: number;
  message: string;
}

export default ResponseT;
