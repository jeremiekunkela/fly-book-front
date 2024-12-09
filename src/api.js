import axios from "axios";

const client = axios.create({
  baseURL: "http://localhost:8080", 
  headers: { "Content-Type": "application/json" },
  proxy: {
    host: 'localhost',
    port: 8080, 
    protocol: 'http',
  },
});

client.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    console.log("Attaching JWT token . . . ");
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/signin";
    }
    return Promise.reject(error);
  }
);

export default client;
