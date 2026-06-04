import {
  faDiscord,
  faInstagram,
  faTwitter,
  faWhatsapp,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="flex min-h-90 gap-10 px-15 py-5 bg-[#F0F0F0]">
      <section className="flex gap-5 flex-wrap flex-col md:flex-row w-full h-full justify-between">
        <section>
          <section className="w-75 h-full flex flex-col gap-5">
            <h3 className="text-3xl flex items-center">
              <img src="/e.png" className="h-15 w-15" />
              lectRa™
            </h3>
            <p>
              ElectRa is a mockery Electronics Store web project to demonstrate
              my skills while showcasing how would I make electronics store
              industry better.
            </p>
            <hr />
            <ul>
              <li className="hover:text-gray-700 w-fit">
                Phone: <Link to="tel://+12345678910">+12345678910</Link>
              </li>
              <li className="hover:text-gray-700 w-fit">
                Email:{" "}
                <Link target="blank" to="mailto://">
                  support@electra.com
                </Link>
              </li>
            </ul>
          </section>
        </section>
        <section className="flex h-full flex-col md:flex-row flex-wrap gap-10">
          <section className="min-w-75 h-full flex flex-col gap-5">
            <div>
              <h3 className="text-3xl">Stay Connected</h3>
              <p className="text-[12px]">
                Subscribe to our newsletter for updates and offers!
              </p>
            </div>
            <hr />
            <div className="flex gap-2 items-center">
              <input
                className="bg-gray-300 p-3 rounded-lg"
                type="text"
                placeholder="Enter email here..."
              />
              <button className="h-12 w-12 bg-gray-300 rounded-lg">
                <FontAwesomeIcon icon={faArrowRight} />
              </button>
            </div>
            <div className="grid grid-cols-4 gap-5 justify-center self-center">
              <Link
                className="w-12 h-12 rounded-[50%] bg-gray-300 flex justify-center items-center"
                to={"/"}
              >
                <FontAwesomeIcon icon={faInstagram} />
              </Link>
              <Link
                className="w-12 h-12 rounded-[50%] bg-gray-300 flex justify-center items-center"
                to={"/"}
              >
                <FontAwesomeIcon icon={faWhatsapp} />
              </Link>
              <Link
                className="w-12 h-12 rounded-[50%] bg-gray-300 flex justify-center items-center"
                to={"/"}
              >
                <FontAwesomeIcon icon={faDiscord} />
              </Link>
              <Link
                className="w-12 h-12 rounded-[50%] bg-gray-300 flex justify-center items-center"
                to={"/"}
              >
                <FontAwesomeIcon icon={faXTwitter} />
              </Link>
            </div>
          </section>

          <section className="min-w-75 h-full flex flex-col gap-5">
            <div>
              <h3 className="text-3xl">Navigate</h3>
            </div>
            <hr />
            <ul className="grid grid-cols-2">
              <div>
                <li className="hover:text-gray-700 w-fit h-10">
                  <Link to="/">Home</Link>
                </li>
                <li className="hover:text-gray-700 w-fit h-10">
                  <Link to="/categories">Categories</Link>
                </li>
                <li className="hover:text-gray-700 w-fit h-10">
                  <Link to="/about">About Us</Link>
                </li>
              </div>
              <div>
                <li className="hover:text-gray-700 w-fit h-10">
                  <Link to="/products">Products</Link>
                </li>
              </div>
            </ul>
          </section>
        </section>
      </section>
    </footer>
  );
};

export default Footer;
