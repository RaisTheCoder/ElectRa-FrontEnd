import React, { useEffect, useState } from "react";
import api from "../../api/client";
import { Link } from "react-router";

const Dashboard = () => {
  const [dashboard, setDashboard] = useState({});

  useEffect(() => {
    (async () => {
      const res = await api.get("/account/admin/dashboard");
      setDashboard(res.data);
    })();
  }, []);

  return (
    <article className="grid grid-cols-2 gap-5 h-[75vh]">
      <div className="bg-gray-100 py-3 rounded-lg  flex items-center justify-center text-center">
        <div className="flex flex-col gap-5">
          <h3 className="text-5xl">{dashboard.users}</h3>
          <h3 className="text-2xl">
            {dashboard.users == 1 ? "User" : "Users"}
          </h3>
        </div>
      </div>

      <div className="bg-gray-100 py-3 rounded-lg  flex items-center justify-center text-center">
        <div className="flex flex-col gap-5">
          <h3 className="text-5xl">{dashboard.products}</h3>
          <h3 className="text-2xl">
            {dashboard.products == 1 ? "Product" : "Products"}
          </h3>
        </div>
      </div>

      <div className="bg-gray-100 py-3 rounded-lg  flex items-center justify-center text-center">
        <div className="flex flex-col gap-5">
          <h3 className="text-5xl">{dashboard.reviews}</h3>
          <h3 className="text-2xl">
            {dashboard.reviews == 1 ? "Review" : "Reviews"}
          </h3>
        </div>
      </div>

      <div className="bg-gray-100 py-3 rounded-lg  flex items-center justify-center text-center">
        <div className="flex flex-col gap-5">
          <h3 className="text-5xl">{dashboard.categories}</h3>
          <h3 className="text-2xl">
            {dashboard.categories == 1 ? "Category" : "Categories"}
          </h3>
        </div>
      </div>

      <div className="bg-gray-100 py-3 rounded-lg  overflow-hidden flex items-center justify-center text-center">
        <div className="flex flex-col gap-5 w-full">
          <h3 className="text-5xl">{dashboard.productsSold}</h3>

          <h3 className="text-2xl">
            {dashboard.productsSold == 1 ? "Product Sold" : "Products Sold"}
          </h3>

          <p>{dashboard?.mostSold?.length} most sold products.</p>

          <div className="flex overflow-x-auto w-full gap-5 px-2">
            {dashboard?.mostSold?.map((p) => {
              return (
                <Link
                  className="flex-none flex flex-col items-center justify-between p-2 w-25 h-25 rounded-lg bg-gray-200"
                  key={p.id}
                  to={`/products/${p.id}`}
                >
                  <img className="h-15 w-15" src={p.thumbnail} alt={p.title} />
                  <p className="truncate w-full text-center">{p.title}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </article>
  );
};

export default Dashboard;
