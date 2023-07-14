import { AxiosCus } from "../Utils/Axios.Utils";

const getMoneyTransactions = async () => {
    try {
        const res = await AxiosCus.get("/money-transaction");

        return res.data;
    } catch (error) {
        console.log(error);
        return;
    }
};

const getMoneyTransactionbyId = async (id: number) => {
    try {
        const res = await AxiosCus.get(`/money-transaction/${id}`);

        return res.data;
    } catch (error) {
        console.log(error);
        return;
    }
};

const addMoneyTransaction = async (moneyTransaction: any) => {
    try {
        const res = await AxiosCus.post("/money-transaction", moneyTransaction);

        return res.data;
    } catch (error) {
        console.log(error);
        return;
    }
};

const updateMoneyTransaction = async (id: number, moneyTransaction: any) => {
    try {
        const res = await AxiosCus.patch(
            `/money-transaction/${id}`,
            moneyTransaction
        );

        return res.data;
    } catch (error) {
        console.log(error);
        return;
    }
};

const deleteMoneyTransaction = async (id: number) => {
    try {
        const res = await AxiosCus.delete(`/money-transaction/${id}`);

        return res.data;
    } catch (error) {
        console.log(error);
        return;
    }
};

export {
    getMoneyTransactions,
    getMoneyTransactionbyId,
    addMoneyTransaction,
    updateMoneyTransaction,
    deleteMoneyTransaction,
};
