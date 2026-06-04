import {
  faCheck,
  faPencil,
  faSearch,
  faTrash,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { React, useEffect } from "react";
import { useNavigate } from "react-router";
import { TailSpin } from "react-loader-spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useProducts } from "../../context/ProductContext";

const Products = () => {
  const navi = useNavigate();

  const {
    products,
    fetch,
    remove,
    loadMore,
    loading,
    search,
    toggleStatus,
    applySearch,
    focusInput,
  } = useProducts();

  useEffect(() => {
    fetch(null, null, false);
  }, []);

  return (
    <article className="flex gap-5 flex-col bg-transparent">
      <button className="button" onClick={() => navi("./add")}>
        Add Product
      </button>

      <div className="flex gap-5">
        <input
          type="text"
          className="w-full bg-gray-200 rounded-lg h-10 p-5"
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

      {loading && (
        <div className="flex justify-center py-10">
          <TailSpin height={60} width={60} color="#0A9ACF" />
        </div>
      )}

      <table
        className={`${loading ? "opacity-0" : "opacity-100"} app-table transition-opacity duration-500 w-full table-fixed`}
      >
        <thead>
          <tr>
            <th>Product</th>
            <th>Category</th>
            <th>Price</th>
            <th>Sales</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr
              onClick={() => navi(`/products/${product.id}`)}
              key={product.id}
              className="hover:bg-gray-100 hover:cursor-pointer"
            >
              <td>
                <img
                  className="product-thumb"
                  src={product.thumbnail}
                  alt={product.title}
                />

                <div>
                  <p className="truncate">{product.title}</p>
                  <p className="text-xs text-gray-400">
                    By: {product.brand._Name} | ID: {product.id}
                  </p>
                </div>
              </td>

              <td>
                <p>{product.subCategory._Name}</p>
                <p className="text-xs text-gray-400">
                  ID: {product.subCategory.id}
                </p>
              </td>

              <td className="text-(--electra-blue)! font-bold">
                ${product.price}
              </td>

              <td>
                <div className="stock-cell flex flex-col">
                  <span>Sold: {product.soldCount}</span>
                  <span>Left: {product.stock}</span>
                </div>
              </td>

              <td>
                <span
                  className={`inline-flex items-center text-xs font-medium ${
                    !product.enabled ? "text-red-500" : "text-emerald-500"
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full mr-2 ${
                      !product.enabled ? "bg-red-500" : "bg-emerald-500"
                    }`}
                  />
                  {product.enabled ? "Enabled" : "Disabled"}
                </span>
              </td>

              <td className="actions-cell">
                <div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navi(`${product.id}`);
                    }}
                    className="action-btn"
                  >
                    <FontAwesomeIcon icon={faPencil} />
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleStatus(product.id);
                    }}
                    className="action-btn"
                  >
                    <FontAwesomeIcon icon={product.enabled ? faX : faCheck} />
                  </button>

                  <button
                    onClick={() => remove(product.id)}
                    className="action-btn"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        onClick={() => {
          loadMore();
        }}
        className={`${products.length >= 10 ? "block" : "hidden"} w-fit px-3 p-1 bg-gray-300 rounded-lg cursor-pointer self-center`}
      >
        Load More
      </button>
    </article>
  );
};

export default Products;
