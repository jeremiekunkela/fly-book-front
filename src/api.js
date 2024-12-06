import axios from "axios";


const client = axios.create({
  baseURL: "http://localhost:8080/",
  headers: { "Content-Type": "application/json" },
  contentType: "application/json",
  withCredentials: true,
  proxy: {
    protocol: 'http',
    host: 'http://localhost/',
    port: 8080
},

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
