import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useCart } from "../context/CartContext";
import api from "../api/client";
import { CheckoutSchema } from "../components/Validation/CheckoutSchema";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";
import { Helmet } from "react-helmet";

const Checkout = () => {
  const {
    cart,
    totalItems,
    totalPrice,
    getCheckoutPayload,
    clearCart,
    validatedCart,
  } = useCart();

  const { user, fetchUser } = useAuth();
  const navi = useNavigate();

  const [usePoints, setUsePoints] = useState(false);
  const [usedPoints, setUsedPoints] = useState(0);

  const maxUsablePoints = Math.min(
    Math.floor(totalPrice * 0.15),
    user?.rewardPoints || 0,
  );

  const handleTogglePoints = (checked) => {
    setUsePoints(checked);

    if (checked) {
      setUsedPoints(maxUsablePoints);
    } else {
      setUsedPoints(0);
    }
  };

  const handlePointsChange = (value) => {
    let val = Number(value);

    if (val < 0) val = 0;
    if (val > maxUsablePoints) val = maxUsablePoints;
    if (val > user?.rewardPoints) val = user?.rewardPoints;

    setUsedPoints(val);
  };

  useEffect(() => {
    if (usePoints) {
      const max = Math.floor(totalPrice * 0.15);
      const capped = Math.min(max, user?.rewardPoints);
      setUsedPoints(capped);
    } else {
      setUsedPoints(0);
    }
  }, [usePoints, totalPrice, user?.rewardPoints]);

  const formik = useFormik({
    initialValues: {
      address: user?.address || "",
      phone: user?.phone || "",
      note: "",
    },
    validationSchema: CheckoutSchema,
    onSubmit: async (values) => {
      if (!cart.length) return;

      try {
        await api.post("/orders/checkout", {
          items: getCheckoutPayload(),
          address: values.address,
          phone: values.phone,
          note: values.note,
          usedPoints: usedPoints,
        });

        clearCart();
        if (!alert("Checkout Successful")) navi("/");
      } catch (err) {
        console.error(err);
        alert("Checkout failed");
      }
    },
  });

  if (!cart.length) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Your cart is empty
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gray-100 flex justify-center p-4">
      <Helmet>
        <title>Checkout - ElectRa</title>
      </Helmet>
      <div className="w-full max-w-5xl grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow p-6 space-y-4">
          <h2 className="text-xl font-bold">Your Cart</h2>

          <div className="space-y-3">
            {validatedCart.map((item) => (
              <div
                key={item.productId}
                className="flex justify-between border-b pb-2 text-sm"
              >
                <div>
                  <p className="font-semibold">{item.title}</p>
                  <p className="text-gray-500">x{item.quantity}</p>
                </div>

                <div className="text-right">
                  <p className="text-[#0A9ACF] font-bold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>

                  {!item.available && (
                    <p className="text-red-500 text-xs">Unavailable</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t space-y-1">
            <p>Items: {totalItems}</p>

            <p className="text-lg font-bold text-[#0A9ACF]">
              Total: ${(totalPrice - usedPoints).toFixed(2)}
            </p>
          </div>

          <div className="space-y-3 pt-4 border-t">
            <label className="flex items-center gap-2 text-sm font-medium">
              <input
                type="checkbox"
                checked={usePoints}
                onChange={(e) => handleTogglePoints(e.target.checked)}
              />
              Use reward points
            </label>

            {usePoints && (
              <div className="space-y-2 text-sm">
                <p className="text-gray-500">
                  Available: {user?.rewardPoints} points
                </p>

                <p className="text-gray-500">
                  Max usable: {maxUsablePoints} points (15% out of Total Price)
                </p>

                <input
                  type="number"
                  value={usedPoints}
                  onChange={(e) => handlePointsChange(e.target.value)}
                  className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-[#0A9ACF] outline-none"
                />

                <p className="text-[#0A9ACF] font-semibold">
                  Discount: ${usedPoints}
                </p>
              </div>
            )}
          </div>
        </div>

        <form
          onSubmit={formik.handleSubmit}
          className="bg-white rounded-xl shadow p-6 space-y-4"
        >
          <h2 className="text-xl font-bold">Shipping Info</h2>

          <input
            name="address"
            value={formik.values.address}
            onChange={formik.handleChange}
            className="w-full border p-3 rounded-lg"
            placeholder="Address"
          />

          <input
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            className="w-full border p-3 rounded-lg"
            placeholder="Phone"
          />

          <textarea
            name="note"
            value={formik.values.note}
            onChange={formik.handleChange}
            className="w-full border p-3 rounded-lg"
            placeholder="Note"
          />

          <h3 className="font-semibold text-gray-700">Payment Info</h3>

          <input
            name="cardNumber"
            value={formik.values.cardNumber}
            onChange={formik.handleChange}
            className="w-full border p-3 rounded-lg"
            placeholder="Card Number"
          />

          <div className="grid grid-cols-2 gap-3">
            <input
              name="expiry"
              value={formik.values.expiry}
              onChange={formik.handleChange}
              className="w-full border p-3 rounded-lg"
              placeholder="MM/YY"
            />

            <input
              name="cvc"
              value={formik.values.cvc}
              onChange={formik.handleChange}
              className="w-full border p-3 rounded-lg"
              placeholder="CVC"
            />
          </div>

          <input
            name="cardName"
            value={formik.values.cardName}
            onChange={formik.handleChange}
            className="w-full border p-3 rounded-lg"
            placeholder="Name on card"
          />

          <button
            type="submit"
            className="w-full bg-[#0A9ACF] text-white p-3 rounded-lg"
          >
            Place Order
          </button>
        </form>
      </div>
    </section>
  );
};

export default Checkout;
