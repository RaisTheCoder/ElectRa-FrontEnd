import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import api from "../../../api/client";
import { useFormik } from "formik";

const BrandForm = () => {
  const [brand, setBrand] = useState();
  const navi = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    (async () => {
      if (id) {
        const res = await api.get(`/brands/${id}`);
        setBrand(res);
      }
    })();
    window.scrollTo(0, 0);
  }, [id]);

  const {
    values,
    errors,
    setFieldValue,
    handleChange,
    handleSubmit,
    isSubmitting,
  } = useFormik({
    initialValues: {
      name: brand?._Name || `Generic Brand`,
      icon: brand?.icon || "",
      enabled: brand?.enabled || true,
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      const formData = new FormData();

      formData.append("_Name", values.name);
      formData.append("enabled", values.enabled);

      if (values.icon instanceof File) {
        formData.append("formFile", values.icon);
      }

      try {
        if (!id) {
          await api.post("/brands/add", formData);
        } else {
          await api.post(`/brands/${id}`, formData);
        }
      } catch (err) {
        console.log(err.response?.data);
      } finally {
        navi("../brands");
      }

      console.log(values);
    },
  });

  return (
    <article className="bg-gray-100 rounded-lg">
      <form onSubmit={handleSubmit} className="formStyle">
        <div className="flex flex-col gap-5">
          <div className="formGroup">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={values.name}
              placeholder="Category title..."
              onChange={handleChange}
            />
            <span className="text-red-400">{errors.name}</span>
          </div>

          <div className="formGroup">
            <label htmlFor="icon">Icon</label>
            <input
              accept="image/png, image/jpeg"
              type="file"
              name="icon"
              onChange={(e) => {
                Math.round(e.target.files[0].size / 1024) >= 2048
                  ? null
                  : setFieldValue("icon", e.currentTarget.files[0]);
              }}
              id="icon"
            />
            <span className="text-red-400">{errors.icon}</span>
          </div>
        </div>

        <div className="formGroup grid! grid-cols-2 gap-3">
          <button disabled={isSubmitting} type="submit" className="button">
            Save
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              navi("../");
            }}
            type="button"
            className="button"
          >
            Cancel
          </button>
        </div>
      </form>
    </article>
  );
};

export default BrandForm;
