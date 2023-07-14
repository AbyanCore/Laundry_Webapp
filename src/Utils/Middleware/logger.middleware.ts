import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const LoggerMiddleware = () => {
    const location = useLocation();

    useEffect(() => {
        // console.log(
        //     `%c ${navigator.userAgent} ${location.pathname} ${new Date(
        //         Date.now()
        //     ).toUTCString()}`,
        //     "color: #00aaff; font-size: 18px;"
        // );
    }, [location]);

    return null;
};

export { LoggerMiddleware };
