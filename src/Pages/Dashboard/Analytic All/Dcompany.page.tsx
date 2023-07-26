import { Card, Select, Option } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { getMoneyTransactions } from "../../../Api/MoneyTransaction.API";
import {
    groupByDate,
    groupByMonth,
    groupByYear,
    mergeDataByColumn_Sum,
} from "../../../Utils/Array.Utils";
import { formatCurrencyIDR } from "../../../Utils/Currency.utils";
import { getOrders } from "../../../Api/Order.API";
import { getPhase, getUnit_types } from "../../../Api/Misc.API";
import { getServices } from "../../../Api/Service.API";
import { getworkers } from "../../../Api/Worker.API";
import CStackBar from "../../../Utils/Components/CStackBar.Component";
import { getCustomers } from "../../../Api/Customer.API";

import {
    BsFillPersonFill,
    BsFillGearFill,
    BsFillPeopleFill,
    BsBoxSeamFill,
} from "react-icons/bs";

const DcompanyPage = () => {
    const [dataTransaction, setDataTransaction] = useState<Array<any>>([]);
    const [dataOrder, setDataOrder] = useState<Array<any>>([]);
    const [dataService, setDataService] = useState<Array<any>>([]);
    const [dataWorker, setDataWorker] = useState<Array<any>>([]);
    const [dataCustomer, setDataCustomer] = useState<Array<any>>([]);

    const [Phase, setPhase] = useState<Array<any>>([]);
    const [UnitType, setUnitType] = useState<Array<any>>([]);

    const [TransactionTab, setTransactionTab] = useState<string>("0");
    const HandlerTransactionTab = (value: any) => {
        setTransactionTab(value);
    };

    const [OrderTab, setOrderTab] = useState<string>("0");
    const HandlerOrderTab = (value: any) => {
        setOrderTab(value);
    };

    const fetchdata = async () => {
        const datatransaction = await getMoneyTransactions();
        const dataorder = await getOrders();
        const dataservice = await getServices();
        const dataworker = await getworkers();
        const datacustomer = await getCustomers();

        setDataTransaction(datatransaction.data);
        setDataOrder(dataorder.data);
        setDataService(dataservice.data);
        setDataWorker(dataworker.data);
        setDataCustomer(datacustomer.data);

        const dataphase = await getPhase();
        const dataunittype = await getUnit_types();

        setPhase(dataphase.data);
        setUnitType(dataunittype.data);
    };

    useEffect(() => {
        fetchdata();
    }, []);

    const [dataTransaction_Modified_byNow, setDataTransaction_Modified_byNow] =
        useState<Array<any>>([]);
    const [
        dataTransaction_Modified_byDate,
        setDataTransaction_Modified_byDate,
    ] = useState<Array<any>>([]);
    const [
        dataTransaction_Modified_byMonth,
        setDataTransaction_Modified_byMonth,
    ] = useState<Array<any>>([]);
    const [
        dataTransaction_Modified_byYear,
        setDataTransaction_Modified_byYear,
    ] = useState<Array<any>>([]);

    useEffect(() => {
        setDataTransaction_Modified_byNow(
            (
                Object.values(
                    groupByDate(dataTransaction, "created_at")
                ) as Array<any>
            )[
                Object.values(groupByDate(dataTransaction, "created_at"))
                    .length - 1
            ]?.map((item: any) => {
                return {
                    created_at: item.created_at.split("T")[1].slice(0, 8),
                    Keuntungan: item.amount > 0 ? item.amount : 0,
                    Kerugian: item.amount < 0 ? item.amount : 0,
                };
            })
        );

        setDataTransaction_Modified_byDate(
            Object.values(groupByDate(dataTransaction, "created_at")).map(
                (data: any) => {
                    return {
                        created_at: data[0].created_at.split("T")[0],
                        Kerugian: mergeDataByColumn_Sum(
                            data.filter((item: any) => {
                                return (item.amount as number) < 0;
                            }),
                            "amount"
                        ),
                        Keuntungan: mergeDataByColumn_Sum(
                            data.filter((item: any) => {
                                return (item.amount as number) > 0;
                            }),
                            "amount"
                        ),
                    };
                }
            )
        );
        setDataTransaction_Modified_byMonth(
            Object.values(groupByMonth(dataTransaction, "created_at")).map(
                (data: any) => {
                    return {
                        created_at: data[0].created_at.split("T")[0],
                        Kerugian: mergeDataByColumn_Sum(
                            data.filter((item: any) => {
                                return (item.amount as number) < 0;
                            }),
                            "amount"
                        ),
                        Keuntungan: mergeDataByColumn_Sum(
                            data.filter((item: any) => {
                                return (item.amount as number) > 0;
                            }),
                            "amount"
                        ),
                    };
                }
            )
        );
        setDataTransaction_Modified_byYear(
            Object.values(groupByYear(dataTransaction, "created_at")).map(
                (data: any) => {
                    return {
                        created_at: data[0].created_at.split("T")[0],
                        Kerugian: mergeDataByColumn_Sum(
                            data.filter((item: any) => {
                                return (item.amount as number) < 0;
                            }),
                            "amount"
                        ),
                        Keuntungan: mergeDataByColumn_Sum(
                            data.filter((item: any) => {
                                return (item.amount as number) > 0;
                            }),
                            "amount"
                        ),
                    };
                }
            )
        );
    }, [dataTransaction]);

    const TransactionTabValue = [
        <div className="flex w-full overflow-x-auto justify-center">
            <CStackBar
                size={{ width: window.screen.width, height: 300 }}
                data={dataTransaction_Modified_byNow}
                Xdatakey={"created_at"}
                stackoffset={"sign"}
                tickFormatter={(value: any) => formatCurrencyIDR(value)}
                datakeys={["Kerugian", "Keuntungan"]}
            />
        </div>,
        <div className="w-full overflow-x-auto flex justify-center">
            <CStackBar
                size={{ width: window.screen.width, height: 300 }}
                data={dataTransaction_Modified_byDate}
                Xdatakey={"created_at"}
                stackoffset={"sign"}
                tickFormatter={(value: any) => formatCurrencyIDR(value)}
                datakeys={["Kerugian", "Keuntungan"]}
            />
        </div>,
        <div className="w-full overflow-x-auto flex justify-center">
            <CStackBar
                size={{ width: window.screen.width, height: 300 }}
                data={dataTransaction_Modified_byMonth}
                Xdatakey={"created_at"}
                stackoffset={"sign"}
                tickFormatter={(value: any) => formatCurrencyIDR(value)}
                datakeys={["Kerugian", "Keuntungan"]}
            />
        </div>,
        <div className="w-full overflow-x-auto flex justify-center">
            <CStackBar
                size={{ width: window.screen.width, height: 300 }}
                data={dataTransaction_Modified_byYear}
                Xdatakey={"created_at"}
                stackoffset={"sign"}
                tickFormatter={(value: any) => formatCurrencyIDR(value)}
                datakeys={["Kerugian", "Keuntungan"]}
            />
        </div>,
    ];

    const [dataOrder_Modified_byNow, setdataOrder_Modified_byNow] = useState<
        Array<any>
    >([]);
    const [dataOrder_Modified_byDate, setdataOrder_Modified_byDate] = useState<
        Array<any>
    >([]);
    const [dataOrder_Modified_byMonth, setdataOrder_Modified_byMonth] =
        useState<Array<any>>([]);
    const [dataOrder_Modified_byYear, setdataOrder_Modified_byYear] = useState<
        Array<any>
    >([]);

    useEffect(() => {
        setdataOrder_Modified_byNow(
            (Object.values(groupByDate(dataOrder, "created_at")) as Array<any>)[
                (
                    Object.values(
                        groupByDate(dataOrder, "created_at")
                    ) as Array<any>
                ).length - 1
            ]?.map((data: any) => {
                return {
                    created_at: data.created_at.split("T")[1].slice(0, 8),
                    [data.phase]: 1,
                };
            })
        );

        setdataOrder_Modified_byDate(
            Object.values(groupByDate(dataOrder, "created_at")).map(
                (data: any) => {
                    return {
                        created_at: data[0].created_at.split("T")[0],
                        batal: data.filter((item: any) => {
                            return item.phase === "batal";
                        }).length,
                        antrian: data.filter((item: any) => {
                            return item.phase === "antrian";
                        }).length,
                        proses: data.filter((item: any) => {
                            return item.phase === "proses";
                        }).length,
                        pengiriman: data.filter((item: any) => {
                            return item.phase === "pengiriman";
                        }).length,
                        selesai: data.filter((item: any) => {
                            return item.phase === "selesai";
                        }).length,
                    };
                }
            )
        );
        setdataOrder_Modified_byMonth(
            Object.values(groupByMonth(dataOrder, "created_at")).map(
                (data: any) => {
                    return {
                        created_at: data[0].created_at.split("T")[0],
                        batal: data.filter((item: any) => {
                            return item.phase === "batal";
                        }).length,
                        antrian: data.filter((item: any) => {
                            return item.phase === "antrian";
                        }).length,
                        proses: data.filter((item: any) => {
                            return item.phase === "proses";
                        }).length,
                        pengiriman: data.filter((item: any) => {
                            return item.phase === "pengiriman";
                        }).length,
                        selesai: data.filter((item: any) => {
                            return item.phase === "selesai";
                        }).length,
                    };
                }
            )
        );
        setdataOrder_Modified_byYear(
            Object.values(groupByYear(dataOrder, "created_at")).map(
                (data: any) => {
                    return {
                        created_at: data[0].created_at.split("T")[0],
                        batal: data.filter((item: any) => {
                            return item.phase === "batal";
                        }).length,
                        antrian: data.filter((item: any) => {
                            return item.phase === "antrian";
                        }).length,
                        proses: data.filter((item: any) => {
                            return item.phase === "proses";
                        }).length,
                        pengiriman: data.filter((item: any) => {
                            return item.phase === "pengiriman";
                        }).length,
                        selesai: data.filter((item: any) => {
                            return item.phase === "selesai";
                        }).length,
                    };
                }
            )
        );
    }, [dataOrder]);

    const OrderTabValue = [
        <div className="w-full overflow-x-auto flex justify-center">
            <CStackBar
                size={{ width: window.screen.width, height: 300 }}
                data={dataOrder_Modified_byNow}
                Xdatakey={"created_at"}
                stackoffset={"sign"}
                datakeys={[
                    "batal",
                    "antrian",
                    "proses",
                    "pengiriman",
                    "selesai",
                ]}
            />
        </div>,
        <div className="w-full overflow-x-auto flex justify-center">
            <CStackBar
                size={{ width: window.screen.width, height: 300 }}
                data={dataOrder_Modified_byDate}
                Xdatakey={"created_at"}
                stackoffset={"sign"}
                datakeys={[
                    "batal",
                    "antrian",
                    "proses",
                    "pengiriman",
                    "selesai",
                ]}
            />
        </div>,
        <div className="w-full overflow-x-auto flex justify-center">
            <CStackBar
                size={{ width: window.screen.width, height: 300 }}
                data={dataOrder_Modified_byMonth}
                Xdatakey={"created_at"}
                stackoffset={"sign"}
                datakeys={[
                    "batal",
                    "antrian",
                    "proses",
                    "pengiriman",
                    "selesai",
                ]}
            />
        </div>,
        <div className="w-full overflow-x-auto flex justify-center">
            <CStackBar
                size={{ width: window.screen.width, height: 300 }}
                data={dataOrder_Modified_byYear}
                Xdatakey={"created_at"}
                stackoffset={"sign"}
                datakeys={[
                    "batal",
                    "antrian",
                    "proses",
                    "pengiriman",
                    "selesai",
                ]}
            />
        </div>,
    ];

    return (
        <div className="flex flex-col gap-y-4 w-screen">
            <section className="flex flex-col gap-y-2">
                <Card className="w-full flex flex-row flex-wrap gap-x-2 gap-y-2 p-4">
                    <h1 className="text-center w-full text-2xl font-bold">
                        Keseluruhan
                    </h1>
                    <Card className="grow p-2 flex flex-row items-center justify-center">
                        <BsFillGearFill size={50} />
                        <div className="flex-col px-5">
                            <h1 className="text-xl p-1">Layanan</h1>
                            <h3 className="text-center font-bold text-2xl">
                                {dataService.length}
                            </h3>
                        </div>
                    </Card>
                    <Card className="grow p-2 flex flex-row items-center justify-center">
                        <BsFillPersonFill size={50} />
                        <div className="flex-col px-5">
                            <h1 className="text-xl p-1">Konsumen</h1>
                            <h3 className="text-center font-bold text-2xl ">
                                {dataCustomer.length}
                            </h3>
                        </div>
                    </Card>
                    <Card className="grow p-2 flex flex-row items-center justify-center">
                        <BsFillPeopleFill size={50} />
                        <div className="flex-col px-5">
                            <h1 className="text-xl p-1">Pekerja</h1>
                            <h3 className="text-center font-bold text-2xl">
                                {dataWorker.length}
                            </h3>
                        </div>
                    </Card>
                    <Card className="grow p-2 flex flex-row items-center justify-center">
                        <BsBoxSeamFill size={50} />
                        <div className="flex-col px-5">
                            <h1 className="text-xl p-1">Pesanan</h1>
                            <h3 className="text-center font-bold text-2xl">
                                {dataOrder.length}
                            </h3>
                        </div>
                    </Card>
                </Card>
            </section>
            <section className="flex flex-col gap-y-2">
                <div className="w-full flex flex-row flex-wrap gap-x-2 gap-y-2">
                    <Card className="w-full flex flex-row flex-wrap gap-x-2 gap-y-2 p-4">
                        <h1 className="text-center w-full font-semibold">
                            Keseluruhan Keuangan
                        </h1>
                        <Card className="grow p-2">
                            <h1>Profit</h1>
                            <h1 className="text-center font-bold text-2xl">
                                {formatCurrencyIDR(
                                    mergeDataByColumn_Sum(
                                        dataTransaction,
                                        "amount"
                                    ) -
                                        mergeDataByColumn_Sum(
                                            dataWorker,
                                            "salary"
                                        )
                                )}
                            </h1>
                        </Card>
                        <Card className="grow p-2">
                            <h1>Total Transaksi : {dataTransaction.length}</h1>
                            <h1 className="text-center font-bold text-2xl">
                                {formatCurrencyIDR(
                                    mergeDataByColumn_Sum(
                                        dataTransaction.map((data: any) => {
                                            return {
                                                amount: Math.abs(data.amount),
                                            };
                                        }),
                                        "amount"
                                    )
                                )}
                            </h1>
                        </Card>
                        <Card className="grow p-2">
                            <h1>
                                Pengeluaran :{" "}
                                {
                                    dataTransaction.filter((data) => {
                                        return (data.amount as number) < 0;
                                    }).length
                                }
                            </h1>
                            <h1 className="text-center font-bold text-2xl">
                                {formatCurrencyIDR(
                                    Math.abs(
                                        mergeDataByColumn_Sum(
                                            dataTransaction.filter((data) => {
                                                return (
                                                    (data.amount as number) < 0
                                                );
                                            }),
                                            "amount"
                                        )
                                    )
                                )}
                            </h1>
                        </Card>

                        <Card className="grow p-2">
                            <h1>
                                Pemasukan :{" "}
                                {
                                    dataTransaction.filter((data) => {
                                        return (data.amount as number) > 0;
                                    }).length
                                }
                            </h1>
                            <h1 className="text-center font-bold text-2xl">
                                {formatCurrencyIDR(
                                    mergeDataByColumn_Sum(
                                        dataTransaction.filter((data) => {
                                            return (data.amount as number) > 0;
                                        }),
                                        "amount"
                                    )
                                )}
                            </h1>
                        </Card>
                    </Card>
                </div>
                <div>
                    <Card>
                        <div className="flex flex-row justify-between">
                            <h1 className="p-4 font-semibold ">
                                Graph Performa Keuangan
                            </h1>
                            <div className="p-2">
                                <Select
                                    onChange={HandlerTransactionTab}
                                    value={TransactionTab}
                                >
                                    <Option value="0">Sekarang</Option>
                                    <Option value="1">Hari</Option>
                                    <Option value="2">Bulan</Option>
                                    <Option value="3">Tahun</Option>
                                </Select>
                            </div>
                        </div>
                        <div className="flex p-2 justify-center items-center">
                            {TransactionTabValue[parseInt(TransactionTab)]}
                        </div>
                    </Card>
                </div>
            </section>
            <section className="flex flex-col gap-y-2">
                <div className="w-full flex flex-row flex-wrap gap-x-2 gap-y-2">
                    <Card className="w-full flex flex-row flex-wrap gap-x-2 gap-y-2 p-4">
                        <h1 className="text-center w-full font-semibold">
                            Keseluruhan Order
                        </h1>
                        <Card className="grow p-2">
                            <h1>Total Order : {dataOrder.length}</h1>
                            <div className="font-bold text-2xl flex justify-center">
                                {UnitType.map((_unittype) => {
                                    return (
                                        <div className="px-2">
                                            {
                                                dataOrder.filter(
                                                    (_dataorder) => {
                                                        const matchedDataService =
                                                            dataService.find(
                                                                (
                                                                    _dataservice
                                                                ) => {
                                                                    return (
                                                                        _dataorder.service_id ===
                                                                        _dataservice.id
                                                                    );
                                                                }
                                                            );
                                                        return (
                                                            matchedDataService?.unit_type ===
                                                            _unittype
                                                        );
                                                    }
                                                ).length
                                            }{" "}
                                            {_unittype}
                                        </div>
                                    );
                                })}
                            </div>
                        </Card>
                        <Card className="grow p-2">
                            <h1>
                                Segera Masuk Uang :{" "}
                                {
                                    dataOrder.filter((_data) => {
                                        return _data.phase != "batal";
                                    }).length
                                }
                            </h1>
                            <div className="font-bold text-2xl flex justify-center">
                                {formatCurrencyIDR(
                                    mergeDataByColumn_Sum(
                                        dataOrder
                                            .filter((_data) => {
                                                return _data.phase != "batal";
                                            })
                                            .map((_data) => {
                                                const matchedDataService =
                                                    dataService.find(
                                                        (_dataservice) => {
                                                            return (
                                                                _data.service_id ==
                                                                _dataservice.id
                                                            );
                                                        }
                                                    );
                                                return {
                                                    price: matchedDataService?.price,
                                                };
                                            }),
                                        "price"
                                    )
                                )}
                            </div>
                        </Card>
                        <Card className="grow p-2">
                            <h1>
                                Total Kerugian Order :{" "}
                                {
                                    dataOrder.filter((_data) => {
                                        return _data.phase === "batal";
                                    }).length
                                }
                            </h1>
                            <h1 className="text-center font-bold text-2xl">
                                {formatCurrencyIDR(
                                    mergeDataByColumn_Sum(
                                        dataOrder
                                            .filter((_data) => {
                                                return _data.phase == "batal";
                                            })
                                            .map((_data) => {
                                                const matchedDataService =
                                                    dataService.find(
                                                        (_dataservice) => {
                                                            return (
                                                                _data.service_id ==
                                                                _dataservice.id
                                                            );
                                                        }
                                                    );
                                                return {
                                                    price: matchedDataService?.price,
                                                };
                                            }),
                                        "price"
                                    )
                                )}
                            </h1>
                        </Card>
                    </Card>
                </div>
                <div>
                    <Card>
                        <div className="flex flex-row justify-between">
                            <h1 className="p-4 font-semibold ">
                                Graph Performa Order
                            </h1>
                            <div className="p-2">
                                <Select
                                    onChange={HandlerOrderTab}
                                    value={OrderTab}
                                >
                                    <Option value="0">Sekarang</Option>
                                    <Option value="1">Hari</Option>
                                    <Option value="2">Bulan</Option>
                                    <Option value="3">Tahun</Option>
                                </Select>
                            </div>
                        </div>
                        <div className="flex p-2 justify-center items-center">
                            {OrderTabValue[parseInt(OrderTab)]}
                        </div>
                    </Card>
                </div>
            </section>
        </div>
    );
};

export default DcompanyPage;
