import axios from "axios";

const server_url = "http://localhost:5000/api"

const API = axios.create({
    baseURL: server_url,
    withCredentials: true
});

export default API;
