import { AxiosCus } from "../Utils/Axios.Utils";

const getCustomers = async () => {
    try {
        const res = await AxiosCus.get("/customer");

        return res.data;
    } catch (error) {
        console.log(error);
        return;
    }
};

const getCustomerById = async (id: number) => {
    try {
        const res = await AxiosCus.get(`/customer/${id}`);

        return res.data;
    } catch (error) {
        console.log(error);
        return;
    }
};

const addCustomer = async (data: any) => {
    try {
        const res = await AxiosCus.post("/customer", data);

        return res.data;
    } catch (error) {
        console.log(error);
        return;
    }
};

const updateCustomer = async (id: number, data: any) => {
    try {
        const res = await AxiosCus.patch(`/customer/${id}`, data);

        return res.data;
    } catch (error) {
        console.log(error);
        return;
    }
};

const deleteCustomer = async (id: number) => {
    try {
        const res = await AxiosCus.delete(`/customer/${id}`);

        return res.data;
    } catch (error) {
        console.log(error);
        return;
    }
};

export {
    getCustomers,
    getCustomerById,
    addCustomer,
    updateCustomer,
    deleteCustomer,
};
