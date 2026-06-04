import React, { useEffect, useState } from "react";
import { Formik, useFormik } from "formik";
import { useNavigate, useParams } from "react-router";
import api from "../../../api/client";

const SubCategoryForm = () => {
  const [subCategory, setSubCategory] = useState({});
  const [categories, setCategories] = useState([]);

  const navi = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      const res = await api.get("/categories");
      setCategories(res.data);
      if (id) {
        const res = await api.get(`/subcategories/${id}`);
        setSubCategory(res.data);
      }
    })();
    window.scrollTo(0, 0);
  }, [id]);

  const {
    values,
    errors,
    handleChange,
    setFieldValue,
    handleSubmit,
    isSubmitting,
  } = useFormik({
    initialValues: {
      _Name: subCategory._Name || `Generic Category`,
      slug: subCategory.slug || "generic-category",
      categoryId: subCategory.categoryId || 1,
      icon: "",
      enabled: true,
    },
    enableReinitialize: true,
    onSubmit: async () => {
      const formData = new FormData();

      formData.append("_Name", values._Name);
      formData.append("slug", values.slug);
      formData.append("categoryId", values.categoryId);
      formData.append("enabled", values.enabled);

      if (values.icon instanceof File) {
        formData.append("formFile", values.icon);
      }

      try {
        if (!id) {
          await api.post("/subcategories/add", formData);
        } else {
          await api.post(`/subcategories/${id}`, formData);
        }
      } catch (err) {
        console.log(err.response?.data);
      } finally {
        navi("../subcategories");
      }

      console.log(formData);

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
              id="formFile"
            />
            <span>{errors.Icon}</span>
          </div>

          <div className="formGroup">
            <label htmlFor="categoryId">Category</label>
            <select
              value={values.categoryId}
              onChange={handleChange}
              name="categoryId"
            >
              {categories.map((cat) => {
                return (
                  <option className="text-black" value={cat.id} key={cat.id}>
                    {cat._Name}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        <div className="formGroup grid! grid-cols-2 gap-3">
          <button disabled={isSubmitting} type="submit" className="button">
            Save
          </button>
          <button
            onClick={() => {
              navi("../subcategories");
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

export default SubCategoryForm;
