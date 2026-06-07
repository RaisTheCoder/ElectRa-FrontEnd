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
          className="w-full bg-surface-2 rounded-lg h-10 p-5"
          placeholder="Search..."
          ref={search}
          onClick={() => focusInput()}
          onKeyDown={(e) => {
            if (e.key == "Enter") filterReviews();
          }}
        />
        <button
          className="p-2 px-3 rounded-lg cursor-pointer bg-surface-2"
          onClick={() => filterReviews()}
        >
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl">
        <table className="app-table transition-opacity duration-500 w-full table-fixed">
          <thead>
            <tr>
              <th>Product</th>
              <th>Comment</th>
              <th>Rating</th>
              <th>Commenter</th>
              <th className="actions-cell">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Reviews.map((review) => (
              <tr key={review.id}>
                <td
                  className="cursor-pointer"
                  onClick={() => navi(`/products/${review.productId}`)}
                >
                  <div className="flex items-center gap-3">
                    <img
                      className="product-thumb"
                      src={review?.product?.thumbnail}
                      alt={review?.product?.title}
                    />

                    <div>
                      <p className="truncate">{review?.product?.title}</p>
                      <p className="text-xs text-muted">
                        ID: {review?.product?.id}
                      </p>
                    </div>
                  </div>
                </td>

                <td>
                  <p>{review.comment}</p>
                  <p className="text-xs text-muted">ID: {review.id}</p>
                </td>

                <td>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <FontAwesomeIcon
                        key={i}
                        icon={faStar}
                        className={
                          review?.rating >= i ? "text-orange-400" : "text-muted"
                        }
                      />
                    ))}
                    <span className="text-xs text-muted ml-1">
                      {review?.rating?.toFixed(1) || "0.0"}
                    </span>
                  </div>
                </td>

                <td className="user-cell">
                  <img
                    src={review?.user?.profilePic || "/placeholder-avatar.jpg"}
                    className="h-8 w-8 rounded-full object-cover"
                  />

                  <div>
                    <p>
                      {review?.user?.firstName} {review?.user?.lastName}
                    </p>
                    <p className="text-xs text-gray-400">
                      @{review?.user?.userName}
                    </p>
                  </div>
                </td>

                <td className="actions-cell">
                  <div>
                    <button
                      onClick={() => remove(review.id)}
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
      </div>

      {loading && (
        <div className="flex justify-center py-10">
          <TailSpin height={60} width={60} color="#0A9ACF" />
        </div>
      )}

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
