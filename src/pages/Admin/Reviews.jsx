import {
  faCheck,
  faPencil,
  faSearch,
  faStar,
  faTrash,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { useNavigate } from "react-router";
import api from "../../api/client";

const Categories = () => {
  let limit = 15;
  const [skip, setSkip] = useState(0);
  const [apiReviews, setApiReviews] = useState([]);
  const [Reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const search = useRef("");

  const navi = useNavigate();

  const focusInput = () => {
    search.current.focus();
  };

  const getReviews = async () => {
    setLoading(true);

    const res = await api.get(`/Reviews?limit=${limit}&skip=${skip}`);

    setApiReviews((prev) => (skip === 0 ? res.data : [...prev, ...res.data]));
    setReviews((prev) => (skip === 0 ? res.data : [...prev, ...res.data]));

    setLoading(false);
  };

  const filterReviews = () => {
    if (search.current.value != "") {
      const temp = Reviews.filter((r) =>
        r?.user?.userName
          .toLowerCase()
          .includes(search?.current.value.toLowerCase()),
      );
      return setReviews(temp);
    }
    return setReviews(apiReviews);
  };

  const loadMore = () => {
    setSkip((r) => r + limit);
  };

  const remove = async (id) => {
    await api.delete(`/reviews/${id}`);
    setReviews(Reviews.filter((r) => r.id != id));
  };

  useEffect(() => {
    getReviews();
    setLoading(Reviews == [] ? true : false);
  }, [skip]);

  console.log(Reviews);

  return (
    <article className="flex gap-5 flex-col bg-transparent">
      <div className="flex gap-5">
        <input
          type="text"
          className="w-full bg-gray-200 rounded-lg h-10 p-5"
          placeholder="Search..."
          ref={search}
          onClick={() => focusInput()}
          onKeyDown={(e) => {
            if (e.key == "Enter") filterReviews();
          }}
        />
        <button
          className="p-2 px-3 rounded-lg cursor-pointer bg-gray-200"
          onClick={() => filterReviews()}
        >
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>

      {loading && (
        <div className="flex justify-center py-10">
          <TailSpin height={60} width={60} color="#0A9ACF" />
        </div>
      )}

      <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
        <table className="app-table">
          <thead>
            <tr>
              <td>Product</td>
              <td>Comment</td>
              <td>Rating</td>
              <td>Commenter</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            {Reviews.map((Review) => {
              return (
                <tr key={Review.id}>
                  <td
                    onClick={() => {
                      navi(`/products/${Review.productId}`);
                    }}
                  >
                    <img
                      className="product-thumb"
                      src={Review?.product?.thumbnail}
                      alt={Review?.product?.title}
                    />

                    <div>
                      <p className="truncate">{Review?.product?.title}</p>
                      <p className="text-xs text-gray-400">
                        By: {Review?.product?.brand?._Name} | ID:{" "}
                        {Review?.product?.id}
                      </p>
                    </div>
                  </td>

                  <td>
                    <div>
                      <p>{Review.comment}</p>
                      <p className="text-xs text-gray-400">ID: {Review.id}</p>
                    </div>
                  </td>

                  <td>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <FontAwesomeIcon
                          key={i}
                          icon={faStar}
                          className={
                            Review?.rating >= i
                              ? "text-orange-400"
                              : "text-gray-300"
                          }
                        />
                      ))}

                      <span className="text-xs text-gray-500 ml-1">
                        {Review?.rating?.toFixed(1) || "0.0"}
                      </span>
                    </div>
                  </td>

                  <td className="user-cell">
                    <img
                      src={
                        Review?.user?.profilePic || "/placeholder-avatar.jpg"
                      }
                      className="h-8 w-8 rounded-full object-cover"
                    />

                    <div>
                      <p>
                        {Review?.user?.firstName} {Review?.user?.lastName}
                      </p>
                      <p className="text-xs text-gray-400">
                        @{Review?.user?.userName} | ID: {Review?.user?.id}
                      </p>
                    </div>
                  </td>

                  <td className="actions-cell">
                    <button
                      onClick={() => remove(Review.id)}
                      className="action-btn"
                    >
                      <FontAwesomeIcon icon={faTrash} /> Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <button
        onClick={() => {
          loadMore();
        }}
        className={`${Reviews.length >= 10 ? "block" : "hidden"} w-fit px-3 p-1 bg-gray-300 rounded-lg cursor-pointer self-center`}
      >
        Load More
      </button>
    </article>
  );
};

export default Categories;
