import axios from "axios";

const mainUrl = import.meta.env.VITE_API_BASE_URL;

const apiClient = axios.create({
  baseURL: mainUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
