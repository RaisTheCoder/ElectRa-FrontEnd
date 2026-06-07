import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router";
import api from "../../../api/client";

const OrderStatus = [
  "Pending",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
];

const OrderForm = () => {
  const [order, setOrder] = useState(null);
  const navi = useNavigate();
  const { id } = useParams();

  const { values, handleChange, handleSubmit, isSubmitting } = useFormik({
    enableReinitialize: true,
    initialValues: {
      status: order?.status || 0,
      trackingNumber: order?.trackingNumber || "",
      adminNote: order?.adminNote || "",
    },
    onSubmit: async () => {
      try {
        await api.put(`/orders/${id}/update`, {
          status: values.status,
          trackingNumber: values.trackingNumber,
          adminNote: values.adminNote,
        });

        navi("../orders");
      } catch (err) {
        console.log(err);
      }
    },
  });

  useEffect(() => {
    (async () => {
      const res = await api.get(`/orders/${id}`);
      setOrder(res.data);
      console.log(res.data);
      
    })();
  }, [id]);

  return (
    <article className="bg-surface rounded-lg p-5">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="formGroup">
          <label>Status</label>
          <select
            name="status"
            value={values.status}
            onChange={handleChange}
            className="w-full p-2 rounded-lg"
          >
            {OrderStatus.map((s, index) => (
              <option key={s} value={index}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div className="formGroup">
          <label>Tracking Number</label>
          <input
            name="trackingNumber"
            value={values.trackingNumber}
            onChange={handleChange}
            className="w-full p-2 rounded-lg"
            placeholder="TRK-12345"
          />
        </div>

        <div className="formGroup">
          <label>Admin Note</label>
          <textarea
            name="adminNote"
            value={values.adminNote}
            onChange={handleChange}
            className="w-full p-2 rounded-lg"
            placeholder="Internal note..."
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button disabled={isSubmitting} type="submit" className="button">
            Save
          </button>

          <button
            type="button"
            onClick={() => navi("../orders")}
            className="button bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </form>
    </article>
  );
};

export default OrderForm;
