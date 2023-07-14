import { useNavigate, useLocation } from "react-router-dom";
import { getuserbytoken } from "../../Api/Auth.API";
import { useEffect } from "react";

const SecurityMiddleware = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const run = async () => {
            const data = await getuserbytoken();

            if (data.code != 201) {
                navigate("unauthorized");
            }
        };

        if (location.pathname.startsWith("/dashboard")) {
            run();
        }
    }, [location.pathname, navigate]);

    return null;
};

export default SecurityMiddleware;
