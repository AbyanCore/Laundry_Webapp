import axios from "axios";
import Cookies from "js-cookie";

const DashboardLoader = async () => {
    try {
        const data = await axios.get("http://localhost:4000/auth/token", {
            headers: {
                token: Cookies.get("user-token"),
            },
        });

        return data;
    } catch (error) {
        console.log(error);
        return;
    }
};

export default DashboardLoader;
