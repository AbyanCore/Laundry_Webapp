import * as React from "react";
import { Button, Input, Textarea } from "@material-tailwind/react";
import { useParams } from "react-router-dom";
import { getworkersbyid } from "../../../Api/Worker.API";
import { getoutlets } from "../../../Api/Outlet";
import { updateworker } from "../../../Api/Worker.API";
import { getTitles } from "../../../Api/Misc.API";

const OnEditWorker = () => {
    const { id } = useParams();
    const [worker, setWorker] = React.useState<any>({});
    const [outlet, setOutlet] = React.useState<any>([]);
    const [title, setTitle] = React.useState<any>([]);

    React.useEffect(() => {
        const fetchData = async () => {
            const workerData = await getworkersbyid(Number(id));
            const outletData = await getoutlets();
            const titleData = await getTitles();

            setWorker(workerData.data);
            setOutlet(outletData.data);
            setTitle(titleData.data);
        };

        fetchData();
    }, [id]);

    const handleInputChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = e.target;
        setWorker({ ...worker, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        await updateworker(Number(id), worker);
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
                            value={worker.name || ""}
                            placeholder="Nama"
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="flex gap-x-5 place-items-center">
                        <h1>Jabatan</h1>
                        <select
                            title="title"
                            name="title"
                            value={worker.title || ""}
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
                            title="outlet_id"
                            name="outlet_id"
                            value={worker.outlet_id || ""}
                            onChange={handleInputChange}
                        >
                            {outlet.map((item: any) => (
                                <option key={item.id} value={item.id}>
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
                            value={worker.email || ""}
                            placeholder="Email"
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="flex gap-x-5 place-items-center">
                        <h1>Alamat</h1>
                        <Textarea
                            name="address"
                            value={worker.address || ""}
                            placeholder="Address"
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="flex gap-x-5 place-items-center">
                        <h1>Password</h1>
                        <Input
                            type="password"
                            name="password"
                            value={worker.password || ""}
                            placeholder="Password"
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="flex gap-x-5 place-items-center">
                        <h1>Gaji</h1>
                        <Input
                            type="number"
                            name="salary"
                            value={worker.salary || ""}
                            placeholder="Gaji"
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

export default OnEditWorker;
