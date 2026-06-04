import axios from "axios";

const api = axios.create({
  baseURL: "https://electra.gameplayblits.workers.dev/api",
  withCredentials: true,
});

export default api;
