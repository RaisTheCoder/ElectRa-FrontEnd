import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Audio, Oval, TailSpin } from "react-loader-spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { useFormik } from "formik";
import api from "../api/client";
import { useProducts } from "../context/ProductContext";
import { useAuth } from "../context/AuthContext";
import { Helmet } from "react-helmet";

const Product = () => {
  const { id } = useParams();
  const navi = useNavigate();

  const { user } = useAuth();

  const [hovered, setHovered] = useState(0);

  const { product, loading, item, reviews, setReviews, pushHistory } =
    useProducts();

  const { handleChange, setFieldValue, handleSubmit, values } = useFormik({
    initialValues: {
      comment: "",
      rating: 0,
      productId: id,
      userId: user?.id,
    },
    onSubmit: async (values) => {
      try {
        if (values.rating != 0 || values.comment != "") {
          await api.post("/reviews/add", values);
          const res = await api.get(`/products/${id}`);
          setReviews(res.data.reviews);
          values.rating = 0;
          values.comment = "";
        }
      } catch (err) {
        console.log(err.response?.data);
      }
      console.log(values);
    },
  });

  const reviewHelpful = async (id) => {
    await api.post(`/reviews/${id}/helpful`);

    item();
  };

  useEffect(() => {
    item();
  }, []);

  useEffect(() => {
    if (!product?.id) return;

    pushHistory(product.id);
  }, [product?.id]);

  return (
    <section className="relative gap-15 lg:container py-10 px-5 flex flex-col self-center min-h-screen w-full">
      <Helmet>
        <title>{product.title} - ElectRa</title>
      </Helmet>
      <button
        onClick={() => {
          navi("../");
        }}
        className="w-fit h-8 select-none absolute lg:top-1 left-8 cursor-pointer z-10"
      >
        <FontAwesomeIcon icon={faArrowLeft} /> Go Back
      </button>
      <div className="overflow-hidden relative flex flex-col items-center md:flex-row p-8 rounded-lg gap-10 w-full md:h-120 border border-[rgba(0,0,0,0.15)]">
        <div
          className={`${loading ? "flex" : "hidden"} absolute top-0 left-0  z-10 items-center justify-center bg-white w-full h-full`}
        >
          <TailSpin
            className="flex self-center align-self-center"
            height={80}
            width={80}
            color="#0A9ACF"
            visible={loading}
          />
        </div>

        <aside className="flex rounded-lg border border-[rgba(0,0,0,0.15)] w-100 h-full">
          <img
            className="w-full h-full"
            src={product.thumbnail}
            alt={product.title}
          />
        </aside>

        <article>
          <div className="flex flex-col gap-5">
            <p className="text-3xl text-(--electra-blue)">${product.price}</p>
            <strong className="text-4xl">{product.title}</strong>
            <div className="flex items-center gap-2 text-gray-500">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <FontAwesomeIcon
                    key={i}
                    icon={faStar}
                    className={
                      product.rating >= i ? "text-orange-400" : "text-gray-300"
                    }
                  />
                ))}

                <span className="text-xs text-gray-500 ml-1">
                  {product.rating?.toFixed(1) || "0.0"}
                </span>
              </div>
              |
              <p className="items-center text-[18px] text-gray-500">
                {product.subCategory?._Name}
              </p>
            </div>
            <p className="max-w-90">{product.description}</p>
          </div>
        </article>
      </div>

      <div className="overflow-hidden relative flex flex-col items-center md:items-start p-8 rounded-lg gap-5 w-full md:h-180 border border-[rgba(0,0,0,0.15)]">
        <div
          className={`${loading ? "flex" : "hidden"} absolute top-0 left-0  z-10 items-center justify-center bg-white w-full h-full`}
        >
          <TailSpin
            className="flex self-center align-self-center"
            height={80}
            width={80}
            color="#0A9ACF"
            visible={loading}
          />
        </div>

        <form
          onSubmit={handleSubmit}
          className="w-full min-h-20 flex flex-col md:flex-row gap-5 items-center justify-between"
        >
          <img
            src={user?.profilePic || `/placeholder-avatar.jpg`}
            className="w-10 h-10 md:w-15 md:h-15 rounded-[50%]"
            alt="Profile Picture"
          />
          <div className="w-full md:w-[85%] gap-5 grid grid-rows-2">
            <input type="hidden" value={values.userId} />
            <input
              value={values.comment}
              onChange={handleChange}
              className="bg-gray-100 p-3 md:h-12 h-10 rounded-lg box-border"
              placeholder="Enter comment..."
              name="comment"
              type="text"
            />

            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setFieldValue("rating", i)}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(0)}
                  className="cursor-pointer"
                >
                  <FontAwesomeIcon
                    icon={faStar}
                    className={
                      (hovered || values.rating) >= i
                        ? "text-orange-400"
                        : "text-gray-300"
                    }
                  />
                </button>
              ))}
            </div>
          </div>

          <button className="h-10 w-full md:h-15 md:w-15 flex cursor-pointer hover:bg-gray-300 items-center justify-center bg-gray-100 md:rounded-[50%] rounded-lg">
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </form>

        <strong className="text-2xl w-full">Reviews</strong>
        <hr className="w-full" />
        <div className="gap-5 w-full h-full overflow-scroll flex flex-col">
          {reviews ? (
            reviews.map((review) => {
              return (
                <div key={review?.id} className="w-70 flex flex-col gap-2">
                  <div className="flex gap-3 items-center">
                    <img
                      src={
                        review?.user?.profilePic || `/placeholder-avatar.jpg`
                      }
                      className="w-10 h-10 rounded-[50%]"
                      alt="Profile Picture"
                    />
                    <strong>
                      {review.user.firstName} {review.user.lastName}
                    </strong>
                  </div>
                  <span className="flex items-center gap-1">
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
                  </span>
                  <p>"{review.comment}"</p>
                  <div className="flex flex-col">
                    <span className="text-gray-500 text-[12px] relative">
                      {review?.reviewHelpfuls?.length || 0}
                      {(review?.reviewHelpfuls?.length || 0) === 1
                        ? " person found this helpful"
                        : " people found this helpful"}
                    </span>

                    <div className="text-gray-500 flex gap-5">
                      <button
                        onClick={() => reviewHelpful(review.id)}
                        className="hover:text-black cursor-pointer w-fit h-5"
                      >
                        I find this review helpful
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="self-center text-2xl text-gray-400 font-bold">
              No Reviews Yet!
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Product;
