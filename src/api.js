import axios from "axios";

const client = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  headers: { "Content-Type": "application/json" },
  proxy: {
    host: "localhost",
    port: 8080,
    protocol: "http",
  },
});

client.interceptors.request.use((config) => {
  console.log(
    "import.meta.env.VITE_SERVER_URL",
    import.meta.env.VITE_SERVER_URL
  );
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
    if (error.response.status === 403) {
      localStorage.removeItem("token");
      window.location.href = "/signin";
    }
    return Promise.reject(error);
  }
);

export default client;
