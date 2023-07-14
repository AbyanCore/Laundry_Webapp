import {
    Button,
    Card,
    CardBody,
    CardFooter,
    Input,
} from "@material-tailwind/react";

const OrderPage = () => {
    return (
        <div className="w-auto flex-row">
            <div className="flex grid-cols gap-10 justify-around flex-wrap">
                <div>
                    <Card className="p-5 rounded-3xl">
                        <CardBody className="flex-col">
                            <h1 className="font-bold text-xl pb-3">Token</h1>
                            <p className="pb-2 font-thin">
                                Masukan Tokenmu untuk melihat detail
                            </p>
                            <Input label="Token" />
                        </CardBody>
                        <CardFooter className="-mt-5">
                            <Button>Masuk</Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default OrderPage;
