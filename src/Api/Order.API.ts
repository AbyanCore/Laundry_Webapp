import { AxiosCus } from "../Utils/Axios.Utils";

const getOrders = async () => {
    try {
        const res = await AxiosCus.get("/order");

        return res.data;
    } catch (error) {
        console.log(error);
        return;
    }
};

const getOrderbyId = async (id: number) => {
    try {
        const res = await AxiosCus.get(`/order/${id}`);

        return res.data;
    } catch (error) {
        console.log(error);
        return;
    }
};

const addOrder = async (data: any) => {
    try {
        const res = await AxiosCus.post("/order", data);

        return res.data;
    } catch (error) {
        console.log(error);
        return;
    }
};

const updateOrder = async (id: number, data: any) => {
    try {
        const res = await AxiosCus.patch(`/order/${id}`, data);

        return res.data;
    } catch (error) {
        console.log(error);
        return;
    }
};

const deleteOrder = async (id: number) => {
    try {
        const res = await AxiosCus.delete(`/order/${id}`);

        return res.data;
    } catch (error) {
        console.log(error);
        return;
    }
};

export { getOrders, getOrderbyId, addOrder, updateOrder, deleteOrder };
