import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { TailSpin } from "react-loader-spinner";
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

  const { handleChange, setFieldValue, handleSubmit, values, resetForm } =
    useFormik({
      initialValues: {
        comment: "",
        rating: 0,
        productId: id,
        userId: user?.id,
      },
      enableReinitialize: true,
      onSubmit: async (values) => {
        try {
          if (values.rating !== 0 || values.comment !== "") {
            await api.post("/reviews/add", values);
            const res = await api.get(`/products/${id}`);
            setReviews(res.data.reviews);
            resetForm();
          }
        } catch (err) {
          console.log(err?.response?.data);
        }
      },
    });

  const reviewHelpful = async (reviewId) => {
    await api.post(`/reviews/${reviewId}/helpful`);
    item();
  };

  useEffect(() => {
    item();
  }, []);

  useEffect(() => {
    if (!product?.id) return;
    pushHistory(product.id);
  }, [product?.id]);

  const title =
    product.brand?._Name + " " + product?.title || "Unknown Product";

  return (
    <section className="py-10 px-5 flex items-center flex-col min-h-screen w-full text-fg">
      <div className="relative flex flex-col lg:container gap-10">
        <Helmet>
          <title>{`${title} - ElectRa`}</title>
        </Helmet>

        <button
          onClick={() => navi("../")}
          className="w-fit h-8 absolute -top-8 cursor-pointer text-muted hover:text-fg"
        >
          <FontAwesomeIcon icon={faArrowLeft} /> Go Back
        </button>

        <div className="relative flex flex-col md:flex-row p-8 rounded-lg gap-10 w-full md:h-120 border border-border bg-surface-2">
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-surface/80 z-10">
              <TailSpin height={80} width={80} color="#0A9ACF" />
            </div>
          )}

          <aside className="flex rounded-lg border border-border w-full md:w-100 h-80 md:h-full overflow-hidden bg-surface">
            <img
              className="w-full h-full object-contain"
              src={product?.thumbnail}
              alt={product?.title}
            />
          </aside>

          <article className="flex flex-col justify-center gap-5">
            <div className="flex items-center gap-2">
              <span className="relative text-3xl font-bold text-primary">
                ${product?.price?.toFixed(2)}
                <span className="absolute left-0 -top-5 text-xl text-muted line-through">
                  ${product?.originalPrice?.toFixed(2)}
                </span>
              </span>

              {product?.discountPercentage > 0 && (
                <span className="text-2xl text-red-500">
                  -{product?.discountPercentage}%
                </span>
              )}
            </div>

            <strong className="text-3xl md:text-4xl">{title}</strong>

            <div className="flex items-center gap-2 text-muted flex-wrap">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <FontAwesomeIcon
                    key={i}
                    icon={faStar}
                    className={
                      (product?.rating || 0) >= i
                        ? "text-orange-400"
                        : "text-gray-500"
                    }
                  />
                ))}
                <span className="text-xs ml-1">
                  {product?.rating?.toFixed(1) || "0.0"}
                </span>
              </div>

              <span>|</span>

              <span>{product?.subCategory?._Name}</span>
            </div>

            <p className="text-muted max-w-2xl">{product?.description}</p>
          </article>
        </div>

        <div className="relative flex flex-col p-8 rounded-lg gap-5 w-full border border-border bg-surface-2">
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-surface/80 z-10">
              <TailSpin height={80} width={80} color="#0A9ACF" />
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="w-full flex md:flex-row gap-5 items-center"
          >
            <img
              src={user?.profilePic || "/placeholder-avatar.jpg"}
              className="w-10 h-10 md:w-14 md:h-14 rounded-full"
              alt="profile"
            />

            <div className="w-full flex flex-col gap-3">
              <div className="flex gap-2">
                <input
                  value={values.comment}
                  onChange={handleChange}
                  className="bg-surface w-full border border-border p-3 rounded-lg"
                  placeholder="Write a comment..."
                  name="comment"
                />

                <button className="min-w-15 button">
                  <FontAwesomeIcon icon={faArrowRight} />
                </button>
              </div>

              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setFieldValue("rating", i)}
                    onMouseEnter={() => setHovered(i)}
                    onMouseLeave={() => setHovered(0)}
                  >
                    <FontAwesomeIcon
                      icon={faStar}
                      className={
                        (hovered || values.rating) >= i
                          ? "text-orange-400"
                          : "text-gray-500"
                      }
                    />
                  </button>
                ))}
              </div>
            </div>
          </form>

          <strong className="text-xl">Reviews</strong>
          <hr className="border-border" />

          <div className="flex flex-col gap-5 max-h-[400px] overflow-y-auto">
            {reviews?.length ? (
              reviews.map((review) => (
                <div key={review.id} className="flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                    <img
                      src={
                        review?.user?.profilePic || "/placeholder-avatar.jpg"
                      }
                      className="w-10 h-10 rounded-full"
                      alt="user"
                    />
                    <strong>
                      {review?.user?.firstName} {review?.user?.lastName}
                    </strong>
                  </div>

                  <div className="flex items-center gap-1 text-muted">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <FontAwesomeIcon
                        key={i}
                        icon={faStar}
                        className={
                          (review?.rating || 0) >= i
                            ? "text-orange-400"
                            : "text-gray-500"
                        }
                      />
                    ))}
                  </div>

                  <p className="text-muted">"{review.comment}"</p>

                  <button
                    onClick={() => reviewHelpful(review.id)}
                    className="text-sm text-primary hover:underline w-fit"
                  >
                    <span className="text-muted text-[12px] relative">
                      {" "}
                      {review?.reviewHelpfuls?.length || 0}{" "}
                      {(review?.reviewHelpfuls?.length || 0) === 1
                        ? " person found this helpful"
                        : " people found this helpful"}{" "}
                    </span>
                  </button>
                </div>
              ))
            ) : (
              <p className="text-muted text-center">No reviews yet</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Product;
