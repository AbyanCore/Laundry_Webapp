import { useNavigate } from "react-router-dom";

const Homepage = () => {
    const navigate = useNavigate();

    return (
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
            <div className="text-center">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                    Buat Cucianmu Bersih Seketika
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                    Kartika Laundry adalah sebuah usaha penyedia jasa
                    pembersihan dengan harga yang terjangkau. Mulai dari Tas,
                    Sepatu, Jaket, Kaos, dan lain-lain semua bisa di tanggani
                    oleh kami.
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                    <a
                        onClick={() => navigate("/pesanan")}
                        className="cursor-pointer rounded-md bg-[#0AA1DD] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#79DAE8] duration-200 hover:text-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Mulai Memeasan
                    </a>
                    <a
                        onClick={() => navigate("/daftar-layanan")}
                        className="cursor-pointer text-sm font-semibold leading-6 text-gray-900 hover:text-lg duration-200"
                    >
                        Lihat Layanan <span aria-hidden="true">→</span>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Homepage;
