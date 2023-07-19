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
import { deleteCustomer, getCustomers } from "../../../Api/Customer.API";

const DcustomerPage = () => {
    const [Customer, setCustomer] = useState([]);
    const [opendetail, setOpendetail] = useState(0);
    const [opendialog, setOpendialog] = useState({ open: false, id: 0 });

    const asyncdata = async () => {
        const customerdata = await getCustomers();

        setCustomer(customerdata.data);
    };

    useEffect(() => {
        asyncdata();
    }, []);

    return (
        <div>
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
                            await deleteCustomer(opendialog["id"]);
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
                        Kelola Pelanggan
                    </h1>
                    <Link
                        to="/dashboard/penjualan/konsumen/add"
                        className="p-2"
                    >
                        <Button>Tambah Pelanggan</Button>
                    </Link>
                </div>
                <List>
                    {Customer.map((customer: any, index) => (
                        <ListItem
                            className="hover:scale-[1.01] hover:py-[1.1rem] duration-200 "
                            key={customer.id}
                            onClick={() =>
                                setOpendetail(
                                    customer.id != opendetail ? customer.id : 0
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
                                            {customer.name}
                                        </Typography>
                                        <Typography
                                            variant="small"
                                            color="gray"
                                            className="font-normal"
                                        >
                                            {customer.address}
                                        </Typography>
                                        <Collapse
                                            open={opendetail == customer.id}
                                            className="text-sm"
                                        >
                                            <h1> {customer.phone_number}</h1>
                                        </Collapse>
                                    </div>
                                </div>
                                <div className="flex gap-x-2 h-10">
                                    <Link
                                        to={`/dashboard/penjualan/konsumen/edit/${customer.id}`}
                                    >
                                        <Button color="green">Edit</Button>
                                    </Link>
                                    <Button
                                        color="red"
                                        onClick={() =>
                                            setOpendialog({
                                                open: true,
                                                id: customer.id,
                                            })
                                        }
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </div>
                        </ListItem>
                    ))}
                    {Customer.length == 0 ? (
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

export default DcustomerPage;
