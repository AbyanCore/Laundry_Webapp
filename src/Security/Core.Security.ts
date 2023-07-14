import CryptoJS from "crypto-js";

const encrypt = (data: any) => {
    return CryptoJS.AES.encrypt(
        data,
        process.env.REACT_APP_SECRET_KEY as string
    ).toString();
};

const decrypt = (data: any) => {
    const bytes = CryptoJS.AES.decrypt(
        data,
        process.env.REACT_APP_SECRET_KEY as string
    );
    return bytes.toString(CryptoJS.enc.Utf8);
};

const hash = (data: any) => {
    return CryptoJS.SHA256(data).toString();
};

export { encrypt, decrypt, hash };
