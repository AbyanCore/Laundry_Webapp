import { Button, Input, Textarea } from "@material-tailwind/react";
import * as React from "react";
import { getoutlets } from "../../../Api/Outlet";
import { addworker } from "../../../Api/Worker.API";
import { getTitles } from "../../../Api/Misc.API";

const OnAddWorker = () => {
    const [outlet, setOutlet] = React.useState<any>([{}]);
    const [formData, setFormData] = React.useState<any>({
        name: "",
        title: "kepala_toko",
        outlet_id: "1",
        email: "",
        address: "",
        password: "",
        salary: "",
    });
    const [title, setTitle] = React.useState<any>([]);

    React.useEffect(() => {
        const asyncdata = async () => {
            const outletdata = await getoutlets();
            const titleData = await getTitles();

            setOutlet(outletdata.data);
            setTitle(titleData.data);
        };

        asyncdata();
    }, []);

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

        await addworker(formData);
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
                        <h1>Jabatan</h1>
                        <select
                            title="title"
                            name="title"
                            onChange={handleInputChange}
                            required
                        >
                            {title.map((item: any, index: number) => (
                                <option key={index} value={item}>
                                    {item}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex gap-x-5 place-items-center">
                        <h1>Outlet</h1>
                        <select
                            name="outlet_id"
                            title="outlet_id"
                            value={formData.outlet_id}
                            onChange={handleInputChange}
                        >
                            {outlet.map((item: any) => (
                                <option
                                    title="outlet_id"
                                    value={item.id}
                                    key={item.id}
                                >
                                    {item.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex gap-x-5 place-items-center">
                        <h1>Alamat Email</h1>
                        <Input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
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
                        <h1>Password</h1>
                        <Input
                            type="password"
                            name="password"
                            placeholder="password"
                            value={formData.password}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="flex gap-x-5 place-items-center">
                        <h1>Gaji</h1>
                        <Input
                            type="number"
                            name="salary"
                            placeholder="Gaji"
                            value={formData.salary}
                            onChange={handleInputChange}
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

export default OnAddWorker;
