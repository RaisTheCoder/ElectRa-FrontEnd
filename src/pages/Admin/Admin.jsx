import { faApple } from "@fortawesome/free-brands-svg-icons";
import {
  faBars,
  faCartShopping,
  faCube,
  faGauge,
  faMessage,
  faPerson,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link, Navigate, Outlet } from "react-router";
import { useAuth } from "../../context/AuthContext";

const Admin = () => {
  const { user, loading } = useAuth();

  if (loading) return null;

  if (!user || !user.roles?.includes("Admin")) {
    return <Navigate to="/404" />;
  }

  return (
    <section className="min-h-screen w-full flex flex-col py-10 items-center gap-5">
      <div className="container grid grid-cols-1 lg:grid-cols-[auto_1fr] w-full lg:min-h-[75vh] p-5 gap-5">
        <aside className="relative h-">
          <div className="sticky h-fit top-25 flex lg:flex-col overflow-x-scroll gap-5">
            <Link
              to={"/admin"}
              className={`cursor-pointer ${location.pathname == "/admin/brands" ? "bg-gray-200" : ""} hover:bg-gray-200 transition flex items-center justify-between bg-gray-100 rounded-lg w-50 h-15 p-5`}
            >
              <h3 className="text-left font-bold text-1xl">Dashboard</h3>
              <FontAwesomeIcon icon={faGauge} className="text-[30px]" />
            </Link>

            <Link
              to={"/admin/brands"}
              className={`cursor-pointer ${location.pathname == "/admin/brands" ? "bg-gray-200" : ""} hover:bg-gray-200 transition flex items-center justify-between bg-gray-100 rounded-lg w-50 h-15 p-5`}
            >
              <h3 className="text-left font-bold text-1xl">Brands</h3>
              <FontAwesomeIcon icon={faApple} className="text-[30px]" />
            </Link>

            <Link
              to={"/admin/products"}
              className="cursor-pointer hover:bg-gray-200 transition flex items-center justify-between bg-gray-100 rounded-lg w-50 h-15 p-5"
            >
              <h3 className="text-left font-bold text-1xl">Products</h3>
              <FontAwesomeIcon icon={faCube} className="text-[30px]" />
            </Link>

            <Link
              to={"/admin/categories"}
              className="cursor-pointer hover:bg-gray-200 transition flex items-center justify-between bg-gray-100 rounded-lg w-50 h-15 p-5"
            >
              <h3 className="text-left font-bold text-1xl">Categories</h3>
              <FontAwesomeIcon icon={faBars} className="text-[30px]" />
            </Link>

            <Link
              to={"/admin/subcategories"}
              className="cursor-pointer hover:bg-gray-200 transition flex items-center justify-between bg-gray-100 rounded-lg w-50 h-15 p-5"
            >
              <h3 className="text-left font-bold text-1xl">Subcategories</h3>
              <FontAwesomeIcon icon={faBars} className="text-[30px]" />
            </Link>

            <Link
              to={"/admin/users"}
              className="cursor-pointer hover:bg-gray-200 transition flex items-center justify-between bg-gray-100 rounded-lg w-50 h-15 p-5"
            >
              <h3 className="text-left font-bold text-1xl">Users</h3>
              <FontAwesomeIcon icon={faPerson} className="text-[30px]" />
            </Link>

            <Link
              to={"/admin/orders"}
              className="cursor-pointer hover:bg-gray-200 transition flex items-center justify-between bg-gray-100 rounded-lg w-50 h-15 p-5"
            >
              <h3 className="text-left font-bold text-1xl">Orders</h3>
              <FontAwesomeIcon icon={faCartShopping} className="text-[30px]" />
            </Link>

            <Link
              to={"/admin/reviews"}
              className="cursor-pointer hover:bg-gray-200 transition flex items-center justify-between bg-gray-100 rounded-lg w-50 h-15 p-5"
            >
              <h3 className="text-left font-bold text-1xl">Reviews</h3>
              <FontAwesomeIcon icon={faMessage} className="text-[30px]" />
            </Link>
          </div>
        </aside>

        <Outlet />
      </div>
    </section>
  );
};

export default Admin;
