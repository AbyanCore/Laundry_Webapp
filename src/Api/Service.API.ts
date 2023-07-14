import { AxiosCus } from "../Utils/Axios.Utils";

const getServices = async () => {
    try {
        const res = await AxiosCus.get("/service-core");

        return res.data;
    } catch (error) {
        console.log(error);
        return;
    }
};

const getServicebyId = async (id: number) => {
    try {
        const res = await AxiosCus.get(`/service-core/${id}`);

        return res.data;
    } catch (error) {
        console.log(error);
        return;
    }
};

const addService = async (data: any) => {
    try {
        const res = await AxiosCus.post("/service-core", data);

        return res.data;
    } catch (error) {
        console.log(error);
        return;
    }
};

const updateService = async (id: number, data: any) => {
    try {
        const res = await AxiosCus.patch(`/service-core/${id}`, data);

        return res.data;
    } catch (error) {
        console.log(error);
        return;
    }
};

const deleteService = async (id: number) => {
    try {
        const res = await AxiosCus.delete(`/service-core/${id}`);

        return res.data;
    } catch (error) {
        console.log(error);
        return;
    }
};

const getServicesClient = async () => {
    try {
        const res = await AxiosCus.get("/service-core/client");

        return res.data;
    } catch (error) {
        console.log(error);
        return;
    }
};

export {
    getServices,
    getServicebyId,
    addService,
    updateService,
    deleteService,
    getServicesClient,
};
