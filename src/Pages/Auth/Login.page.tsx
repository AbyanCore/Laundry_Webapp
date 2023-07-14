import { useState, useEffect } from "react";
import { getuserbytoken, login } from "../../Api/Auth.API";
import { Alert } from "@material-tailwind/react";
import Cookies from "js-cookie";
import { getswitchdaytime } from "../../Utils/Time.utils";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const navigate = useNavigate();
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [showalert, setshowalert] = useState(false);

    useEffect(() => {
        const run = async () => {
            const user = await getuserbytoken();

            if (user.code == 201) {
                navigate("../../dashboard/beranda");
            } else {
                Cookies.remove("user-token");
            }
        };

        run();
    }, []);

    const actionhandler = async () => {
        const data = await login(email, password);

        setemail("");
        setpassword("");

        if (data && data.code === 201) {
            Cookies.set("user-token", data.data.token, {
                expires: getswitchdaytime(),
                path: "/",
                secure: true,
            });

            window.location.href = "../../dashboard/beranda";
        } else {
            setshowalert(true);
        }
    };

    return (
        <div className="h-full w-full">
            <Alert
                className="absolute top-2 z-50"
                color="red"
                open={showalert}
                onClose={() => setshowalert(false)}
                animate={{
                    mount: { y: 0 },
                    unmount: { y: -100 },
                }}
            >
                Login Gagal
            </Alert>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        className="mx-auto h-10 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt="Your Company"
                    />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Masuk ke Akun Anda
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6">
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Alamat Email
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => {
                                        setemail(e.target.value);
                                    }}
                                    required
                                    className="text-center block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Password
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => {
                                        setpassword(e.target.value);
                                    }}
                                    required
                                    className="text-center block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="button"
                                onClick={actionhandler}
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Masuk
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
