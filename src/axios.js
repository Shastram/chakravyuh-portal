import axios from "axios";
const instance = axios.create({
    baseURL: process.env.API_URL,
    headers: {
        "content-type": "application/json"
    }
});

export default instance;