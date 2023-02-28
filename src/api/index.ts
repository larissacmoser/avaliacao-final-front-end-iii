import axios, { AxiosResponse } from "axios";

axios.defaults.baseURL = "http://localhost:3333/user";

const apiGet = async (url: string) => {
  const response: AxiosResponse = await axios.get(url);
  return response;
};

const apiPut = async (url: string, data: any) => {
  const response: AxiosResponse = await axios.put(url, data);
  return response;
};

const apiPost = async (url: string, data: any) => {
  const response: AxiosResponse = await axios.post(url, data);
  return response;
};

const apiDelete = async (url: string) => {
  const response: AxiosResponse = await axios.delete(url);
  return response;
};

export { apiGet, apiPut, apiPost, apiDelete };
