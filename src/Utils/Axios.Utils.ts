import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export const AxiosCus = axios.create({
    withCredentials: true,
    baseURL: "http://localhost:4000/",
    // baseURL: "https://laundryapi.insidertech.cloud/",
    timeout: 5000,
    headers: {
        Authorization: Cookies.get("user-token"),
    },
});

export const useAxiosLoader = () => {
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        const inc = (mod: any) => setCounter((c) => c + mod);

        const handleRequest = (config: any) => (inc(1), config);
        const handleResponse = (response: any) => (inc(-1), response);
        const handleError = (error: any) => (inc(-1), Promise.reject(error));

        // add request interceptors
        const reqInterceptor = AxiosCus.interceptors.request.use(
            handleRequest,
            handleError
        );
        // add response interceptors
        const resInterceptor = AxiosCus.interceptors.response.use(
            handleResponse,
            handleError
        );
        return () => {
            // remove all intercepts when done
            AxiosCus.interceptors.request.eject(reqInterceptor);
            AxiosCus.interceptors.response.eject(resInterceptor);
        };
    }, []);

    return counter > 0;
};
