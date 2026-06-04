import {
  faBars,
  faCoins,
  faRightToBracket,
  faShoppingCart,
  faToolbox,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const Header = () => {
  const [navV, setNavV] = useState(false);
  const [profileV, setProfileV] = useState(false);
  const { user, logout } = useAuth();
  const { cart, totalItems } = useCart();
  const navi = useNavigate();

  return (
    <header className="z-1050 flex fixed gap-5 justify-between lg:justify-normal px-8 lg:px-15 h-20 w-full bg-[#F0F0F0]">
      <Link className="flex lg:hidden" to="/">
        <img
          className="h-15 w-15 lg:h-20 lg:w-20 self-center"
          src="/e.png"
          alt="ElectRa logo"
        />
      </Link>

      <nav className="hidden w-full lg:flex gap-8 items-center justify-between">
        <ul className="flex gap-8 items-center">
          <li>
            <Link to="/">
              <img className="h-20 w-20" src="/e.png" alt="ElectRa logo" />
            </Link>
          </li>
          <li className="hover:text-gray-700">
            <Link to="/">Home</Link>
          </li>
          <li className="hover:text-gray-700">
            <Link to="/products">Products</Link>
          </li>
          <li className="hover:text-gray-700">
            <Link to="/categories">Categories</Link>
          </li>
        </ul>

        <ul className="flex items-center gap-8">
          <li className={`${user ? "" : "hidden"} hover:text-gray-700`}>
            <button>
              <FontAwesomeIcon icon={faCoins} /> {user?.rewardPoints.toFixed(2)}
            </button>
          </li>
          <li className="hover:text-gray-700">
            <button
              className="cursor-pointer relative"
              onClick={() => {
                navi("/cart");
              }}
            >
              <FontAwesomeIcon icon={faShoppingCart} />
              <span
                className={`${totalItems == 0 ? "hidden" : "block"} rounded-[50%] h-6 w-6 text-white items-center justify-center bg-red-400 absolute -right-4 -top-4`}
              >
                {totalItems}
              </span>
            </button>
          </li>
          {/* <li className="hover:text-gray-700">
            <Link to="/about">About Us</Link>
          </li> */}
          <li className="hover:text-gray-700">
            <Link
              className={`${user ? "hidden" : ""} button primary`}
              to="/login"
            >
              <FontAwesomeIcon icon={faUserCircle} /> Log In
            </Link>
            {user ? (
              <>
                <button
                  className={`flex gap-5 items-center relative`}
                  onClick={() => setProfileV(!profileV)}
                >
                  {user?.firstName} {user?.lastName}
                  <img
                    className="pfp"
                    src={user?.profilePic || `/placeholder-avatar.jpg`}
                    alt={user?.firstName}
                  />
                </button>
                <ul
                  className={`${profileV ? "opacity-100" : "opacity-0"} transition absolute bg-gray-300 top-24 right-10 p-2 rounded-xl flex flex-col gap-3 text-black`}
                >
                  <li
                    onClick={() => setProfileV(!profileV)}
                    className="hover:text-gray-500 p-1"
                  >
                    <Link to={"/me"}>
                      <FontAwesomeIcon icon={faUserCircle} /> Profile
                    </Link>
                  </li>
                  {user?.roles?.includes("Admin") ? (
                    <li
                      onClick={() => setProfileV(!profileV)}
                      className="hover:text-gray-500 p-1"
                    >
                      <FontAwesomeIcon icon={faToolbox} />{" "}
                      <Link to={"/admin"}>Admin Panel</Link>
                    </li>
                  ) : null}
                  <hr />
                  <li
                    onClick={() => setProfileV(!profileV)}
                    className="hover:text-gray-500 p-1"
                  >
                    <button
                      onClick={() => {
                        logout();
                        navi("/");
                      }}
                    >
                      <FontAwesomeIcon icon={faRightToBracket} /> Log Out
                    </button>
                  </li>
                </ul>
              </>
            ) : null}
          </li>
        </ul>
      </nav>
      <div className="flex gap-5 lg:hidden items-center">
        <div className={`${user ? "" : "hidden"} hover:text-gray-700`}>
          <button>
            <FontAwesomeIcon icon={faCoins} /> {user?.rewardPoints.toFixed(2)}
          </button>
        </div>
        <div className="hover:text-gray-700">
          <button
            className="cursor-pointer relative"
            onClick={() => {
              navi("/cart");
            }}
          >
            <FontAwesomeIcon icon={faShoppingCart} />
            <span
              className={`${cart.length == 0 ? "hidden" : "block"} rounded-[50%] h-6 w-6 text-white items-center justify-center bg-red-400 absolute -right-4 -top-4`}
            >
              {totalItems}
            </span>
          </button>
        </div>
        <div className="relative text-center flex">
          <button onClick={() => navi(`/me`)}></button>

          <button
            onClick={() => setNavV(navV ? false : true)}
            className="cursor-pointer"
          >
            {user ? (
              <img
                className="pfp"
                src={user?.profilePic || `/placeholder-avatar.jpg`}
                alt={user?.firstName}
              />
            ) : (
              <FontAwesomeIcon icon={faBars} />
            )}
          </button>

          <ul
            className={`${navV ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"} flex p-5 absolute top-15 -left-22 bg-gray-300 transition rounded-lg flex-col gap-5 items-center`}
          >
            <li className="hover:text-gray-700">
              <Link onClick={() => setNavV(!navV)} to="/">
                Home
              </Link>
            </li>
            {/* <li className="hover:text-gray-700">
              <Link onClick={() => setNavV(!navV)} to="/products/featured">
                Featured
              </Link>
            </li> */}
            <li className="hover:text-gray-700">
              <Link onClick={() => setNavV(!navV)} to="/products">
                Products
              </Link>
            </li>
            <li className="hover:text-gray-700">
              <Link onClick={() => setNavV(!navV)} to="/categories">
                Categories
              </Link>
            </li>

            <hr className={`${user ? "" : "hidden"} w-full text-black`} />
            <li className="hover:text-gray-700">
              <Link onClick={() => setNavV(!navV)} to="/me">
                Profile
              </Link>
            </li>
            {user?.roles?.includes("Admin") ? (
              <li>
                <Link onClick={() => setNavV(!navV)} to={"/admin"}>
                  Admin Panel
                </Link>
              </li>
            ) : null}
            <li onClick={() => setNavV(!navV)} className="p-1">
              <button
                onClick={() => {
                  user
                    ? (() => {
                        logout();
                        navi("/");
                      })()
                    : navi("/login");
                }}
              >
                {user ? "Log Out" : "Log In"}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
