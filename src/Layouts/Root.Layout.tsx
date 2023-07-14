import { Outlet } from "react-router-dom";
import { LoggerMiddleware } from "../Utils/Middleware/logger.middleware";
import SecurityMiddleware from "../Utils/Middleware/Security.middleware";

const RootLayout = () => {
    return (
        <div>
            <SecurityMiddleware />
            <LoggerMiddleware />
            <Outlet />
        </div>
    );
};

export default RootLayout;
