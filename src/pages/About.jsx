import {
  faBasketShopping,
  faCoins,
  faHandshake,
  faList,
} from "@fortawesome/free-solid-svg-icons";
import React, { useEffect } from "react";
import { Link } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="min-h-screen">
      <title>About Us - ElectRa</title>
      <section
        id="hero"
        className="flex h-[50vh] justify-center items-center"
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
      <section className="flex h-full gap-10 flex-col justify-center items-center py-15 bg-gray-100">
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
          <div className="flex flex-col p-3 justify-center items-center gap-5 bg-gray-200 h-50 w-70 rounded-lg text-center">
            <div className="flex gap-3 flex-col justify-center items-center">
              <FontAwesomeIcon icon={faHandshake} />
              <strong>Reliable Prices</strong>
            </div>
            <p className="text-[14px]">
              No more overpaying for retail markups. Get fair, transparent
              pricing you can trust.
            </p>
          </div>

          <div className="flex flex-col p-3 justify-center items-center gap-5 bg-gray-200 h-50 w-70 rounded-lg text-center">
            <div className="flex gap-3 flex-col justify-center items-center">
              <FontAwesomeIcon icon={faBasketShopping} />
              <strong>Easy access</strong>
            </div>
            <p className="text-[14px]">
              Products you used to hunt for on foreign e-commerce platforms are
              now available locally. No customs stress, no long waits.
            </p>
          </div>

          <div className="flex flex-col p-3 justify-center items-center gap-5 bg-gray-200 h-50 w-70 rounded-lg text-center">
            <div className="flex gap-3 flex-col justify-center items-center">
              <FontAwesomeIcon icon={faList} />
              <strong>Wide Selection</strong>
            </div>
            <p className="text-[14px]">
              From everyday electronics to rare components. Find exactly what
              you need without endless searching.
            </p>
          </div>

          <div className="flex flex-col p-3 justify-center items-center gap-5 bg-gray-200 h-50 w-70 rounded-lg text-center">
            <div className="flex gap-3 flex-col justify-center items-center">
              <FontAwesomeIcon icon={faCoins} />
              <strong>Gamified Shopping</strong>
            </div>
            <p className="text-[14px]">
              Get bonuses, promotions and rewards for every product you get for
              your needs.
            </p>
          </div>
        </article>
      </section>
    </section>
  );
};

export default About;
