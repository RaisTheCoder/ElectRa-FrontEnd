import React, { useEffect, useState } from "react";
import { Formik, useFormik } from "formik";
import { useNavigate, useParams } from "react-router";
import api from "../../../api/client";

const CategoryForm = () => {
  const [Category, setCategory] = useState({});

  const navi = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      if (id) {
        const res = await api.get(`/categories/${id}`);
        setCategory(res.data);
        console.log(res.data);
        
      }
    })();
    window.scrollTo(0, 0);
  }, [id]);

  const { values, errors, handleChange, handleSubmit, isSubmitting } =
    useFormik({
      initialValues: {
        _Name: Category._Name || `Generic Category`,
        slug: Category.slug || "generic-category",
        enabled: true,
      },
      enableReinitialize: true,
      onSubmit: async () => {
        try {
          if (!id) {
            await api.post("/categories/add", values);
          } else {
            await api.post(`/categories/${id}`, values);
          }
        } catch (err) {
          console.log(err.response?.data);
        } finally {
          navi("../categories");
        }

        console.log(values);
      },
    });

  return (
    <article className="bg-gray-100 rounded-lg">
      <form onSubmit={handleSubmit} className="formStyle">
        <div className="flex flex-col gap-5">
          <div className="formGroup">
            <label htmlFor="_Name">Name</label>
            <input
              type="text"
              name="_Name"
              id="title"
              value={values._Name}
              placeholder="Category title..."
              onChange={handleChange}
            />
            <span className="text-red-400">{errors._Name}</span>
          </div>

          <div className="formGroup">
            <label htmlFor="slug">Slug</label>
            <input
              type="text"
              name="slug"
              id="title"
              value={values.slug}
              placeholder="Category title..."
              onChange={handleChange}
            />
            <span className="text-red-400">{errors.slug}</span>
          </div>
        </div>

        <div className="formGroup grid! grid-cols-2 gap-3">
          <button disabled={isSubmitting} type="submit" className="button">
            Save
          </button>
          <button
            onClick={() => {
              navi("../categories");
            }}
            className="button"
          >
            Cancel
          </button>
        </div>
      </form>
    </article>
  );
};

export default CategoryForm;
