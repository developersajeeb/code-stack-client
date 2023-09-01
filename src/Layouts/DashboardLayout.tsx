import { Outlet } from "react-router-dom";
import SideDrawer from "../components/SideDrawer/SideDrawer";
import { ReactNode } from 'react';


const DashboardLayout = () => {
  return (
    <html lang="en">
      <body className="flex w-full">
        <SideDrawer></SideDrawer>
        <section>
            <Outlet></Outlet>
        </section>
      </body>
    </html>
  );
};

export default DashboardLayout;
