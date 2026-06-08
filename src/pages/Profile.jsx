import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faEdit,
  faTrash,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { useFormik } from "formik";
import api from "../api/client";
import { useNavigate } from "react-router";
import { Helmet } from "react-helmet";

const Profile = () => {
  const { user, fetchUser } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const navi = useNavigate();
  const [initialized, setInitialized] = useState(false);

  const OrderStatus = [
    "Pending",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
  ];

  const { values, handleChange, handleSubmit, setFieldValue, resetForm } =
    useFormik({
      initialValues: {
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        username: user?.username || "",
        address: user?.address || "",
        phone: user?.phoneNumber || "",
        email: user?.email || "",
        profilePic: "",
        currentPassword: "",
        newPassword: "",
      },
      enableReinitialize: true,

      onSubmit: async (values) => {
        const formData = new FormData();

        formData.append("firstName", values.firstName);
        formData.append("lastName", values.lastName);
        formData.append("username", values.username);
        formData.append("address", values.address);
        formData.append("phoneNumber", values.phone);
        formData.append("email", values.email);

        if (values.profilePic instanceof File) {
          formData.append("formFile", values.profilePic);
        }

        if (values.currentPassword && values.newPassword) {
          formData.append("currentPassword", values.currentPassword);
          formData.append("newPassword", values.newPassword);
        }

        try {
          await api.put("/account/me", formData);
          await fetchUser();
          setEditMode(false);
          setShowPassword(false);
          console.log(formData);
        } catch (err) {
          console.log("Update failed:", err);
        }
      },
    });

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (!user || initialized) return;

    resetForm({
      values: {
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        username: user.username || "",
        address: user.address || "",
        phone: user.phoneNumber || "",
        email: user.email || "",
        profilePic: "",
        currentPassword: "",
        newPassword: "",
      },
    });

    setInitialized(true);
  }, [user]);

  const countRecentVisits = (history) => {
    const cutoff = Date.now() - 86400000;

    let count = 0;

    for (const x of history ?? []) {
      if (new Date(x?.time).getTime() > cutoff) {
        count++;
      }
    }

    return count;
  };

  const cancelEdit = () => {
    setEditMode(false);
    setShowPassword(false);
    resetForm();
  };

  return (
    <section className="min-h-screen py-10 px-5">
      <Helmet>
        <title>{`${user?.firstName + " " + user?.lastName} - ElectRa`}</title>
      </Helmet>
      <div className="container mx-auto flex flex-col gap-8">
        <div className="bg-surface-2 shadow-sm rounded-2xl p-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative">
              <img
                src={
                  values.profilePic
                    ? URL.createObjectURL(values.profilePic)
                    : user?.profilePic || "/placeholder-avatar.jpg"
                }
                className="w-28 h-28 rounded-full object-cover"
              />

              {editMode && (
                <input
                  type="file"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;

                    if (file.size / 1024 < 2048) {
                      setFieldValue("profilePic", file);
                    }
                  }}
                />
              )}
            </div>

            <div className="flex-1 text-center md:text-left">
              {!editMode ? (
                <>
                  <h2 className="text-2xl font-bold">
                    {user?.firstName} {user?.lastName}
                  </h2>

                  <p className="text-muted">@{user?.username}</p>

                  <p className="text-sm text-muted opacity-70 mt-2">
                    {user?.address || "No address added"}
                  </p>
                </>
              ) : (
                <div className="flex flex-col gap-3 formGroup">
                  <input
                    className="input bg-surface!"
                    name="firstName"
                    value={values.firstName}
                    onChange={handleChange}
                    placeholder="First name"
                  />
                  <input
                    className="input bg-surface!"
                    name="lastName"
                    value={values.lastName}
                    onChange={handleChange}
                    placeholder="Last name"
                  />
                  <input
                    className="input bg-surface!"
                    name="username"
                    value={values.username}
                    onChange={handleChange}
                    placeholder="Username"
                  />
                  <input
                    className="input bg-surface!"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    placeholder="Email"
                  />
                  <input
                    className="input bg-surface!"
                    name="address"
                    value={values.address}
                    onChange={handleChange}
                    placeholder="Address"
                  />
                  <input
                    className="input bg-surface!"
                    name="phone"
                    value={values.phone}
                    onChange={handleChange}
                    placeholder="Phone number"
                  />

                  <div className="-t pt-3 mt-2">
                    <button
                      type="button"
                      className="text-sm text-blue-500"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword
                        ? "Hide password fields"
                        : "Change password"}
                    </button>

                    {showPassword && (
                      <div className="flex flex-col gap-2 mt-2">
                        <input
                          className="input bg-surface!"
                          type="password"
                          name="currentPassword"
                          value={values.currentPassword}
                          onChange={handleChange}
                          placeholder="Current password"
                        />
                        <input
                          className="input bg-surface!"
                          type="password"
                          name="newPassword"
                          value={values.newPassword}
                          onChange={handleChange}
                          placeholder="New password"
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 md:flex md:flex-col gap-2">
              {!editMode ? (
                <>
                  <button className="button" onClick={() => setEditMode(true)}>
                    <FontAwesomeIcon icon={faEdit} /> Edit
                  </button>

                  <button
                    className="button bg-red-500 hover:bg-red-600"
                    onClick={() => setShowDelete(true)}
                  >
                    <FontAwesomeIcon icon={faTrash} /> Delete
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="button bg-green-600"
                    onClick={handleSubmit}
                  >
                    <FontAwesomeIcon icon={faCheck} /> Save
                  </button>

                  <button
                    className="button bg-gray-400"
                    type="button"
                    onClick={cancelEdit}
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-surface-2 rounded-2xl p-5">
            <p className="text-muted text-sm">Orders</p>
            <h3 className="text-2xl font-bold">{user?.orders?.length || 0}</h3>
          </div>

          <div className="bg-surface-2 rounded-2xl p-5">
            <p className="text-muted text-sm">Recently Viewed</p>
            <h3 className="text-2xl font-bold">
              {countRecentVisits(user?.history)}
            </h3>
          </div>
        </div>

        <div className="bg-surface-2 rounded-2xl p-6 flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold">Recently Viewed</h3>

            <button
              className="text-sm text-muted hover:text-black"
              onClick={async () => {
                await api.delete("/history/clear");
                fetchUser();
              }}
            >
              Clear
            </button>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-2">
            {user?.history?.length > 0 ? (
              user.history.map((item) => (
                <div
                  key={item.id}
                  className="group relative min-w-[160px] bg-surface  rounded-xl p-3 hover:opacity-80 transition cursor-pointer"
                  onClick={() => navi(`/products/${item?.product?.id}`)}
                >
                  <div className="h-25 bg-white rounded-lg overflow-hidden flex items-center justify-center">
                    <img
                      src={item?.product?.thumbnail}
                      className="h-full object-contain group-hover:scale-105 transition"
                    />
                  </div>

                  <p className="text-sm font-medium mt-2 truncate">
                    {item?.product?.title}
                  </p>

                  <p className="text-sm font-bold mt-1">
                    ${item?.product?.price}
                  </p>

                  <button
                    className="button min-w-10 opacity-100 absolute top-1 right-1 text-muted hover:text-black"
                    onClick={async (e) => {
                      e.stopPropagation();
                      await api.delete(`/history/${item.id}`);
                      fetchUser();
                    }}
                  >
                    <FontAwesomeIcon icon={faX} />
                  </button>
                </div>
              ))
            ) : (
              <h3 className="text-muted">No history yet.</h3>
            )}
          </div>
        </div>

        <div className="bg-surface-2 rounded-2xl p-6 flex flex-col gap-5">
          <h3 className="text-xl font-bold">Order History</h3>

          <div className="flex flex-col gap-4">
            {user?.orders?.length > 0 ? (
              user.orders.map((order) => (
                <div
                  key={order.id}
                  className=" rounded-xl p-4 hover:opacity-80 bg-surface hover:cursor-pointer transition"
                  onClick={() => navi(`orders/${order.id}`)}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-bold">Order #{order.id}</p>
                      <p className="text-sm text-muted">{order.date}</p>
                    </div>

                    <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">
                      {OrderStatus[order?.status]}
                    </span>
                  </div>

                  <div className="mt-3 opacity-70 text-sm text-muted">
                    {order?.items.length}{" "}
                    {order?.items.length > 1 ? "items" : "item"} · $
                    {order.totalPrice}
                  </div>
                </div>
              ))
            ) : (
              <h3 className="text-muted">No orders yet.</h3>
            )}
          </div>
        </div>
      </div>

      {showDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-[350px] space-y-4">
            <h2 className="text-lg font-bold">Delete account?</h2>
            <p className="text-sm text-gray-600">
              This action cannot be undone.
            </p>

            <div className="flex justify-end gap-3">
              <button
                className="px-3 py-2 bg-gray-200 rounded"
                onClick={() => setShowDelete(false)}
              >
                Cancel
              </button>

              <button
                className="px-3 py-2 bg-red-500 text-white rounded"
                onClick={async () => {
                  await api.delete("/account");
                  navi("/");
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Profile;
