import React, { useState } from "react";
import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
    Accordion,
    AccordionHeader,
    AccordionBody,
    Tooltip,
} from "@material-tailwind/react";
import { LiaBarsSolid } from "react-icons/lia";
import { BsCashCoin, BsLayers } from "react-icons/bs";
import {
    PresentationChartBarIcon,
    ShoppingBagIcon,
    UserCircleIcon,
    PowerIcon,
    HomeIcon,
} from "@heroicons/react/24/solid";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";

import { useNavigate } from "react-router-dom";
import { logout } from "../../Api/Auth.API";
import Cookies from "js-cookie";

const Sidebar = () => {
    const navigate = useNavigate();

    const [opennav, setOpennav] = useState(false);

    const [open, setOpen] = React.useState(0);

    const handleOpen = (value: any) => {
        setOpen(open == value ? 0 : value);
    };

    const logouthandler = async () => {
        const data = await logout();

        data && Cookies.remove("user-token");

        window.location.href = "/";
    };

    const handleOpenPage = (url: string, withrefresh: boolean = false) => {
        if (withrefresh) {
            window.location.href = url;
        } else {
            setOpennav(false);
            navigate(url);
        }
    };

    return (
        <div>
            <div className=" bg-blue-gray-500 w-screen h-20 flex">
                <Card
                    className="w-10 h-10 self-center ml-4 flex place-items-center place-content-center hover:bg-blue-gray-100 hover:scale-110 duration-300"
                    onClick={() => {
                        setOpennav(true);
                        setOpen(0);
                    }}
                >
                    <LiaBarsSolid className="w-5 h-5" />
                </Card>
            </div>

            <Card
                className={`fixed top-4 ${
                    opennav ? "left-4" : "-left-96 "
                } ease-out duration-300  w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5`}
            >
                <div
                    className="mb-2 p-4"
                    onClick={() => {
                        setOpennav(false);
                    }}
                >
                    <Tooltip content="Klik Untuk Menyembunyikan Sidebar">
                        <Typography
                            variant="h5"
                            color="blue-gray"
                            className="cursor-pointer"
                        >
                            Dashboard
                        </Typography>
                    </Tooltip>
                </div>
                <List>
                    <Accordion
                        open={open === 1}
                        icon={
                            <ChevronDownIcon
                                strokeWidth={2.5}
                                className={`mx-auto h-4 w-4 transition-transform ${
                                    open === 1 ? "rotate-180" : ""
                                }`}
                            />
                        }
                    >
                        <ListItem className="p-0" selected={open === 1}>
                            <AccordionHeader
                                onClick={() => handleOpen(1)}
                                className="border-b-0 p-3"
                            >
                                <ListItemPrefix>
                                    <PresentationChartBarIcon className="h-5 w-5" />
                                </ListItemPrefix>
                                <Typography
                                    color="blue-gray"
                                    className="mr-auto font-normal"
                                >
                                    Dashboard
                                </Typography>
                            </AccordionHeader>
                        </ListItem>
                        <AccordionBody className="py-1">
                            <List className="p-0">
                                <ListItem
                                    onClick={() =>
                                        handleOpenPage("beranda/usaha")
                                    }
                                >
                                    <ListItemPrefix>
                                        <ChevronRightIcon
                                            strokeWidth={3}
                                            className="h-3 w-5"
                                        />
                                    </ListItemPrefix>
                                    Usaha
                                </ListItem>
                                <ListItem
                                    onClick={() =>
                                        handleOpenPage("beranda/outlet")
                                    }
                                >
                                    <ListItemPrefix>
                                        <ChevronRightIcon
                                            strokeWidth={3}
                                            className="h-3 w-5"
                                        />
                                    </ListItemPrefix>
                                    Autlet
                                </ListItem>
                            </List>
                        </AccordionBody>
                    </Accordion>
                    <Accordion
                        open={open === 2}
                        icon={
                            <ChevronDownIcon
                                strokeWidth={2.5}
                                className={`mx-auto h-4 w-4 transition-transform ${
                                    open === 2 ? "rotate-180" : ""
                                }`}
                            />
                        }
                    >
                        <ListItem className="p-0" selected={open === 2}>
                            <AccordionHeader
                                onClick={() => handleOpen(2)}
                                className="border-b-0 p-3"
                            >
                                <ListItemPrefix>
                                    <ShoppingBagIcon className="h-5 w-5" />
                                </ListItemPrefix>
                                <Typography
                                    color="blue-gray"
                                    className="mr-auto font-normal"
                                >
                                    Kelola Penjualan
                                </Typography>
                            </AccordionHeader>
                        </ListItem>
                        <AccordionBody className="py-1">
                            <List className="p-0">
                                <ListItem
                                    onClick={() =>
                                        handleOpenPage("penjualan/pesanan")
                                    }
                                >
                                    <ListItemPrefix>
                                        <ChevronRightIcon
                                            strokeWidth={3}
                                            className="h-3 w-5"
                                        />
                                    </ListItemPrefix>
                                    Pesanan
                                </ListItem>
                                <ListItem
                                    onClick={() =>
                                        handleOpenPage("penjualan/konsumen")
                                    }
                                >
                                    <ListItemPrefix>
                                        <ChevronRightIcon
                                            strokeWidth={3}
                                            className="h-3 w-5"
                                        />
                                    </ListItemPrefix>
                                    Konsumen
                                </ListItem>
                            </List>
                        </AccordionBody>
                    </Accordion>
                    <Accordion
                        open={open === 3}
                        icon={
                            <ChevronDownIcon
                                strokeWidth={2.5}
                                className={`mx-auto h-4 w-4 transition-transform ${
                                    open === 3 ? "rotate-180" : ""
                                }`}
                            />
                        }
                    >
                        <ListItem className="p-0" selected={open === 3}>
                            <AccordionHeader
                                onClick={() => handleOpen(3)}
                                className="border-b-0 p-3"
                            >
                                <ListItemPrefix>
                                    <BsLayers className="h-5 w-5" />
                                </ListItemPrefix>
                                <Typography
                                    color="blue-gray"
                                    className="mr-auto font-normal"
                                >
                                    Kelola Sumber Daya
                                </Typography>
                            </AccordionHeader>
                        </ListItem>
                        <AccordionBody className="py-1">
                            <List className="p-0">
                                <ListItem
                                    onClick={() =>
                                        handleOpenPage("sumber-daya/karyawan")
                                    }
                                >
                                    <ListItemPrefix>
                                        <ChevronRightIcon
                                            strokeWidth={3}
                                            className="h-3 w-5"
                                        />
                                    </ListItemPrefix>
                                    Karyawan
                                </ListItem>
                                <ListItem
                                    onClick={() =>
                                        handleOpenPage("sumber-daya/layanan")
                                    }
                                >
                                    <ListItemPrefix>
                                        <ChevronRightIcon
                                            strokeWidth={3}
                                            className="h-3 w-5"
                                        />
                                    </ListItemPrefix>
                                    Layanan
                                </ListItem>
                            </List>
                        </AccordionBody>
                    </Accordion>
                    <Accordion
                        open={open === 4}
                        icon={
                            <ChevronDownIcon
                                strokeWidth={2.5}
                                className={`mx-auto h-4 w-4 transition-transform ${
                                    open === 4 ? "rotate-180" : ""
                                }`}
                            />
                        }
                    >
                        <ListItem className="p-0" selected={open === 4}>
                            <AccordionHeader
                                onClick={() => handleOpen(4)}
                                className="border-b-0 p-3"
                            >
                                <ListItemPrefix>
                                    <BsCashCoin className="h-5 w-5" />
                                </ListItemPrefix>
                                <Typography
                                    color="blue-gray"
                                    className="mr-auto font-normal"
                                >
                                    Kelola Keuangan
                                </Typography>
                            </AccordionHeader>
                        </ListItem>
                        <AccordionBody className="py-1">
                            <List className="p-0">
                                <ListItem
                                    onClick={() =>
                                        handleOpenPage("keuangan/keuangan")
                                    }
                                >
                                    <ListItemPrefix>
                                        <ChevronRightIcon
                                            strokeWidth={3}
                                            className="h-3 w-5"
                                        />
                                    </ListItemPrefix>
                                    Keuangan
                                </ListItem>
                                <ListItem disabled={true}>
                                    <ListItemPrefix>
                                        <ChevronRightIcon
                                            strokeWidth={3}
                                            className="h-3 w-5"
                                        />
                                    </ListItemPrefix>
                                    Laporan
                                </ListItem>
                            </List>
                        </AccordionBody>
                    </Accordion>
                    <hr className="my-2 border-blue-gray-50" />
                    <ListItem onClick={() => handleOpenPage("profile")}>
                        <ListItemPrefix>
                            <UserCircleIcon className="h-5 w-5" />
                        </ListItemPrefix>
                        Profile
                    </ListItem>
                    <ListItem onClick={() => handleOpenPage("/home", true)}>
                        <ListItemPrefix>
                            <HomeIcon className="h-5 w-5" />
                        </ListItemPrefix>
                        Home
                    </ListItem>
                    <ListItem onClick={logouthandler}>
                        <ListItemPrefix>
                            <PowerIcon className="h-5 w-5" />
                        </ListItemPrefix>
                        Log Out
                    </ListItem>
                </List>
            </Card>
        </div>
    );
};

export default Sidebar;
