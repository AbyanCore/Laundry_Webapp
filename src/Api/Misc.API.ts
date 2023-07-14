import { AxiosCus } from "../Utils/Axios.Utils";

const getTitles = async () => {
    try {
        const res = await AxiosCus.get("/misc/titles");

        return res.data;
    } catch (error) {
        console.log(error);
        return;
    }
};

const getUnit_types = async () => {
    try {
        const res = await AxiosCus.get("/misc/unit_types");
        return res.data;
    } catch (error) {
        console.log(error);
        return;
    }
};

const getPhase = async () => {
    try {
        const res = await AxiosCus.get("/misc/phases");
        return res.data;
    } catch (error) {
        console.log(error);
        return;
    }
};

export { getTitles, getUnit_types, getPhase };
