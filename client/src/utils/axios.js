import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000", // Your backend server URL
  withCredentials: true, // Ensures cookies are sent with requests
});

export default instance;

