import { Outlet } from "react-router-dom";
import SideDrawer from "../components/SideDrawer/SideDrawer";
import "primereact/resources/primereact.min.css";
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';

const DashboardLayout = () => {
  return (
    <html lang="en">
      <body className="flex w-full">
        <SideDrawer></SideDrawer>
        <section className="m-4 md:m-14 lg:mx-28 w-full my-6">
            <Outlet></Outlet>
        </section>
      </body>
    </html>
  );
};

export default DashboardLayout;
