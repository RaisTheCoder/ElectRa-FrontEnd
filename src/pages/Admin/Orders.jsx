import React, { useEffect, useRef, useState } from "react";
import api from "../../api/client";
import { TailSpin } from "react-loader-spinner";
import {
  faEdit,
  faPhotoFilm,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router";

const OrderStatus = [
  "Pending",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
];

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const input = useRef();
  const navi = useNavigate();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await api.get("/orders");
      setOrders(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const filteredOrders = orders.filter((o) => {
    const matchesId = search === "" || o.id.toString().includes(search);

    const matchesStatus =
      statusFilter === "All" || OrderStatus[o.status] === statusFilter;

    return matchesId && matchesStatus;
  });

  const changeStatus = async (id, status) => {
    try {
      await api.put(`/orders/${id}?status=${status}`);

      setOrders((prev) =>
        prev.map((o) => (o.id === id ? { ...o, status } : o)),
      );

      if (selectedOrder?.id === id) {
        setSelectedOrder((prev) => ({
          ...prev,
          status,
        }));
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <article className="flex flex-col gap-5">
      <div className="flex gap-3">
        <input
          ref={input}
          onKeyDown={(e) =>
            e.key == "Enter" ? setSearch(input.current.value) : null
          }
          placeholder="Search by ID..."
          className="w-full bg-surface-2 rounded-lg h-10 px-3"
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 bg-surface-2 rounded-lg h-10"
        >
          <option value="All">All</option>
          {OrderStatus.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        <button
          className="px-3 bg-surface-2 rounded-lg"
          onClick={() => setSearch(input.current.value)}
        >
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl bg-white">
        <table className="app-table transition-opacity duration-500 w-full table-fixed">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">Order</th>
              <th className="p-3">User</th>
              <th className="p-3">Address</th>
              <th className="p-3">Total</th>
              <th className="p-3">Status</th>
              <th className="p-3">Date</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="p-3 font-semibold">#{order.id}</td>

                <td className="p-3">
                  <div className="flex items-center gap-2">
                    <img
                      src={order.user?.profilePic}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium">
                        {order.user?.firstName} {order.user?.lastName}
                      </p>
                      <p className="text-xs text-gray-400">
                        ID: {order.userId}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="p-3 text-muted max-w-45 truncate">
                  {order.address}
                </td>

                <td className="p-3 text-primary font-bold">
                  ${order.totalPrice.toFixed(2)}
                </td>

                <td className="p-3">
                  <select
                    value={order.status || 0}
                    onChange={(e) => changeStatus(order.id, e.target.value)}
                    className="rounded-lg px-2 py-1 text-sm cursor-pointer"
                  >
                    {OrderStatus.map((status, index) => (
                      <option key={status} value={index}>
                        {status}
                      </option>
                    ))}
                  </select>
                </td>

                <td className="p-3 text-gray-500 text-xs">
                  {new Date(order.createdAt).toLocaleString()}
                </td>

                <td className="actions-cell">
                  <div>
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="action-btn"
                    >
                      <FontAwesomeIcon icon={faPhotoFilm} />
                    </button>

                    <button
                      onClick={() => navi(`${order.id}`)}
                      className="action-btn"
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {loading && (
        <div className="flex justify-center py-10">
          <TailSpin height={60} width={60} color="#0A9ACF" />
        </div>
      )}

      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-surface-2 w-105 max-w-[95%] p-5 rounded-xl space-y-3">
            <h2 className="text-lg font-bold">Order #{selectedOrder.id}</h2>

            <div className="text-sm text-muted space-y-1">
              <p>
                <b>User:</b> {selectedOrder.user?.firstName}{" "}
                {selectedOrder.user?.lastName}
              </p>

              <p>
                <b>Tracking Number:</b> {selectedOrder?.trackingNumber || "-"}
              </p>

              <div>
                <b>Items:</b>
                <ul className="relative left-3">
                  {selectedOrder?.items.map((i) => {
                    return (
                      <li>
                        {i.title} - x{i.quantity} - ${i.totalPrice}
                      </li>
                    );
                  })}
                </ul>
              </div>

              <p>
                <b>Address:</b> {selectedOrder.address}
              </p>

              <p>
                <b>Phone:</b> {selectedOrder.phone || "-"}
              </p>

              <p>
                <b>Note:</b> {selectedOrder.note || "-"}
              </p>

              <p>
                <b>Admin Note:</b> {selectedOrder.adminNote || "-"}
              </p>

              <p>
                <b>Status:</b> {OrderStatus[selectedOrder.status]}
              </p>

              <p>
                <b>Points Used:</b> {selectedOrder.pointsUsed.toFixed(2)}
              </p>

              <p>
                <b>Points Earned:</b> {selectedOrder.earnedPoints.toFixed(2)}
              </p>

              <p>
                <b>Points Granted:</b>{" "}
                {selectedOrder.pointsGranted ? "Yes" : "No"}
              </p>

              <p className="text-[#0A9ACF] font-bold">
                Total: ${selectedOrder.totalPrice.toFixed(2)}
              </p>
            </div>

            <div className="flex justify-end pt-3">
              <button
                onClick={() => setSelectedOrder(null)}
                className="px-4 py-2 bg-surface hover:opacity-80 transition rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </article>
  );
};

export default Orders;
