import { Button, Input, Textarea } from "@material-tailwind/react";
import * as React from "react";
import { addService } from "../../../Api/Service.API";

const OnAddService = () => {
    const [formData, setFormData] = React.useState<any>({
        name: "",
        description: "",
        unit_type: "",
        price: "",
    });

    const handleInputChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log(formData);

        await addService(formData);
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
                            value={formData.name}
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
                            value={formData.title}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="flex gap-x-5 place-items-center">
                        <h1>Deskripsi</h1>
                        <Textarea
                            name="description"
                            placeholder="Deskripsi"
                            value={formData.description}
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
                            value={formData.price}
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

export default OnAddService;
