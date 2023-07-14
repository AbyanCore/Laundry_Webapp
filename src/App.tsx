import {
    Outlet,
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
} from "react-router-dom";

import RootLayout from "./Layouts/Root.Layout";
import MainLayout from "./Layouts/Main/Main.Layout";
import DashboardLayout from "./Layouts/Dashboard/Dashboard.Layout";

import ServiceLoader from "./Utils/Loader/Service.Loader";

import Unauthorizepage from "./Pages/Error/Unauthorize.page";
import AboutusPage from "./Pages/About/Aboutus.page";
import Homepage from "./Pages/Home/Home.page";
import LoginPage from "./Pages/Auth/Login.page";
import NotFoundpage from "./Pages/Error/NotFound.page";
import Servicepage from "./Pages/Layanan/Service.page";

import OrderPage from "./Pages/Check_Pesanan/Order.page";
import DworkerPage from "./Pages/Dashboard/Manage Resource/Dworker.page";
import DservicePage from "./Pages/Dashboard/Manage Resource/Dservice.page";
import DcustomerPage from "./Pages/Dashboard/Manage Order/Dcustomer.page";
import DorderPage from "./Pages/Dashboard/Manage Order/Dorder.page";
import DmoneyPage from "./Pages/Dashboard/Manage Money/Dmoney.page";

import OnEditWorker from "./Pages/Dashboard/Manage Resource/Editworker.action";
import OnAddWorker from "./Pages/Dashboard/Manage Resource/Addworker.action";
import OnAddService from "./Pages/Dashboard/Manage Resource/AddService.action";
import OnEditService from "./Pages/Dashboard/Manage Resource/EditService.action";
import OnAddMoneyTransction from "./Pages/Dashboard/Manage Money/AddMoneyTransaction.action";
import OnEditMoneyTransaction from "./Pages/Dashboard/Manage Money/EditMoneyTransaction.action";
import OnAddCustomer from "./Pages/Dashboard/Manage Order/AddCustomer.action";
import OnEditCustomer from "./Pages/Dashboard/Manage Order/EditCustomer.action";

const route = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<RootLayout />}>
            <Route path="/" element={<MainLayout />}>
                <Route index path="" element={<Homepage />} />
                <Route index path="home" element={<Homepage />} />
                <Route
                    loader={ServiceLoader}
                    path="daftar-layanan"
                    element={<Servicepage />}
                />
                <Route path="tentang-kami" element={<AboutusPage />} />
                <Route path="pesanan" element={<OrderPage />} />
            </Route>

            <Route path="auth" element={<Outlet />}>
                <Route path="login" element={<LoginPage />} />
            </Route>

            <Route path="dashboard" element={<DashboardLayout />}>
                <Route path="beranda">
                    <Route index path="usaha" element={<h1>Usaha Page</h1>} />
                    <Route path="outlet" element={<h1>Outlet Page</h1>} />
                </Route>
                <Route path="penjualan" element={<Outlet />}>
                    <Route index path="pesanan" element={<DorderPage />} />
                    <Route path="konsumen" element={<DcustomerPage />} />
                    <Route path="konsumen/add" element={<OnAddCustomer />} />
                    <Route
                        path="konsumen/edit/:id"
                        element={<OnEditCustomer />}
                    />
                </Route>
                <Route path="sumber-daya" element={<Outlet />}>
                    <Route index path="karyawan" element={<DworkerPage />} />
                    <Route path="karyawan/add" element={<OnAddWorker />} />
                    <Route
                        path="karyawan/edit/:id"
                        element={<OnEditWorker />}
                    />
                    <Route path="layanan" element={<DservicePage />} />
                    <Route path="layanan/add" element={<OnAddService />} />
                    <Route
                        path="layanan/edit/:id"
                        element={<OnEditService />}
                    />
                </Route>
                <Route path="keuangan" element={<Outlet />}>
                    <Route index path="keuangan" element={<DmoneyPage />} />
                    <Route
                        path="keuangan/add/"
                        element={<OnAddMoneyTransction />}
                    />
                    <Route
                        path="keuangan/edit/:id"
                        element={<OnEditMoneyTransaction />}
                    />
                    <Route path="laporan" element={<h1>laporan Page</h1>} />
                </Route>
            </Route>

            <Route path="unauthorized" element={<Unauthorizepage />} />
            <Route path="*" element={<NotFoundpage />} />
        </Route>
    )
);

const App = () => {
    return <RouterProvider router={route} />;
};

export default App;
