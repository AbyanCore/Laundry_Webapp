import Cookies from "js-cookie";
import { AxiosCus } from "../Utils/Axios.Utils";

const login = async (email: string, password: string) => {
    try {
        const data = await AxiosCus.post("/auth/login", {
            email: email,
            password: password,
        });

        return data.data.data;
    } catch (error) {
        console.log(error);
        return;
    }
};

const getuserbytoken = async () => {
    try {
        const data = await AxiosCus.get("/auth/token", {
            params: {
                token: Cookies.get("user-token") || "NotFound",
            },
        });

        return data.data;
    } catch (error) {
        console.log(error);
        return;
    }
};

const logout = async () => {
    try {
        const data = await AxiosCus.get("/auth/logout", {
            headers: {
                token: Cookies.get("user-token"),
            },
        });

        return data.data;
    } catch (error) {
        console.log(error);
        return;
    }
};

export { login, getuserbytoken, logout };
