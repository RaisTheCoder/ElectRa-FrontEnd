import {
  faAngleDown,
  faFilter,
  faSearch,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { TailSpin } from "react-loader-spinner";
import { useProducts } from "../context/ProductContext";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import api from "../api/client";

const Products = () => {
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  const { addItem, cart, removeItem } = useCart();
  const {
    fetch,
    products,
    loading,
    loadMore,
    filters,
    setFilters,
    setSkip,
    search,
    focusInput,
    applySearch,
  } = useProducts();

  const navi = useNavigate();
  const { category, subCategory } = useParams();

  useEffect(() => {
    (async () => {
      const res = await api.get("/categories");
      setCategories(res.data);
    })();

    setSkip(0);
    fetch(category, subCategory);
  }, [category, subCategory]);

  useEffect(() => {
    document.body.style.overflow = filterOpen ? "hidden" : "";
  }, [filterOpen]);

  return (
    <section className="min-h-screen container mx-auto flex gap-5 py-10">
      <div
        onClick={() => setFilterOpen(false)}
        className={`fixed inset-0 bg-black/40 z-40 lg:hidden ${
          filterOpen ? "block" : "hidden"
        }`}
      />

      <aside
        className={`fixed lg:static z-50 top-20 left-0 h-[calc(100vh-5rem)] w-80 bg-gray-300 lg:bg-transparent p-3 transition-transform duration-300 ${
          filterOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex sticky top-22 flex-col gap-5">
          <strong>Filters</strong>

          <div className="flex gap-2">
            <input
              className="w-full p-2 rounded-lg bg-gray-200"
              placeholder="Search..."
              ref={search}
              onClick={() => focusInput()}
              onKeyDown={(e) => {
                if (e.key == "Enter") applySearch();
              }}
            />

            <button
              className="p-2 px-3 rounded-lg cursor-pointer bg-gray-200"
              onClick={() => applySearch()}
            >
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>

          <div className="bg-gray-200 p-3 rounded-lg">
            <div
              onClick={() => setSortOpen(!sortOpen)}
              className="flex justify-between cursor-pointer"
            >
              <strong>Sort</strong>
              <FontAwesomeIcon icon={faAngleDown} />
            </div>

            {sortOpen && (
              <select
                className="w-full mt-2 p-2 rounded-lg"
                value={filters.sort}
                onChange={(e) =>
                  setFilters((p) => ({
                    ...p,
                    sort: e.target.value,
                  }))
                }
              >
                <option value="relevance">Relevance</option>
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="low-high">Price ↑</option>
                <option value="high-low">Price ↓</option>
              </select>
            )}
          </div>

          <div className="bg-gray-200 p-3 rounded-lg">
            <div
              onClick={() => setCatOpen(!catOpen)}
              className="flex justify-between cursor-pointer"
            >
              <strong>Category</strong>
              <FontAwesomeIcon icon={faAngleDown} />
            </div>

            {catOpen && (
              <div className="mt-2 flex flex-col gap-2">
                <button onClick={() => setSkip(0)} className="text-left">
                  All Products
                </button>

                {categories.map((c) => (
                  <div key={c.id} className="text-left">
                    <button
                      onClick={() => {
                        setSkip(0);
                        navi(`/products/by/${c.slug}`);
                      }}
                      className="text-left"
                    >
                      <b>{c._Name}</b>
                    </button>

                    <div className="ml-4">
                      {c.subCategories?.map((sc) => (
                        <button
                          key={sc.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSkip(0);
                            navi(`/products/by/${c.slug}/${sc.slug}`);
                          }}
                          className="text-left block"
                        >
                          {sc._Name}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-gray-200 p-3 rounded-lg">
            <strong>Price</strong>

            <div className="flex gap-2 mt-2">
              <input
                type="number"
                placeholder="Min"
                className="w-full p-2 rounded-lg"
                value={filters.minPrice}
                onChange={(e) =>
                  setFilters((p) => ({
                    ...p,
                    minPrice: e.target.value,
                  }))
                }
              />

              <input
                type="number"
                placeholder="Max"
                className="w-full p-2 rounded-lg"
                value={filters.maxPrice}
                onChange={(e) =>
                  setFilters((p) => ({
                    ...p,
                    maxPrice: e.target.value,
                  }))
                }
              />
            </div>
          </div>
        </div>
      </aside>

      <article className="flex-1 flex flex-col gap-5 px-5">
        <button
          onClick={() => setFilterOpen(true)}
          className="fixed top-30 left-0 lg:hidden z-[25] text-white p-3 text-[24px] bg-[#0A9ACF] hover:bg-[#0887B5] transition rounded-br-xl rounded-tr-xl w-fit"
        >
          <FontAwesomeIcon icon={faFilter} />
        </button>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {loading && (
            <div className="col-span-full flex justify-center">
              <TailSpin height={60} width={60} color="#0A9ACF" />
            </div>
          )}

          {products.map((product) => (
            <div
              onClick={() => navi(`/products/${product.id}`)}
              className="group bg-white border border-gray-200 rounded-xl overflow-hidden cursor-pointer
                       hover:shadow-xl hover:-translate-y-1 transition-all duration-200 flex flex-col"
            >
              <div className="h-52 bg-gray-50 flex items-center justify-center overflow-hidden">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="h-full w-full object-contain group-hover:scale-105 transition duration-300"
                />
              </div>

              <div className="p-4 flex flex-col gap-3 flex-1">
                <div className="space-y-1">
                  <h3 className="text-sm truncate font-semibold line-clamp-2 text-gray-800">
                    {product.title}
                  </h3>

                  <span className="text-xs text-gray-500">
                    {product.subCategory?._Name}
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <FontAwesomeIcon
                      key={i}
                      icon={faStar}
                      className={
                        product.rating >= i
                          ? "text-orange-400"
                          : "text-gray-300"
                      }
                    />
                  ))}

                  <span className="text-xs text-gray-500 ml-1">
                    {product.rating?.toFixed(1) || "0.0"}
                  </span>
                </div>

                <div className="mt-auto flex flex-col w-full gap-3 justify-between pt-2">
                  <div className="flex gap-1 items-center">
                    <span className="relative text-[#0A9ACF] font-bold text-lg flex flex-col">
                      ${product.price.toFixed(2)}
                      <p
                        className={`${product.discountPercentage > 0 ? "" : "hidden"} absolute -bottom-2 line-through text-xs text-gray-400`}
                      >
                        ${product.originalPrice.toFixed(2)}
                      </p>
                    </span>

                    {product.discountPercentage > 0 && (
                      <span className="text-xs text-red-500">
                        -{product.discountPercentage}% OFF
                      </span>
                    )}
                  </div>

                  {(() => {
                    const item = cart.find((i) => i.productId === product.id);

                    if (!item) {
                      return (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            addItem(product.id);
                          }}
                          className="px-4 py-2 rounded-lg bg-[#0A9ACF] text-white text-sm font-medium hover:opacity-90 transition"
                        >
                          Add to Cart
                        </button>
                      );
                    }

                    return (
                      <div
                        className="flex items-center justify-between gap-2"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          className="min-w-10 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-sm font-medium hover:opacity-90 transition"
                          onClick={() => removeItem(product.id)}
                        >
                          -
                        </button>

                        <span className="font-medium min-w-[24px] text-center">
                          {item.quantity}
                        </span>

                        <button
                          className="min-w-10 py-2 rounded-lg bg-[#0A9ACF] min-w-3 text-white text-sm font-medium hover:opacity-90 transition"
                          onClick={() => addItem(product.id)}
                        >
                          +
                        </button>
                      </div>
                    );
                  })()}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          className={`${products.length >= 10 ? "block" : "hidden"} flex justify-center`}
        >
          <button
            onClick={loadMore}
            className="px-4 py-2 bg-gray-200 rounded-lg"
          >
            Load More
          </button>
        </div>
      </article>
    </section>
  );
};

export default Products;
