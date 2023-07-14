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
    Tooltip,
} from "@material-tailwind/react";
import { useState, useEffect } from "react";
import { deleteworker, getworkers } from "../../../Api/Worker.API";
import { getoutlets } from "../../../Api/Outlet";
import { Link } from "react-router-dom";
import { formatCurrencyIDR } from "../../../Utils/Currency.utils";
import { BarChart, CartesianGrid, XAxis, YAxis, Legend, Bar } from "recharts";
import { getTitles } from "../../../Api/Misc.API";

const DworkerPage = () => {
    const [worker, setWorker] = useState([]);
    const [outlet, setOutlet] = useState([]);
    const [opendetail, setOpendetail] = useState(0);
    const [opendialog, setOpendialog] = useState({ open: false, id: 0 });
    const [title, setTitle] = useState([]);
    const [dataglobal, setDataglobal] = useState([{ name: "", count: 0 }]);

    const asyncdata = async () => {
        const workerdata = await getworkers();
        const outletdata = await getoutlets();
        const titledata = await getTitles();

        setWorker(workerdata.data);
        setOutlet(outletdata.data);
        setTitle(titledata.data);
    };

    useEffect(() => {
        asyncdata();
    }, []);

    useEffect(() => {
        const data = title.map((item: any) => ({
            name: item,
            count: worker.filter((worker: any) => worker.title === item).length,
        }));

        setDataglobal(data);
    }, [worker, title]);

    return (
        <div className="flex flex-col">
            <div className=" overflow-x-auto h-max w-screen flex flex-row gap-2 mb-2">
                <Card className="flex-grow p-2">
                    <BarChart
                        width={500}
                        height={250}
                        data={dataglobal}
                        className="self-center"
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis dataKey="count" />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="count" fill="#8884d8" />
                    </BarChart>
                </Card>
            </div>
            <div className="overflow-x-auto flex w-screen mb-3">
                <Card
                    className={`flex-row flex-grow ${
                        true ? "bg-green-100" : "bg-red-100"
                    } p-2 justify-between m-1 place-items-center gap-2`}
                >
                    <h1 className="text-lg px-2">Total</h1>
                    <h1 className="text-xl font-bold px-2">
                        {dataglobal.length}
                    </h1>
                </Card>
                {dataglobal.map((item: any) => (
                    <Card
                        className={`flex-row flex-grow ${
                            item.count != 0 ? "bg-green-100" : "bg-red-100"
                        } p-2 justify-between m-1 place-items-center gap-2`}
                    >
                        <h1 className="text-lg px-2">{item.name}</h1>
                        <h1 className="text-xl px-2 font-bold">
                            {item.count || 0}
                        </h1>
                    </Card>
                ))}
            </div>
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
                            await deleteworker(opendialog["id"]);
                            asyncdata();
                            setOpendialog({ open: false, id: 0 });
                        }}
                    >
                        <span>Confirm</span>
                    </Button>
                </DialogFooter>
            </Dialog>
            <Card className="h-max overflow-y-auto backdrop-blur-[30px]">
                <div className="flex flex-row place-content-between">
                    <h1 className="flex font-bold text-3xl place-self-center pl-6">
                        Daftar Pekerja
                    </h1>
                    <Link
                        to="/dashboard/sumber-daya/karyawan/add"
                        className="p-2"
                    >
                        <Button>Tambah Pekerja</Button>
                    </Link>
                </div>
                <List>
                    {worker.map((worker: any, index) => (
                        <ListItem
                            className="hover:scale-[1.01] hover:py-[1.1rem] duration-200 "
                            key={worker.id}
                            onClick={() =>
                                setOpendetail(
                                    worker.id != opendetail ? worker.id : 0
                                )
                            }
                        >
                            <div className="flex flex-row justify-between w-full">
                                <div className="flex ">
                                    <Typography variant="h2">
                                        {index + 1}
                                    </Typography>
                                    <div className="px-3 w-full">
                                        <Typography
                                            variant="h6"
                                            color="blue-gray"
                                        >
                                            {worker.name}
                                        </Typography>
                                        <Typography
                                            variant="small"
                                            color="gray"
                                            className="font-normal"
                                        >
                                            {worker.title} @{" "}
                                            {
                                                (
                                                    outlet.find(
                                                        (item: any) =>
                                                            item.id ==
                                                            worker.outlet_id
                                                    ) as any
                                                )["name"]
                                            }
                                        </Typography>
                                        <Collapse
                                            open={opendetail == worker.id}
                                            className="text-sm"
                                        >
                                            <h1>{worker.address}</h1>
                                            <h1>{worker.email}</h1>
                                            <h1>
                                                {formatCurrencyIDR(
                                                    worker.salary
                                                )}
                                            </h1>
                                        </Collapse>
                                    </div>
                                </div>
                                <div className="flex gap-x-2 h-10">
                                    <Link
                                        to={`/dashboard/sumber-daya/karyawan/edit/${worker.id}`}
                                    >
                                        <Button color="green">Edit</Button>
                                    </Link>
                                    <Button
                                        color="red"
                                        onClick={() =>
                                            setOpendialog({
                                                open: true,
                                                id: worker.id,
                                            })
                                        }
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </div>
                        </ListItem>
                    ))}
                    {Worker.length == 0 ? (
                        <h1 className="text-center font-bold text-2xl">
                            Tidak Ada Data
                        </h1>
                    ) : (
                        0
                    )}
                </List>
            </Card>
        </div>
    );
};

export default DworkerPage;
