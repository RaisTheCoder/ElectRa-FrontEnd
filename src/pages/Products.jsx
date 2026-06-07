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
import { useCart } from "../context/CartContext";
import api from "../api/client";
import { Helmet } from "react-helmet";

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
    <section className="min-h-screen container mx-auto flex gap-5 py-10 bg-bg text-fg">
      <Helmet>
        <title>Products - ElectRa</title>
      </Helmet>

      <div
        onClick={() => setFilterOpen(false)}
        className={`fixed inset-0 bg-black/40 z-40 lg:hidden ${
          filterOpen ? "block" : "hidden"
        }`}
      />

      <aside
        className={`fixed lg:static z-50 top-20 left-0 h-[calc(100vh-5rem)] w-80 bg-surface lg:bg-transparent lg:border-0 border-r border-border p-4 transition-transform duration-300 ${
          filterOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex flex-col gap-5">
          <strong className="text-lg">Filters</strong>

          <div className="flex gap-2">
            <input
              className="w-full p-2 rounded-lg bg-surface border border-border text-sm outline-none focus:border-primary"
              placeholder="Search..."
              ref={search}
              onClick={focusInput}
              onKeyDown={(e) => e.key === "Enter" && applySearch()}
            />

            <button
              className="p-2 px-3 rounded-lg bg-surface hover:bg-border transition"
              onClick={applySearch}
            >
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>

          <div className="bg-surface p-3 rounded-lg border border-border">
            <div
              onClick={() => setSortOpen(!sortOpen)}
              className="flex items-center justify-between cursor-pointer"
            >
              <strong>Sort</strong>
              <FontAwesomeIcon icon={faAngleDown} />
            </div>

            {sortOpen && (
              <select
                className="w-full mt-2 p-2 rounded-lg bg-surface border border-border"
                value={filters.sort}
                onChange={(e) =>
                  setFilters((p) => ({ ...p, sort: e.target.value }))
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

          <div className="bg-surface p-3 rounded-lg border border-border">
            <div
              onClick={() => setCatOpen(!catOpen)}
              className="flex items-center justify-between cursor-pointer"
            >
              <strong>Category</strong>
              <FontAwesomeIcon icon={faAngleDown} />
            </div>

            {catOpen && (
              <div className="mt-2 flex flex-col gap-2 text-sm text-muted">
                <button
                  onClick={() => setSkip(0)}
                  className="text-left hover:text-fg"
                >
                  All Products
                </button>

                {categories.map((c) => (
                  <div key={c.id}>
                    <button
                      onClick={() => {
                        setSkip(0);
                        navi(`/products/by/${c.slug}`);
                      }}
                      className="text-left font-semibold hover:text-fg"
                    >
                      {c._Name}
                    </button>

                    <div className="ml-4 flex flex-col gap-1 mt-1">
                      {c.subCategories?.map((sc) => (
                        <button
                          key={sc.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSkip(0);
                            navi(`/products/by/${c.slug}/${sc.slug}`);
                          }}
                          className="text-left hover:text-fg"
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

          <div className="bg-surface p-3 rounded-lg border border-border">
            <strong>Price</strong>

            <div className="flex gap-2 mt-2">
              <input
                type="number"
                placeholder="Min"
                className="w-full p-2 rounded-lg bg-surface border border-border text-sm"
                value={filters.minPrice}
                onChange={(e) =>
                  setFilters((p) => ({ ...p, minPrice: e.target.value }))
                }
              />

              <input
                type="number"
                placeholder="Max"
                className="w-full p-2 rounded-lg bg-surface border border-border text-sm"
                value={filters.maxPrice}
                onChange={(e) =>
                  setFilters((p) => ({ ...p, maxPrice: e.target.value }))
                }
              />
            </div>
          </div>
        </div>
      </aside>

      <article className="flex-1 flex flex-col gap-5 px-5">
        <button
          onClick={() => setFilterOpen(true)}
          className="fixed top-30 left-0 lg:hidden z-[25] p-3 bg-primary text-white rounded-r-xl"
        >
          <FontAwesomeIcon icon={faFilter} />
        </button>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {loading && (
            <div className="col-span-full flex justify-center">
              <TailSpin height={60} width={60} color="#0A99CF" />
            </div>
          )}

          {products.map((product) => {
            const item = cart.find((i) => i.productId === product.id);

            return (
              <div
                key={product.id}
                onClick={() => navi(`/products/${product.id}`)}
                className="group bg-card dark:hover:shadow-primary shadow border border-border rounded-xl overflow-hidden cursor-pointer hover:-translate-y-1 hover:shadow-lg transition flex flex-col"
              >
                <div className="h-52 bg-surface flex items-center justify-center">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="h-full w-full object-cover group-hover:scale-105 transition"
                  />
                </div>

                <div className="p-4 flex flex-col gap-3 flex-1">
                  <div>
                    <h3 className="text-sm line-clamp-2">
                      <span className="font-bold">{product?.brand?._Name}</span>{" "}
                      {product.title}
                    </h3>
                    <span className="text-xs text-muted">
                      {product.subCategory?._Name}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-sm">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <FontAwesomeIcon
                        key={i}
                        icon={faStar}
                        className={
                          product.rating >= i ? "text-orange-400" : "text-muted"
                        }
                      />
                    ))}
                    <span className="text-muted ml-1">
                      {product.rating?.toFixed(1) || "0.0"}
                    </span>
                  </div>

                  <div className="mt-auto flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <span className="relative font-bold text-primary">
                        ${product.price.toFixed(2)}
                        <span className="absolute left-0 -top-3 text-xs text-muted line-through">
                          ${product.originalPrice.toFixed(2)}
                        </span>
                      </span>

                      {product.discountPercentage > 0 && (
                        <span className="text-xs text-red-500">
                          -{product.discountPercentage}%
                        </span>
                      )}
                    </div>

                    {item ? (
                      <div
                        className="flex items-center justify-between bg-surface rounded-lg"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          className="min-w-10 bg-surface-2 text-white py-2 rounded-lg hover:opacity-90 transition"
                          onClick={() => removeItem(product.id)}
                        >
                          -
                        </button>

                        <span>{item.quantity}</span>

                        <button
                          className="min-w-10 bg-primary text-white py-2 rounded-lg hover:opacity-80 transition"
                          onClick={() => addItem(product.id)}
                        >
                          +
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          addItem(product.id);
                        }}
                        className="bg-primary text-white py-2 rounded-lg hover:opacity-90"
                      >
                        Add to Cart
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {products.length >= 10 && (
          <div className="flex justify-center">
            <button
              onClick={loadMore}
              className="px-4 py-2 bg-surface border border-border rounded-lg hover:bg-border"
            >
              Load More
            </button>
          </div>
        )}
      </article>
    </section>
  );
};

export default Products;
