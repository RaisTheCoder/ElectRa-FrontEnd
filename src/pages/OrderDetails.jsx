import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import api from "../api/client";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Helmet } from "react-helmet";

const OrderDetails = () => {
  const { id } = useParams();
  const navi = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const OrderStatus = [
    "Pending",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
  ];

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await api.get(`/orders/${id}`);
        setOrder(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading || !order) {
    return <div className="p-5">Loading...</div>;
  }

  return (
    <section className="flex relative min-h-screen py-10 px-5 justify-center">
      <Helmet>
        <title>Order #{order.id} - ElectRa</title>
      </Helmet>
      <div className="container relative max-w-6xl flex flex-col gap-5">
        <button
          onClick={() => {
            navi("/me");
          }}
          className="w-fit h-8 select-none absolute -top-8 cursor-pointer z-10"
        >
          <FontAwesomeIcon icon={faArrowLeft} /> Go Back
        </button>

        <div className="bg-gray-100 rounded-xl p-5 space-y-2">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold">Order #{order.id}</h1>

            <span className="px-3 py-1 text-sm rounded-full bg-green-100 text-green-700">
              {OrderStatus[order.status]}
            </span>
          </div>

          <p className="text-sm text-gray-500">
            Placed on {new Date(order.createdAt).toLocaleString()}
          </p>

          <p className="text-sm">
            <span className="text-gray-500">Total:</span>{" "}
            <span className="font-bold text-[#0A9ACF]">
              ${order.totalPrice.toFixed(2)}
            </span>
          </p>
        </div>

        <div className="bg-gray-100 rounded-xl p-5 space-y-3">
          <h2 className="font-semibold">Delivery Details</h2>

          <p className="text-sm">
            <span className="text-gray-500">Address:</span> {order.address}
          </p>

          <p className="text-sm">
            <span className="text-gray-500">Phone:</span> {order.phone || "-"}
          </p>

          {order.trackingNumber && (
            <p className="text-sm">
              <span className="text-gray-500">Tracking:</span>{" "}
              {order.trackingNumber}
            </p>
          )}
        </div>

        {order.note && (
          <div className="bg-yellow-50 rounded-xl p-5">
            <h2 className="font-semibold mb-2">Your Note</h2>
            <p className="text-sm text-gray-700">{order.note}</p>
          </div>
        )}

        <div className="bg-gray-100 rounded-xl p-5">
          <h2 className="font-semibold mb-3">Items</h2>

          <div className="space-y-3">
            {order.items.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center border-b pb-2"
              >
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                </div>

                <p className="font-semibold text-[#0A9ACF]">
                  ${item.totalPrice}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderDetails;
