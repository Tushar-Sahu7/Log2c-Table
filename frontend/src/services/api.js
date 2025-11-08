import axios from "axios"

const API = axios.create({
  baseURL: "http://localhost:7777/api/auth"
})

export const registerUser = (userData) => API.post("./register", userData)
export const loginUser = (userData) => API.post("./login", userData)
export const getUsers = () => API.get("/users");

export default API;