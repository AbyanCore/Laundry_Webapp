import axios from "axios";
import Cookies from "js-cookie";

export const AxiosCus = axios.create({
    withCredentials: true,
    baseURL: "https://laundryapi.insidertech.cloud/",
    timeout: 5000,
    headers: {
        Authorization: Cookies.get("user-token"),
    },
});
