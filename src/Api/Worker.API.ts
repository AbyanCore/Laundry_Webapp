import { AxiosCus } from "../Utils/Axios.Utils";

const getworkers = async () => {
    try {
        const res = await AxiosCus.get("/worker");

        return res.data;
    } catch (error) {
        console.log(error);
        return;
    }
};

const getworkersbyid = async (id: number) => {
    try {
        const res = await AxiosCus.get(`/worker/${id}`);

        return res.data;
    } catch (error) {
        console.log(error);
        return;
    }
};

const addworker = async (data: any) => {
    try {
        const workerData = {
            name: data.name,
            title: data.title,
            outlet_id: Number(data.outlet_id),
            email: data.email,
            address: data.address,
            password: data.password,
            salary: parseFloat(data.salary),
        };

        const res = await AxiosCus.post("/worker", workerData);

        return res.data;
    } catch (error) {
        console.log(error);
        return;
    }
};

const deleteworker = async (id: number) => {
    try {
        const res = await AxiosCus.delete(`/worker/${id}`);

        return res.data;
    } catch (error) {
        console.log(error);
        return;
    }
};
const updateworker = async (id: number, data: any) => {
    try {
        const workerData = {
            name: data.name,
            title: data.title,
            outlet_id: Number(data.outlet_id),
            email: data.email,
            address: data.address,
            password: data.password,
            salary: parseFloat(data.salary),
        };

        const res = await AxiosCus.patch(`/worker/${id}`, workerData);

        return res.data;
    } catch (error) {
        console.log(error);
        return;
    }
};

export { getworkers, getworkersbyid, addworker, deleteworker, updateworker };
