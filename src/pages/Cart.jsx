import React from "react";
import { useNavigate } from "react-router";
import { useCart } from "../context/CartContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const Cart = () => {
  const navi = useNavigate();

  const { validatedCart, addItem, removeItem, totalPrice, clearCart } =
    useCart();

  return (
    <section className="min-h-screen py-10">
      <div className="container mx-auto flex flex-col gap-5">
        <div className="flex flex-col lg:flex-row gap-10 items-stretch lg:items-start">
          <div className="flex-1 flex flex-col gap-3 px-8 sm:px-0">
            {validatedCart.length ? (
              validatedCart.map((item) => (
                <div
                  key={item.productId}
                  className="hover:border-[#0A9ACF] border-transparent border bg-gray-100 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-0 cursor-pointer hover:bg-gray-200 transition"
                  onClick={() => navi(`/products/${item.productId}`)}
                >
                  <div className="flex items-center gap-4 sm:gap-5">
                    <div className="h-16 w-16 sm:h-25 sm:w-25 border rounded-lg overflow-hidden shrink-0">
                      <img
                        className="h-full w-full object-contain bg-white"
                        src={item.thumbnail}
                        alt={item.title}
                      />
                    </div>

                    <h5 className="font-medium text-sm sm:text-base line-clamp-2">
                      {item.title}
                    </h5>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-3 sm:gap-5">
                    <p className="font-bold text-sm sm:text-base">
                      ${item.price * item.quantity}
                    </p>

                    <div className="flex items-center gap-2 sm:gap-3">
                      <button
                        className="button py-0!"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeItem(item.productId);
                        }}
                      >
                        -
                      </button>

                      <p className="font-bold px-3 sm:px-5">{item.quantity}</p>

                      <button
                        className="button py-0! px-1!"
                        onClick={(e) => {
                          e.stopPropagation();
                          addItem(item.productId);
                        }}
                      >
                        +
                      </button>

                      <button
                        className="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeItem(item.productId, true);
                        }}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <h3 className="text-3xl self-center text-gray-400">
                No items in cart currently.
              </h3>
            )}
          </div>

          <div
            className="
            fixed bottom-0 left-0 right-0
            lg:sticky lg:top-10 lg:w-80
            bg-gray-200 p-5 z-50
            lg:rounded-xl
          "
          >
            <p className="font-bold">Total Price: ${totalPrice.toFixed(2)}</p>

            <hr className="my-3 text-gray-400" />

            <span className="text-gray-500 text-sm">
              No Discounts Applied - Free Delivery
            </span>

            <button
              className="button primary w-full mt-5"
              onClick={() => navi("/checkout")}
            >
              Checkout
            </button>

            <button
              onClick={() => {
                clearCart();
              }}
              className="button w-full mt-2 bg-red-500 text-white"
            >
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
