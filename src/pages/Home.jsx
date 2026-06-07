import {
  faBasketShopping,
  faCoins,
  faHandshake,
  faList,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper/modules";
import "swiper/css";
import { useCart } from "../context/CartContext";
import { TailSpin } from "react-loader-spinner";
import { useProducts } from "../context/ProductContext";
import { Helmet } from "react-helmet";

const Home = () => {
  const { products, loading, fetch } = useProducts();

  const navi = useNavigate();

  const { cart, addItem, removeItem } = useCart();

  const inCart = (id) => cart.some((i) => i.productId === id);

  const features = [
    {
      icon: faHandshake,
      title: "Reliable Prices",
      desc: "No more overpaying for retail markups...",
    },
    {
      icon: faBasketShopping,
      title: "Easy Access",
      desc: "Products you used to hunt for...",
    },
    {
      icon: faList,
      title: "Wide Selection",
      desc: "From everyday electronics to rare components...",
    },
    {
      icon: faCoins,
      title: "Gamified Shopping",
      desc: "Get bonuses, promotions and rewards...",
    },
  ];

  useEffect(() => {
    fetch();
  }, []);

  return (
    <section id="home" className="min-h-screen">
      <Helmet>
        <title>Home - ElectRa</title>
      </Helmet>
      <section
        id="hero"
        className="flex h-screen lg:h-[47vh] justify-center items-center"
        style={{
          backgroundImage:
            "url(https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%2Fid%2FOIP._Klkyn9lKs4MyvVf1xuGowHaEJ%3Fpid%3DApi&f=1&ipt=5e0430bb221d7938eac1178a8da1c879ec7af17630ee906c1da705296a9bd9a8&ipo=images)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <article className="text-white flex flex-col gap-8 text-center w-full h-full items-center justify-center backdrop-blur-sm">
          <div className="title">
            <h1 className="font-bold text-5xl">Welcome to ElectRa</h1>
          </div>
          <div className="content flex flex-col items-center">
            <p className="w-90 md:w-120">
              ElectRa is a mockery Electronics Store web project to demonstrate
              my skills while showcasing how would I make electronics store
              industry better.
            </p>
          </div>
          <div className="buttons">
            <Link
              to={"/products"}
              className="p-5 py-4 bg-[#0A99CF] hover:bg-[#0887b5] transition rounded-lg text-white"
            >
              See Products
            </Link>
          </div>
        </article>
      </section>
      <section className="flex gap-10 flex-col justify-center items-center bg-surface-2 py-15">
        <aside className="text-center items-center flex flex-col gap-2">
          <h2 className="text-2xl font-bold">
            Revolutionizing Electronics Shopping
          </h2>
          <p className="w-90">
            Explore thousands of electronic appliances, components, and hardware
            from hundreds of trusted brands, all in one place.
          </p>
        </aside>

        <article className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {features.map((f) => (
            <div
              key={f.title}
              className="flex flex-col p-3 justify-center items-center gap-5 bg-card h-50 w-70 rounded-lg text-center"
            >
              <FontAwesomeIcon icon={f.icon} />
              <strong>{f.title}</strong>
              <p className="text-sm text-muted">{f.desc}</p>
            </div>
          ))}
        </article>
      </section>

      {/* Featured Products, showing at least 10 products. */}
      <section
        id="featured"
        className="flex gap-10 flex-col justify-center items-center py-15"
      >
        <aside className="text-center">
          <h2 className="text-2xl font-bold">Featured Products</h2>
          <p>Check out some products!</p>
        </aside>
        <article className="flex w-screen container">
          <Swiper
            slidesPerView={"auto"}
            spaceBetween={30}
            freeMode={true}
            modules={[FreeMode, Pagination]}
          >
            {loading ? (
              <div className="flex justify-center w-full">
                <TailSpin height={60} width={60} color="#0A9ACF" />
              </div>
            ) : (
              products.map((product) => (
                <SwiperSlide
                  key={product.id}
                  className="group duration-200 rounded-xl flex flex-col !w-[250px] cursor-pointer border overflow-hidden bg-card border-border transition-all"
                  onClick={() => navi(`/products/${product.id}`)}
                >
                  <div className="h-52 bg-surface flex items-center justify-center overflow-hidden">
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="h-full w-full object-cover group-hover:scale-105 transition"
                    />
                  </div>

                  <div className="p-4 flex flex-col gap-3 flex-1">
                    <div className="space-y-1">
                      <h3 className="text-sm truncate font-semibold line-clamp-2 text-fg">
                        {product?.brand?._Name} {product.title}
                      </h3>

                      <span className="text-xs text-muted">
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
                        const item = cart.find(
                          (i) => i.productId === product.id,
                        );

                        return item ? (
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
                        );
                      })()}
                    </div>
                  </div>
                </SwiperSlide>
              ))
            )}
          </Swiper>
        </article>
      </section>
    </section>
  );
};

export default Home;
