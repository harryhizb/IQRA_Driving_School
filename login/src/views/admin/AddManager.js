import React from "react";
import CardManger from "components/Cards/CardManager";
import AdminNavbar from "../../components/Navbars/AdminNavbar";
import HeaderStats from "components/Headers/HeaderStats";
import FooterAdmin from "components/Footers/FooterAdmin";

export default function AddManager({routeName}) {
  return (
    <>
    <div className="relative md:ml-64 bg-blueGray-100">
        <AdminNavbar routeName={routeName} />
        <HeaderStats />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <CardManger />
        </div>
      </div>
      <FooterAdmin />
        </div>
      </div> 
    </>
  );
}
