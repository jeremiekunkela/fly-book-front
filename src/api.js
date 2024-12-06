import axios from "axios";
const client = axios.create({
  baseURL: "http://localhost:8000/",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
client.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    console.log("Attaching jwt token . . . ");
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
export default client;
