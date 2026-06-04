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

      <TailSpin
        className="flex self-center align-self-center"
        height={80}
        width={80}
        color="#0A9ACF"
        visible={loading}
      />
      <table
        className={`${loading ? "opacity-0" : "opacity-100"} transition duration-500 table w-full h-fit flex-col border`}
      >
        <thead>
          <tr className="border h-10">
            <td className="border lg:w-12.5">ID</td>
            <td className="border">Comment</td>
            <td className="border">Product ID</td>
            <td className="border">Rating</td>
            <td className="border">Commenter</td>
            <td className="border w-30">Actions</td>
          </tr>
        </thead>
        <tbody>
          {Reviews.map((Review) => {
            return (
              <tr className="border" key={Review.id}>
                <td className="border">{Review.id}</td>
                <td className="border">{Review.comment}</td>
                <td
                  onClick={() => {
                    navi(`/products/${Review.productId}`);
                  }}
                  className="border hover:cursor-pointer"
                >
                  {Review.productId}
                </td>
                <td className="border">
                  <div className="text-[24px] flex">
                    <FontAwesomeIcon
                      className={`${Review.rating >= 1 ? "text-orange-400" : "text-gray-500"}`}
                      icon={faStar}
                    />
                    <FontAwesomeIcon
                      className={`${Review.rating >= 2 ? "text-orange-400" : "text-gray-500"}`}
                      icon={faStar}
                    />
                    <FontAwesomeIcon
                      className={`${Review.rating >= 3 ? "text-orange-400" : "text-gray-500"}`}
                      icon={faStar}
                    />
                    <FontAwesomeIcon
                      className={`${Review.rating >= 4 ? "text-orange-400" : "text-gray-500"}`}
                      icon={faStar}
                    />
                    <FontAwesomeIcon
                      className={`${Review.rating >= 5 ? "text-orange-400" : "text-gray-500"}`}
                      icon={faStar}
                    />
                  </div>
                </td>
                <td className="border">
                  {Review?.user?.firstName} {Review?.user?.lastName}{" "}
                  {`(${Review?.user?.userName})`}
                </td>
                <td className="p-2 flex flex-col gap-2">
                  <button
                    onClick={() => remove(Review.id)}
                    className="flex justify-between items-center px-1 cursor-pointer hover:bg-gray-300 transition bg-gray-200 rounded-md"
                  >
                    <FontAwesomeIcon icon={faTrash} /> Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
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
