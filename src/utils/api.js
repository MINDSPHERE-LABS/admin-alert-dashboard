import axios from "axios";

const api = axios.create({
    baseURL: "https://ai-backend-1-8udr.onrender.com",
    timeout: 15000,
});

export default api;
