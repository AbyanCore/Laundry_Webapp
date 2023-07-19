import {
    List,
    ListItem,
    Typography,
    Button,
    Card,
    Collapse,
    DialogFooter,
    DialogBody,
    DialogHeader,
    Dialog,
} from "@material-tailwind/react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { deleteOrder, getOrders } from "../../../Api/Order.API";
import { getworkers } from "../../../Api/Worker.API";
import { getCustomers } from "../../../Api/Customer.API";
import { getoutlets } from "../../../Api/Outlet";
import { getServices } from "../../../Api/Service.API";
import { getPhase } from "../../../Api/Misc.API";

const DorderPage = () => {
    const [Order, setOrder] = useState([]);
    const [opendetail, setOpendetail] = useState(0);
    const [Worker, setWorker] = useState([]);
    const [Client, setClient] = useState([]);
    const [Outlet, setOutlet] = useState([]);
    const [Service, setService] = useState([]);
    const [Phase, setPhase] = useState([]);
    const [opendialog, setOpendialog] = useState({ open: false, id: 0 });
    const [filterPhase, setFilterPhase] = useState("all");

    const asyncdata = async () => {
        const orderdata = await getOrders();
        const workerdata = await getworkers();
        const clientdata = await getCustomers();
        const outletdata = await getoutlets();
        const servicedata = await getServices();
        const phasedata = await getPhase();

        setOrder(orderdata.data);
        setWorker(workerdata.data);
        setClient(clientdata.data);
        setOutlet(outletdata.data);
        setService(servicedata.data);
        setPhase(phasedata.data);
    };

    useEffect(() => {
        asyncdata();
    }, []);

    return (
        <div className="flex flex-col gap-y-2 my-2">
            <Dialog
                open={opendialog["open"]}
                handler={() => setOpendialog({ open: false, id: 0 })}
            >
                <DialogHeader>Kamu Yakin?</DialogHeader>
                <DialogBody divider>
                    Pertimbangkan Kembali apa yang ingin kamu lakukan. Data yang
                    di hapus tidak bisa di kembalikan lagi. Jika kamu yakin
                    silahkan klik tombol confirm. Jika tidak silahkan klik
                    tombol cancel.
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="red"
                        onClick={() => {
                            setOpendialog({ open: false, id: 0 });
                        }}
                        className="mr-1"
                    >
                        <span>Cancel</span>
                    </Button>
                    <Button
                        variant="gradient"
                        color="green"
                        onClick={async () => {
                            await deleteOrder(opendialog["id"]);
                            asyncdata();
                            setOpendialog({ open: false, id: 0 });
                        }}
                    >
                        <span>Confirm</span>
                    </Button>
                </DialogFooter>
            </Dialog>
            <Card className="p-2">
                <h1>Graph Pembelian</h1>
            </Card>
            <Card className="py-2 flex flex-row gap-x-2 w-screen overflow-x-auto">
                <Card
                    onClick={() => setFilterPhase("all")}
                    className={`p-2 flex-row flex-grow justify-between `}
                >
                    <h1 className="mx-2">Total</h1>
                    <h1 className="mx-2">{Order.length}</h1>
                </Card>
                {Phase.map((phase: any) => (
                    <Card
                        onClick={() =>
                            setFilterPhase(filterPhase == phase ? "all" : phase)
                        }
                        className={`p-2 flex-row flex-grow justify-between ${
                            phase == "selesai"
                                ? "bg-green-50 border-2 border-green-500"
                                : phase == "pengiriman"
                                ? "bg-blue-50 border-2 border-blue-500"
                                : phase == "batal"
                                ? "bg-red-50 border-2 border-red-500"
                                : phase == "proses"
                                ? "bg-yellow-50 border-2 border-yellow-500"
                                : "bg-orange-50 border-2 border-orange-500"
                        }`}
                    >
                        <h1 className="mx-2">{phase}</h1>
                        <h1 className="mx-2">
                            {
                                Order.filter(
                                    (order: any) => order.phase == phase
                                ).length
                            }
                        </h1>
                    </Card>
                ))}
            </Card>
            <Card className="p-2">
                <div className="flex flex-row place-content-between">
                    <h1 className="flex font-bold text-3xl place-self-center pl-3">
                        History Penjualan
                    </h1>
                    <Link to="/dashboard/penjualan/pesanan/add" className="p-2">
                        <Button>Tambah Pesanan</Button>
                    </Link>
                </div>
                <List>
                    {Order.filter((item: any) =>
                        filterPhase == "all"
                            ? item.phase != filterPhase
                            : item.phase == filterPhase
                    ).map((order: any, index) => (
                        <ListItem
                            className={`hover:scale-[1.01] hover:py-[1.1rem] duration-200 
                            ${
                                order.phase == "selesai"
                                    ? "bg-green-50 border-2 border-green-500"
                                    : order.phase == "pengiriman"
                                    ? "bg-blue-50 border-2 border-blue-500"
                                    : order.phase == "batal"
                                    ? "bg-red-50 border-2 border-red-500"
                                    : order.phase == "proses"
                                    ? "bg-yellow-50 border-2 border-yellow-500"
                                    : "bg-orange-50 border-2 border-orange-500"
                            }`}
                            key={order.id}
                            onClick={() =>
                                setOpendetail(
                                    order.id != opendetail ? order.id : 0
                                )
                            }
                        >
                            <div className="flex flex-row justify-between w-full">
                                <div className="flex">
                                    <Typography variant="h2">
                                        {index + 1}
                                    </Typography>
                                    <div className="px-3 w-full">
                                        <Typography
                                            variant="h6"
                                            color="blue-gray"
                                        >
                                            {
                                                (
                                                    Client.find(
                                                        (client: any) => {
                                                            return (
                                                                client.id ==
                                                                order.client_id
                                                            );
                                                        }
                                                    ) as any
                                                )["name"]
                                            }
                                        </Typography>
                                        <Typography
                                            variant="small"
                                            color="gray"
                                            className="font-normal"
                                        >
                                            {order.phase}
                                        </Typography>
                                        <Collapse
                                            open={opendetail == order.id}
                                            className="text-sm"
                                        >
                                            <h1>
                                                {order.amount}{" "}
                                                {
                                                    (
                                                        Service.find(
                                                            (service: any) => {
                                                                return (
                                                                    service.id ==
                                                                    order.service_id
                                                                );
                                                            }
                                                        ) as any
                                                    )["unit_type"]
                                                }
                                            </h1>
                                            <h1>
                                                {
                                                    (
                                                        Service.find(
                                                            (service: any) => {
                                                                return (
                                                                    service.id ==
                                                                    order.service_id
                                                                );
                                                            }
                                                        ) as any
                                                    )["name"]
                                                }
                                            </h1>
                                        </Collapse>
                                    </div>
                                </div>
                                <div className="flex gap-x-2 h-10">
                                    <Link
                                        to={`/dashboard/penjualan/pesanan/edit/${order.id}`}
                                    >
                                        <Button color="green">Edit</Button>
                                    </Link>
                                    <Button
                                        color="red"
                                        onClick={() =>
                                            setOpendialog({
                                                open: true,
                                                id: order.id,
                                            })
                                        }
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </div>
                        </ListItem>
                    ))}
                    {Order.length == 0 ? (
                        <h1 className="text-center font-bold text-2xl">
                            Tidak Ada Data
                        </h1>
                    ) : (
                        ""
                    )}
                </List>
            </Card>
        </div>
    );
};

export default DorderPage;
