import axios from "axios";
import Cookies from "js-cookie";

export const AxiosCus = axios.create({
    withCredentials: true,
    baseURL: "http://dev.insidertech.id:4000/",
    timeout: 1000,
    headers: {
        Authorization: Cookies.get("user-token"),
    },
});
