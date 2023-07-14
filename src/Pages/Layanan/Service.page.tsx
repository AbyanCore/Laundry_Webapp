import { Card } from "@material-tailwind/react";
import { useLoaderData } from "react-router-dom";
import { formatCurrencyIDR } from "../../Utils/Currency.utils";

const Servicepage = () => {
    const servicedata: Array<any> = useLoaderData() as Array<any>;

    if (servicedata.length === 0) {
        return (
            <div className="flex flex-row place-content-center place-items-center">
                <Card className="p-10 rounded-3xl">
                    <h1 className="text-3xl font-bold">Loading ...</h1>
                </Card>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl">
            <h2 className="p-5 self-center text-center text-3xl font-bold">
                Layanan
            </h2>
            <div className="mx-auto max-w-2xl px-4 sm:px-6 sm:py-10 lg:max-w-7xl lg:px-8">
                <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                    {servicedata.map((service: any) => (
                        <a
                            key={service.id}
                            className="group hover:scale-[1.05] hover:p-[10px] duration-300 cursor-pointer"
                        >
                            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7 ">
                                <img
                                    src="https://img.freepik.com/free-vector/light-gray-seamless-nature-patterned-background-vector_53876-166105.jpg?w=1380&t=st=1689223013~exp=1689223613~hmac=e11545aa534f545919431c7dc0cc8a78ff82c2d307d9fa517aa8309fd5587610"
                                    alt="#"
                                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                                />
                            </div>
                            <h3 className="mt-4 text-xl text-gray-700 font-bold">
                                {service.name}
                            </h3>
                            <p className="mt-1 text-lg font-medium text-gray-900">
                                {formatCurrencyIDR(service.price)}
                            </p>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Servicepage;
