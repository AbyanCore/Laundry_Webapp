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
import { formatCurrencyIDR } from "../../../Utils/Currency.utils";
import {
    deleteMoneyTransaction,
    getMoneyTransactions,
} from "../../../Api/MoneyTransaction.API";

const DmoneyPage = () => {
    const [MoneyTransaction, setMoneyTransaction] = useState([]);
    const [opendetail, setOpendetail] = useState(0);
    const [opendialog, setOpendialog] = useState({ open: false, id: 0 });

    const asyncdata = async () => {
        const moneytdata = await getMoneyTransactions();

        setMoneyTransaction(moneytdata.data);
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
                            await deleteMoneyTransaction(opendialog["id"]);
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
                        History Keuangan
                    </h1>
                    <Link to="/dashboard/keuangan/keuangan/add" className="p-2">
                        <Button>Tambah Keuangan</Button>
                    </Link>
                </div>
                <List>
                    {MoneyTransaction.map((money_transaction: any, index) => (
                        <ListItem
                            className="hover:scale-[1.01] hover:py-[1.1rem] duration-200 "
                            key={money_transaction.id}
                            onClick={() =>
                                setOpendetail(
                                    money_transaction.id != opendetail
                                        ? money_transaction.id
                                        : 0
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
                                            {money_transaction.title}
                                        </Typography>
                                        <Typography
                                            variant="small"
                                            color="gray"
                                            className="font-normal"
                                        >
                                            {formatCurrencyIDR(
                                                money_transaction.amount
                                            )}
                                            /{money_transaction.user_id}
                                        </Typography>
                                        <Collapse
                                            open={
                                                opendetail ==
                                                money_transaction.id
                                            }
                                            className="text-sm"
                                        >
                                            <h1>
                                                {money_transaction.description}
                                            </h1>
                                        </Collapse>
                                    </div>
                                </div>
                                <div className="flex gap-x-2 h-10">
                                    <Link
                                        to={`/dashboard/keuangan/keuangan/edit/${money_transaction.id}`}
                                    >
                                        <Button color="green">Edit</Button>
                                    </Link>
                                    <Button
                                        color="red"
                                        onClick={() =>
                                            setOpendialog({
                                                open: true,
                                                id: money_transaction.id,
                                            })
                                        }
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </div>
                        </ListItem>
                    ))}
                    {MoneyTransaction.length == 0 ? (
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

export default DmoneyPage;
