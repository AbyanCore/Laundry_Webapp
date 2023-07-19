import { Button, Input } from "@material-tailwind/react";
import * as React from "react";
import { useParams } from "react-router-dom";
import { formatCurrencyIDR } from "../../../Utils/Currency.utils";
import { getOrderbyId, updateOrder } from "../../../Api/Order.API";
import { getServices } from "../../../Api/Service.API";
import { getCustomers } from "../../../Api/Customer.API";
import { getPhase } from "../../../Api/Misc.API";

const OnEditOrder = () => {
    const { id } = useParams();
    const [FormData, setFormData] = React.useState<any>({});

    const [Moneysum, setMoneysum] = React.useState<number>(0.0);
    const [Service, setService] = React.useState<any>([]);
    const [Client, setClient] = React.useState<any>([]);
    const [Phase, setPhase] = React.useState<any>([]);

    React.useEffect(() => {
        const fetchdata = async () => {
            const orderdata = await getOrderbyId(Number(id));
            const servicedata = await getServices();
            const clientdata = await getCustomers();
            const phasedata = await getPhase();

            setFormData(orderdata.data);
            setService(servicedata.data);
            setClient(clientdata.data);
            setPhase(phasedata.data);
        };

        fetchdata();
    }, [id]);

    const handleInputChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = e.target;
        setFormData({ ...FormData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        await updateOrder(Number(id), FormData);
        window.history.back();
    };

    return (
        <div className="p-5">
            <form className="flex flex-col gap-2 px-5" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-y-3">
                    <div className="flex gap-x-5 place-items-center">
                        <h1>Konsumen</h1>
                        <select
                            title="client_id"
                            name="client_id"
                            value={FormData.client_id}
                            onChange={handleInputChange}
                            disabled
                            required
                        >
                            {Client.map((item: any, index: number) => (
                                <option key={index} value={parseInt(item.id)}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex gap-x-5 place-items-center">
                        <h1>Layanan</h1>
                        <select
                            title="service_id"
                            name="service_id"
                            value={FormData.service_id}
                            onChange={handleInputChange}
                            required
                        >
                            {Service.map((item: any, index: number) => (
                                <option key={index} value={parseInt(item.id)}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex gap-x-5 place-items-center">
                        <h1>Fase</h1>
                        <select
                            title="phase"
                            name="phase"
                            value={FormData.phase}
                            onChange={handleInputChange}
                            required
                        >
                            {Phase.map((item: any, index: number) => (
                                <option key={index} value={item}>
                                    {item}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex gap-x-5 place-items-center">
                        <h1>Jumlah Pesanan</h1>
                        <Input
                            type="number"
                            name="amount"
                            placeholder="Jumlah Pesanan"
                            value={FormData.amount}
                            onChange={(e) => handleInputChange}
                            required
                        />
                    </div>
                </div>

                <hr className="my-2 border-blue-gray-50" />
                <div className="flex flex-row font-bold text-2xl">
                    <h1>Total : </h1>
                    <h1>{`: ${formatCurrencyIDR(Moneysum)}`}</h1>
                </div>
                <hr className="my-2 border-blue-gray-50" />
                <div className="self-end flex flex-row gap-x-2">
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

export default OnEditOrder;
