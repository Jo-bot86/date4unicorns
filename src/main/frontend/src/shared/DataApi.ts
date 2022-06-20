import axios, { Method } from "axios";

export function dataApi<T>(
  method: Method,
  path: string,
  callback: (data: T) => void,
  data = {},
): void {
  axios({
    method,
    url: path,
    data,
  })
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
}
