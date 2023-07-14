import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
} from "@material-tailwind/react";

const NotFoundpage = () => {
    return (
        <div className="flex w-screen h-screen place-items-center place-content-center bg-[#E8F9FD]">
            <Card>
                <CardHeader color="red">
                    <h1 className="text-3xl text-center font-bold p-4">404</h1>
                </CardHeader>
                <CardBody>
                    <p>Halaman Yang Anda Cari Tidak Ditemukan</p>
                </CardBody>
                <CardFooter className="flex place-content-center">
                    <Button
                        onClick={() => {
                            window.history.back();
                        }}
                    >
                        Kembali
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
};

export default NotFoundpage;
