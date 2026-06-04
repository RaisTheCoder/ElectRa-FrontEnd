import React, { useEffect, useState } from "react";
import { Formik, useFormik } from "formik";
import { useNavigate, useParams } from "react-router";
import api from "../../../api/client";

const ProductForm = () => {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [product, setProduct] = useState({});

  const navi = useNavigate();
  const { id } = useParams();

  const {
    values,
    errors,
    handleChange,
    setFieldValue,
    handleSubmit,
    isSubmitting,
  } = useFormik({
    initialValues: {
      title: product.title || `Generic Product`,
      thumbnail: product.thumbnail || "",
      subCategoryId: product?.subCategory?.id || 0,
      brand: product?.brand?.id || 0,
      price: product.price || 1,
      stock: product.stock || 1,
      isFeatured: product.isFeatured || false,
      discountPercentage: product.discountPercentage || 0,
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      const formData = new FormData();

      formData.append("title", values.title);
      formData.append("price", values.price);
      formData.append("subCategoryId", values.subCategoryId);
      formData.append("brandId", values.brand);
      formData.append("stock", values.stock);
      formData.append("isFeatured", values.isFeatured);
      formData.append("discountPercentage", values.discountPercentage);

      if (values.thumbnail instanceof File) {
        formData.append("formFile", values.thumbnail);
      }

      try {
        if (!id) {
          await api.post("/products/add", formData);
        } else {
          await api.post(`/products/${id}`, formData);
        }
      } catch (err) {
        console.log(err.response?.data);
      } finally {
        navi("../products");
        fetch(false);
      }

      console.log(formData);
    },
  });

  useEffect(() => {
    (async () => {
      const res = await api.get("/categories");
      const res2 = await api.get("/brands");

      setCategories(res.data);
      setBrands(res2.data);

      if (id) {
        const res = await api.get(`/products/${id}`);
        setProduct(res.data);
      }

      if (res.data.length > 0) {
        const firstSub = res.data[0].subCategories[0]?.id;
        const firstBrand = res2.data[0]?.id;

        if (!id && firstSub && firstBrand) {
          setFieldValue("subCategoryId", firstSub);
          setFieldValue("brand", firstBrand);
        }
      }
    })();
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <article className="bg-gray-100 rounded-lg">
      <form onSubmit={handleSubmit} className="formStyle">
        <div className="formGroup">
          <label htmlFor="Title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            value={values.title}
            placeholder="Product title..."
            onChange={handleChange}
          />
        </div>

        <div className="formGroup">
          <label htmlFor="Thumbnail">Thumbnail</label>
          <input
            accept="image/png, image/jpeg"
            type="file"
            name="thumbnail"
            onChange={(e) => {
              Math.round(e.target.files[0].size / 1024) >= 2048
                ? null
                : setFieldValue("thumbnail", e.currentTarget.files[0]);
            }}
            id="formFile"
          />
          <p className="text-red-400">{errors.thumbnail}</p>
        </div>

        <div className="formGroup">
          <label htmlFor="subCategoryId">Category</label>
          <select
            value={values.subCategoryId}
            onChange={(e) =>
              setFieldValue("subCategoryId", Number(e.target.value))
            }
            name="subCategoryId"
          >
            {categories.map((cat) => {
              return (
                <optgroup className="text-black" label={cat._Name} key={cat.id}>
                  {cat.subCategories.map((subCat) => {
                    return (
                      <option key={subCat.id} value={+subCat.id}>
                        {subCat._Name}
                      </option>
                    );
                  })}
                </optgroup>
              );
            })}
          </select>
        </div>

        <div className="formGroup">
          <label htmlFor="brand">Brand</label>
          <select
            value={values.brand}
            onChange={(e) => setFieldValue("brand", Number(e.target.value))}
            name="brand"
            id="brand"
          >
            {brands.map((br) => {
              return (
                <option
                  value={+br.id}
                  className="text-black"
                  label={br._Name}
                  key={br.id}
                >
                  {br._Name}
                </option>
              );
            })}
          </select>
        </div>

        <div className="flex grid-cols-2 gap-3">
          <div className="formGroup">
            <label htmlFor="price">Price</label>
            <input
              value={values.price}
              type="number"
              name="price"
              id="price"
              onChange={handleChange}
            />
            <p className="text-red-300">{errors.price}</p>
          </div>
          <div className="formGroup">
            <label htmlFor="stock">Stock</label>
            <input
              value={values.stock}
              type="number"
              name="stock"
              id="stock"
              onChange={handleChange}
              min={1}
            />
            <p className="text-red-300">{errors.stock}</p>
          </div>
          <div className="formGroup">
            <label htmlFor="discountPercentage">Discount %</label>
            <input
              value={values.discountPercentage}
              type="number"
              name="discountPercentage"
              id="stodiscountPercentageck"
              max={100}
              min={0}
              onChange={handleChange}
            />
            <p className="text-red-300">{errors.stock}</p>
          </div>
        </div>

        <div className="formGroup">
          <label htmlFor="isFeatured">Featured?</label>
          <select
            name="isFeatured"
            id="isFeatured"
            value={values.isFeatured}
            onChange={handleChange}
          >
            <option value={false}>No</option>
            <option value={true}>Yes</option>
          </select>
        </div>

        <div className="formGroup grid! grid-cols-2 gap-3">
          <button disabled={isSubmitting} type="submit" className="button">
            Save
          </button>
          <button
            onClick={() => {
              navi("../products");
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

export default ProductForm;
