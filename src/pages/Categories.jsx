import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import api from "../api/client";
import { useNavigate } from "react-router";
import { Helmet } from "react-helmet";

const Category = () => {
  const [categories, setCategories] = useState([]);

  const navi = useNavigate();

  useEffect(() => {
    (async () => {
      const res = await api.get("/categories");
      setCategories(res.data);
    })();
  }, []);

  console.log(categories);

  return (
    <section className="py-10 gap-10 flex flex-col min-h-screen items-center text-center">
      <Helmet>
        <title>Categories - ElectRa</title>
      </Helmet>
      <article className="flex flex-col gap-10 p-3">
        {categories.map((category) => {
          return (
            <div
              key={category.id}
              className="flex flex-col gap-3 hover:cursor-pointer"
            >
              <h3
                className="text-left text-2xl font-bold"
                onClick={() => navi(`/products/by/${category.slug}`)}
              >
                {category._Name}
              </h3>
              <div className="grid gap-5 grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
                {category?.subCategories?.map((sub) => {
                  return (
                    <div
                      onClick={() =>
                        navi(`/products/by/${category.slug}/${sub.slug}`)
                      }
                      className="relative cursor-pointer hover:border-[#0A9ACF] hover:bg-gray-200 transition duration-200 hover:-translate-y-1 hover:shadow-2xl flex border border-[rgba(0,0,0,0.15)] rounded-lg w-50 h-30 p-5 lg:w-80 lg:h-60"
                    >
                      <h3 className="self-end text-left font-bold text-1xl lg:text-2xl">
                        {sub._Name}
                      </h3>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </article>
    </section>
  );
};

export default Category;
