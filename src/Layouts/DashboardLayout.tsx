import { Outlet } from "react-router-dom";
import SideDrawer from "../components/SideDrawer/SideDrawer";

const DashboardLayout = () => {
  return (
    <html lang="en">
      <body className="flex w-full">
        <SideDrawer></SideDrawer>
        <section className="m-4 md:m-14 w-full">
            <Outlet></Outlet>
        </section>
      </body>
    </html>
  );
};

export default DashboardLayout;
