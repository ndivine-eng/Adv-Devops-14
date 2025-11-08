import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/tasks", // your backend URL
});

export default API;
