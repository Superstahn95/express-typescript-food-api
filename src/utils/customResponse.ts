import { ResponseT } from "../interfaces";

export const customResponse = <T>({
  data,
  error,
  message,
  status,
  success,
}: ResponseT<T>) => {
  return { data, error, message, status, success };
};
