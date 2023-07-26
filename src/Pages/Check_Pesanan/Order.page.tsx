import {
    Alert,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Dialog,
    Input,
} from "@material-tailwind/react";
import { useState } from "react";
import { getOrderbyToken } from "../../Api/Order.API";

const OrderPage = () => {
    const [data, setData] = useState<any>();
    const [token, setToken] = useState("");
    const [openDialog, setOpenDialog] = useState(false);

    const handleOpenDialog = () => {
        setData("");
        setToken("");
        setOpenDialog((cur) => !cur);
    };

    const fetchdata = async () => {
        if (!token) return;

        const data = await getOrderbyToken(token);
        setData(data);

        if (data?.code == 201) {
            setOpenDialog(true);
        } else {
            setTimeout(() => setData(""), 1000);
        }
    };

    return (
        <div className="w-screen flex-row">
            <div className="absolute w-screen top-0 z-40">
                <Alert
                    animate={{
                        mount: { scale: 1, opacity: 1 },
                        unmount: { scale: 0, opacity: 0 },
                    }}
                    transition={{
                        duration: 4,
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                    }}
                    color="red"
                    open={data?.code !== 201 && data}
                    className="w-1/4"
                >
                    Token Tidak Valid
                </Alert>
            </div>

            <Dialog
                open={openDialog}
                handler={handleOpenDialog}
                className="p-2 w-fit flex flex-col"
            >
                <h1 className="text-2xl font-bold text-center">
                    Detail Pesanan
                </h1>
                <div className="w-full">
                    <CardHeader
                        color={
                            data?.data?.phase === "batal"
                                ? "red"
                                : data?.data?.phase === "selesai"
                                ? "green"
                                : "blue"
                        }
                        variant="gradient"
                        floated={false}
                        className="p-2"
                    >
                        {JSON.stringify(data?.data)}
                    </CardHeader>
                </div>
            </Dialog>

            <div className="flex grid-cols gap-10 justify-around flex-wrap">
                <div>
                    <Card className="p-5 rounded-3xl">
                        <CardBody className="flex-col">
                            <h1 className="font-bold text-xl pb-3">Token</h1>
                            <p className="pb-2 font-thin">
                                Masukan Tokenmu untuk melihat detail
                            </p>
                            <Input
                                label="Token"
                                onChange={(e) => {
                                    setData(
                                        e.target.value === data ? data : ""
                                    );
                                    setToken(e.target.value);
                                }}
                                error={data?.code === 404}
                                success={data?.code === 201}
                            />
                        </CardBody>
                        <CardFooter className="-mt-5">
                            <Button onClick={fetchdata}>Masuk</Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default OrderPage;
