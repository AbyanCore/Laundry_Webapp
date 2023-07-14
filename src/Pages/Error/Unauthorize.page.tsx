import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

const Unauthorizepage = () => {
    const navigate = useNavigate();

    return (
        <div className="flex w-screen h-screen place-items-center place-content-center">
            <Card>
                <CardHeader color="red">
                    <h1 className="text-3xl font-bold p-2 text-center">
                        Unauthorize
                    </h1>
                </CardHeader>
                <CardBody>
                    <p>Anda Tidak Bisa Mengakses Halaman Ini</p>
                </CardBody>
                <CardFooter className="flex place-content-center">
                    <Button
                        onClick={() => navigate("../auth/login")}
                        color="blue"
                    >
                        Login
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
};

export default Unauthorizepage;
