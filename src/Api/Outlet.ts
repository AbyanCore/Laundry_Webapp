import { AxiosCus } from "../Utils/Axios.Utils";

const getoutlets = async () => {
    try {
        const data = await AxiosCus.get("/outlet");

        return data.data;
    } catch (error) {
        console.log(error);
        return;
    }
};

const getoutletbyid = async (id: number) => {
    try {
        const data = await AxiosCus.get(`/outlet/${id}`);

        return data.data;
    } catch (error) {
        console.log(error);
        return;
    }
};

export { getoutlets, getoutletbyid };
