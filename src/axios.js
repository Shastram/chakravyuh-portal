import axios from "axios";
const instance = axios.create({
    baseURL: "http://20.124.13.106:8000",
    headers: {
        "content-type": "application/json"
    }
});

export default instance;