import {
  faBars,
  faCartShopping,
  faCube,
  faGauge,
  faMessage,
  faPerson,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Navigate, NavLink, Outlet } from "react-router";
import { useAuth } from "../../context/AuthContext";
import { Helmet } from "react-helmet";

const Admin = () => {
  const { user, loading } = useAuth();

  if (loading) return null;

  if (!user || !user.roles?.includes("Admin")) {
    return <Navigate to="/404" />;
  }

  const pages = [
    { icon: faGauge, title: "Dashboard", link: "/admin" },
    { icon: faCube, title: "Products", link: "/admin/products" },
    { icon: faPerson, title: "Users", link: "/admin/users" },
    { icon: faMessage, title: "Reviews", link: "/admin/reviews" },
    { icon: faCartShopping, title: "Orders", link: "/admin/orders" },
    { icon: faUserCircle, title: "Brands", link: "/admin/brands" },
    { icon: faBars, title: "Categories", link: "/admin/categories" },
    { icon: faBars, title: "Sub-Categories", link: "/admin/subcategories" },
  ];

  return (
    <section className="min-h-screen w-full flex flex-col py-10 items-center gap-5">
      <Helmet>
        <title>Admin - ElectRa</title>
      </Helmet>
      <div className="container grid grid-cols-1 lg:grid-cols-[auto_1fr] w-full lg:min-h-[75vh] p-5 gap-5">
        <aside className="relative h-">
          <div className="sticky h-fit top-25 flex lg:flex-col overflow-x-scroll gap-5">
            {pages.map((page) => {
              return (
                <NavLink
                  to={page.link}
                  end
                  className={({ isActive }) =>
                    `cursor-pointer ${
                      isActive ? "bg-surface-2" : "bg-surface"
                    } hover:bg-surface-2 transition flex items-center justify-between rounded-lg w-60 h-15 p-5`
                  }
                >
                  <h3 className="text-left font-bold text-1xl">{page.title}</h3>
                  <FontAwesomeIcon icon={page.icon} className="text-[30px]" />
                </NavLink>
              );
            })}
          </div>
        </aside>

        <Outlet />
      </div>
    </section>
  );
};

export default Admin;
