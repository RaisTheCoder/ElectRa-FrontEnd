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

  return (
    <section className="min-h-screen py-10 bg-bg text-fg">
      <Helmet>
        <title>Categories - ElectRa</title>
      </Helmet>

      <article className="container mx-auto flex flex-col gap-12 px-5">
        {categories.map((category) => (
          <div key={category.id} className="flex flex-col gap-5">
            {/* CATEGORY TITLE */}
            <h3
              onClick={() => navi(`/products/by/${category.slug}`)}
              className="text-2xl md:text-3xl font-bold cursor-pointer hover:text-primary transition w-fit"
            >
              {category._Name}
            </h3>

            {/* SUB CATEGORIES GRID */}
            <div className="grid gap-5 grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
              {category?.subCategories?.map((sub) => (
                <div
                  key={sub.id}
                  onClick={() =>
                    navi(`/products/by/${category.slug}/${sub.slug}`)
                  }
                  className="
                    group cursor-pointer
                    bg-card border border-border
                    rounded-xl p-5
                    min-h-[120px] md:min-h-[160px]
                    flex items-end
                    transition
                    hover:-translate-y-1 hover:shadow-lg hover:border-primary
                  "
                >
                  <h3 className="text-lg md:text-xl font-semibold group-hover:text-primary transition">
                    {sub._Name}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        ))}
      </article>
    </section>
  );
};

export default Category;
