import { Button, Input, Textarea } from "@material-tailwind/react";
import * as React from "react";
import { useParams } from "react-router-dom";
import { getServicebyId, updateService } from "../../../Api/Service.API";

const OnEditService = () => {
    const { id } = useParams();
    const [Service, setService] = React.useState<any>({});

    React.useEffect(() => {
        const fetchdata = async () => {
            const data = await getServicebyId(Number(id));

            setService(data.data);
        };

        fetchdata();
    }, [id]);

    const handleInputChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = e.target;
        setService({ ...Service, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        await updateService(Number(id), Service);
        window.history.back();
    };

    return (
        <div className="p-5">
            <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-y-3">
                    <div className="flex gap-x-5 place-items-center">
                        <h1>Nama</h1>
                        <Input
                            type="text"
                            name="name"
                            placeholder="Nama"
                            value={Service.name}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="flex gap-x-5 place-items-center">
                        <h1>Satuan</h1>
                        <Input
                            type="text"
                            name="unit_type"
                            placeholder="Satuan 'kg/pcs'"
                            value={Service.unit_type}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="flex gap-x-5 place-items-center">
                        <h1>Deskripsi</h1>
                        <Textarea
                            name="description"
                            placeholder="Deskripsi"
                            value={Service.description}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="flex gap-x-5 place-items-center">
                        <h1>Harga</h1>
                        <Input
                            type="number"
                            name="price"
                            placeholder="Harga"
                            value={Service.price}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                </div>
                <div className="self-end py-20 flex flex-row gap-x-2">
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

export default OnEditService;
