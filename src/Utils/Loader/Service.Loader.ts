import { getServicesClient } from "../../Api/Service.API";

const ServiceLoader = async () => {
    const response = await getServicesClient();
    return response.data;
};

export default ServiceLoader;
