import { Button, Input, Textarea } from "@material-tailwind/react";
import * as React from "react";
import { useParams } from "react-router-dom";
import {
    getMoneyTransactionbyId,
    updateMoneyTransaction,
} from "../../../Api/MoneyTransaction.API";

const OnEditMoneyTransaction = () => {
    const { id } = useParams();
    const [formData, setformData] = React.useState<any>({});

    React.useEffect(() => {
        const fetchdata = async () => {
            const data = await getMoneyTransactionbyId(Number(id));

            setformData(data.data);
        };

        fetchdata();
    }, [id]);

    const handleInputChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = e.target;
        setformData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        await updateMoneyTransaction(Number(id), formData);
        window.history.back();
    };

    return (
        <div className="p-5">
            <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-y-3">
                    <div className="flex gap-x-5 place-items-center">
                        <h1>Judul</h1>
                        <Input
                            type="text"
                            name="title"
                            placeholder="Judul"
                            value={formData.title}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="flex gap-x-5 place-items-center">
                        <h1>Deskripsi</h1>
                        <Textarea
                            name="description"
                            placeholder="Deskripsi"
                            value={formData.description}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="flex gap-x-5 place-items-center">
                        <h1>Jumlah</h1>
                        <Input
                            type="number"
                            name="amount"
                            placeholder="Harga"
                            value={formData.amount}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                </div>
                <div className="self-end py-20 flex flex-row gap-x-2">
                    <Button color="red" onClick={() => window.history.back()}>
                        Cancel
                    </Button>
                    <Button color="orange" type="reset">
                        Reset
                    </Button>
                    <Button color="green" type="submit">
                        Submit
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default OnEditMoneyTransaction;
