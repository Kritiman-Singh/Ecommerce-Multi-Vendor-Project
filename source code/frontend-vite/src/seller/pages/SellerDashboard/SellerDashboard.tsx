import React from "react";

import SellerRoutes from "../../../routes/SellerRoutes";
import Navbar from "../../../admin seller/components/navbar/Navbar";
import SellerDrawerList from "../../components/SideBar/DrawerList";

const SellerDashboard = () => {
  return (
    <div className="min-h-screen bg-ink text-cream">
      <Navbar DrawerList={SellerDrawerList}/>
      <section className="lg:flex lg:h-[90vh]">
        <div className="hidden lg:block h-full border-r border-line">
        <SellerDrawerList/>
        </div>
        <div className="p-6 lg:p-10 w-full lg:w-[80%] overflow-y-auto bg-ink">
          <SellerRoutes />
        </div>
      </section>
    </div>
  );
};

export default SellerDashboard;
