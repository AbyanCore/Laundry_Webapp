import { Button, Input, Textarea } from "@material-tailwind/react";
import * as React from "react";
import { addCustomer } from "../../../Api/Customer.API";

const OnAddCustomer = () => {
    const [formData, setFormData] = React.useState<any>({
        name: "",
        address: "",
        phone_number: "",
        valid: true,
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

        await addCustomer(formData);
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
                        <h1>Alamat</h1>
                        <Textarea
                            name="address"
                            placeholder="Alamat"
                            value={formData.address}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="flex gap-x-5 place-items-center">
                        <h1>No Handphone</h1>
                        <Input
                            type="number"
                            name="phone_number"
                            placeholder="No Whatsapp / No Handphone"
                            value={formData.phone_number}
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

export default OnAddCustomer;
