import React from "react";
import ReactDOM from "react-dom/client";
import "./global.css";
import App from "./App";
import { useAxiosLoader } from "./Utils/Axios.Utils";
import { Card, Spinner } from "@material-tailwind/react";
import { motion } from "framer-motion";

const GlobalLoader = () => {
    const loading = useAxiosLoader();

    return (
        <div>
            {loading ? (
                <div className="fixed z-50 flex justify-center items-center w-screen h-screen bg-black/30 backdrop-opacity-30 backdrop-blur-3xl">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{
                            scale: 1,
                        }}
                        drag={true}
                        dragConstraints={{
                            left: -10,
                            right: 10,
                            top: -10,
                            bottom: 10,
                        }}
                        transition={{
                            duration: 0.1,
                            type: "spring",
                            stiffness: 260,
                            damping: 20,
                        }}
                    >
                        <Card className="p-5 rounded-r-xl">
                            <Spinner className="h-16 w-16 text-blue-500/10" />
                        </Card>
                    </motion.div>
                </div>
            ) : (
                ""
            )}
        </div>
    );
};

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

root.render(
    <React.StrictMode>
        <GlobalLoader />
        <App />
    </React.StrictMode>
);
