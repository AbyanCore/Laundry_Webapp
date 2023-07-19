import { Badge, Button, Input, Typography } from "@material-tailwind/react";
import * as React from "react";
import { getuserbytoken } from "../../../Api/Auth.API";
import { getServiceDetails, getServices } from "../../../Api/Service.API";
import { getCustomers } from "../../../Api/Customer.API";
import { formatCurrencyIDR } from "../../../Utils/Currency.utils";
import { getworkersbyid } from "../../../Api/Worker.API";
import { addOrder } from "../../../Api/Order.API";
import { Tooltip } from "recharts";

type Cart = {
    service: any;
    amount: number;
};

const OnAddOrder = () => {
    const [formData, setFormData] = React.useState<any>({
        cashier_id: -1,
        client_id: -1 as number,
        service_id: -1,
        outlet_id: -1,
        discount: 0,
        amount: 0,
        phase: "antrian",
    });
    const [Service, setService] = React.useState<any>([]);
    const [Client, setClient] = React.useState<any>([]);
    const [Cart, setCart] = React.useState<Array<Cart>>([]);
    const [Moneysum, setMoneysum] = React.useState<number>(0.0);
    const [ServiceDetail, setServiceDetail] = React.useState<any>([]);

    const handleInputChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = e.target;

        setFormData({ ...formData, [name]: value });
        console.log(formData);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        await Promise.all(
            Cart.map(async (item) => {
                const discount: number = ServiceDetail.find(
                    (detail: any) => detail.service_id == item.service.id
                ).discount;

                await addOrder({
                    ...formData,
                    service_id: item.service.id,
                    amount: item.amount,
                    discount: discount ? discount : 0,
                });
            })
        );

        window.history.back();
    };

    React.useEffect(() => {
        const run = async () => {
            const userdata = await getuserbytoken();
            const servicedata = await getServices();
            const clientdata = await getCustomers();
            const realuser = await getworkersbyid(userdata.data.user_id);
            const servicedetaildata = await getServiceDetails();

            setFormData({
                ...formData,
                cashier_id: realuser.data.id,
                outlet_id: realuser.data.outlet_id,
            });

            setService(servicedata.data);
            setClient(clientdata.data);
            setServiceDetail(servicedetaildata.data);
        };

        run();
    }, []);

    React.useEffect(() => {
        let total = 0;
        Cart.forEach((item) => {
            total += item.service.price * item.amount;
        });
        setMoneysum(Moneysum + total);
    }, [Cart]);

    const addToCart = () => {
        const { service_id, amount } = formData;

        if (!service_id || !amount) {
            return;
        }

        const service = Service.find((item: any) => item.id == service_id);

        if (service) {
            const existingItem = Cart.find(
                (item) => item.service.id === service.id
            );

            if (existingItem) {
                const updatedCart = Cart.map((item) => {
                    if (item.service.id === service.id) {
                        return {
                            service,
                            amount,
                        };
                    }
                    return item;
                });

                setCart(updatedCart);
            } else {
                const newCartItem = {
                    service,
                    amount,
                };

                setCart([...Cart, newCartItem]);
            }

            setFormData({ ...formData, service_id: "", amount: "" });
        }
    };

    const deleteCart = (id: number) => {
        const newCart = Cart.filter((item) => item.service.id !== id);

        setCart(newCart);
    };

    return (
        <div className="flex flex-col">
            <div className="px-2 relative flex flex-col w-screen overflow-x-auto">
                <h1 className="text-xl text-center py-2 font-bold">
                    Deskripsi
                </h1>
                <table className="w-full min-w-max table-auto text-left bg-white">
                    <thead>
                        <tr>
                            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal leading-none opacity-70"
                                >
                                    Layanan
                                </Typography>
                            </th>
                            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal leading-none opacity-70"
                                >
                                    Jumlah
                                </Typography>
                            </th>
                            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal leading-none opacity-70"
                                >
                                    Harga Asli
                                </Typography>
                            </th>
                            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal leading-none opacity-70"
                                >
                                    Harga Total
                                </Typography>
                            </th>
                            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal leading-none opacity-70"
                                >
                                    Aksi
                                </Typography>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {Cart.map(({ service, amount }) => (
                            <tr
                                key={service.id}
                                className="even:bg-blue-gray-50/50"
                            >
                                <td className="p-4">
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal"
                                    >
                                        {service.name}
                                    </Typography>
                                </td>
                                <td className="p-4">
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal"
                                    >
                                        {amount}
                                    </Typography>
                                </td>
                                <td className="p-4">
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal"
                                    >
                                        {formatCurrencyIDR(service.price)}
                                    </Typography>
                                </td>
                                <td className="p-4">
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal"
                                    >
                                        {formatCurrencyIDR(
                                            service.price * amount
                                        )}
                                    </Typography>
                                </td>
                                <td className="p-4">
                                    <Typography
                                        as="button"
                                        variant="small"
                                        color="blue"
                                        className="font-medium"
                                        onClick={() => deleteCart(service.id)}
                                    >
                                        Delete
                                    </Typography>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <hr className="my-2 border-blue-gray-50" />
            <form className="flex flex-col gap-2 px-5" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-y-3">
                    <div className="flex gap-x-5 place-items-center">
                        <h1>Konsumen</h1>
                        <select
                            title="client_id"
                            name="client_id"
                            value={formData.client_id}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    client_id: parseInt(e.target.value),
                                })
                            }
                            disabled={Cart.length > 0}
                            required={Cart.length == 0}
                        >
                            <option value={""}>Pilih Konsumen</option>
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
                            value={formData.service_id}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    service_id: parseInt(e.target.value),
                                })
                            }
                            disabled={formData.client_id == -1}
                            required={Cart.length == 0}
                        >
                            <option>Pilih Layanan</option>
                            {Service.map((item: any, index: number) => (
                                <option key={index} value={parseInt(item.id)}>
                                    {item.name}
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
                            value={formData.amount}
                            disabled={formData.client_id == -1}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    amount: parseInt(e.target.value),
                                })
                            }
                            required={Cart.length == 0}
                        />
                    </div>
                </div>
                <div className="self-center">
                    <Badge content={Cart.length} invisible={Cart.length <= 0}>
                        <Button
                            onClick={addToCart}
                            disabled={formData.client_id == -1}
                        >
                            Tambah Ke Keranjang
                        </Button>
                    </Badge>
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
                    <Button
                        color="orange"
                        type="reset"
                        onClick={() => {
                            setFormData({ ...formData, client_id: "" });
                            setMoneysum(0);
                            setCart([]);
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        color="green"
                        type="submit"
                        disabled={Cart.length <= 0}
                    >
                        Submit
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default OnAddOrder;
