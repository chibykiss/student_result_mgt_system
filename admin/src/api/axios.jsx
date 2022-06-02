import axios from "axios";
export default axios.create({
    baseURL: "http://localhost:5000"
})
export const privateAxios = axios.create({
    baseURL: "http://localhost:5000",
    headers: {'Content-Type': 'application/json'},
    withCredentials: true
})