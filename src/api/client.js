import axios from "axios";

const api = axios.create({
  baseURL: "http://electra-api.runasp.net/api",
  withCredentials: true,
});

export default api;
