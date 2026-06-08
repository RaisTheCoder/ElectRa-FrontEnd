import {
  faBars,
  faCoins,
  faRightToBracket,
  faShoppingCart,
  faToolbox,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import ThemeDropdown from "./ThemeDropdown";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const { user, logout } = useAuth();
  const { totalItems } = useCart();
  const navi = useNavigate();

  return (
    <>
      <header className="fixed top-0 left-0 w-full h-20 z-100 bg-surface border-b border-border text-fg">
        <div className="container mx-auto h-full px-5 flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img src="/e.png" className="h-8 w-8" />
            <span className="hidden sm:block font-bold">lectRa</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8 text-sm">
            <Link to="/">Home</Link>
            <Link to="/products">Products</Link>
            <Link to="/categories">Categories</Link>
          </nav>

          <div className="flex items-center gap-3">
            {user && (
              <button className="text-sm text-muted">
                <FontAwesomeIcon icon={faCoins} />{" "}
                {user.rewardPoints?.toFixed(0)}
              </button>
            )}

            <button
              onClick={() => navi("/cart")}
              className="relative p-2 rounded-lg hover:bg-surface-2"
            >
              <FontAwesomeIcon icon={faShoppingCart} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 text-[10px] bg-red-500 text-white flex items-center justify-center rounded-full">
                  {totalItems}
                </span>
              )}
            </button>

            {user ? (
              <div className="relative hidden lg:block">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 p-1 rounded-lg hover:bg-surface-2"
                >
                  <img
                    src={user?.profilePic || "/placeholder-avatar.jpg"}
                    className="w-8 h-8 rounded-full"
                  />
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-surface border border-border rounded-xl shadow-lg p-2 flex flex-col text-sm">
                    <Link
                      to="/me"
                      className="p-2 hover:bg-surface-2 rounded-lg"
                      onClick={() => setProfileOpen(false)}
                    >
                      {user?.firstName + " " + user?.lastName}
                    </Link>

                    <ThemeDropdown />

                    {user?.roles?.includes("Admin") && (
                      <Link
                        to="/admin"
                        className="p-2 hover:bg-surface-2 rounded-lg"
                        onClick={() => setProfileOpen(false)}
                      >
                        <FontAwesomeIcon icon={faToolbox} /> Admin
                      </Link>
                    )}

                    <button
                      onClick={() => {
                        logout();
                        navi("/");
                        setProfileOpen(false);
                      }}
                      className="p-2 text-left text-red-500 hover:bg-surface-2 rounded-lg"
                    >
                      <FontAwesomeIcon icon={faRightToBracket} /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => navi("/login")}
                className="bg-primary text-white flex items-center gap-2 p-2 px-3 rounded-lg hover:bg-surface-2"
              >
                <FontAwesomeIcon icon={faRightToBracket} /> Log In
              </button>
            )}

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-surface-2"
            >
              {user ? (
                <img
                  src={user?.profilePic || "/placeholder-avatar.jpg"}
                  height={40}
                  width={40}
                  className="rounded-[50%]"
                />
              ) : (
                <FontAwesomeIcon icon={faBars} />
              )}
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-100 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMenuOpen(false)}
          />

          <div className="absolute bottom-0 left-0 w-full bg-surface rounded-t-2xl p-5 flex flex-col gap-4 animate-[slideUp_0.25s_ease-out]">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted">Menu</span>
              <button onClick={() => setMenuOpen(false)}>
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </div>

            <div className="flex flex-col gap-3 text-sm">
              <Link onClick={() => setMenuOpen(false)} to="/">
                Home
              </Link>
              <Link onClick={() => setMenuOpen(false)} to="/products">
                Products
              </Link>
              <Link onClick={() => setMenuOpen(false)} to="/categories">
                Categories
              </Link>

              <hr className="text-muted" />

              {user && (
                <Link
                  className="flex gap-1"
                  onClick={() => setMenuOpen(false)}
                  to="/me"
                >
                  <img
                    className="rounded-[50%]"
                    src={user?.profilePic || "/placeholder-avatar.jpg"}
                    height={20}
                    width={20}
                  />{" "}
                  {user?.firstName} {user?.lastName || ""}
                </Link>
              )}

              <ThemeDropdown />

              {user?.roles?.includes("Admin") && (
                <Link onClick={() => setMenuOpen(false)} to="/admin">
                  <FontAwesomeIcon icon={faToolbox} /> Admin
                </Link>
              )}

              <button
                onClick={() => {
                  user ? logout() : navi("/login");
                  setMenuOpen(false);
                }}
                className="text-left text-red-500"
              >
                <FontAwesomeIcon icon={faRightToBracket} />
                {user ? " Logout" : " Login"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
