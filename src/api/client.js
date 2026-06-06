import axios from "axios";

const api = axios.create({
  baseURL: "https://electra-api.runasp.net/api",
  withCredentials: true,
});

export default api;
