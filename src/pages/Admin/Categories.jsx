/* eslint-disable react-hooks/set-state-in-effect */
import {
  faCheck,
  faPencil,
  faSearch,
  faTrash,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { useNavigate } from "react-router";
import api from "../../api/client";

const Categories = () => {
  let limit = 10;
  const [skip, setSkip] = useState(0);
  const [apiCategories, setApiCategories] = useState([]);
  const [Categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const search = useRef("");

  const navi = useNavigate();

  const focusInput = () => {
    search.current.focus();
  };

  const getCategories = async () => {
    setLoading(true);

    const res = await api.get(
      `/Categories?limit=${limit}&skip=${skip}&ignoreDisabled=false`,
    );

    setApiCategories((prev) =>
      skip === 0 ? res.data : [...prev, ...res.data],
    );
    setCategories((prev) => (skip === 0 ? res.data : [...prev, ...res.data]));

    setLoading(false);
  };

  const filterCategories = () => {
    if (search.current.value != "") {
      const temp = Categories.filter((c) =>
        c._Name.toLowerCase().includes(search.current.value.toLowerCase()),
      );
      return setCategories(temp);
    }
    return setCategories(apiCategories);
  };

  const toggleStatus = async (id) => {
    await api.put(`/Categories/${id}`);

    setCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, enabled: !c.enabled } : c)),
    );
  };

  const remove = async (id) => {
    api.delete(`/categories/${id}`);
    getCategories();
  };

  const loadMore = () => {
    setSkip((c) => c + limit);
  };

  useEffect(() => {
    getCategories();
    setLoading(Categories == [] ? true : false);
  }, [skip]);

  console.log(Categories);

  return (
    <article className="flex gap-5 flex-col bg-transparent">
      <button className="button" onClick={() => navi("./add")}>
        Add Category
      </button>

      <div className="flex gap-5">
        <input
          type="text"
          className="w-full bg-surface-2 rounded-lg h-10 p-5"
          placeholder="Search..."
          ref={search}
          onClick={() => focusInput()}
          onKeyDown={(e) => {
            if (e.key == "Enter") filterCategories();
          }}
        />
        <button
          className="p-2 px-3 rounded-lg cursor-pointer bg-surface-2"
          onClick={() => filterCategories()}
        >
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl bg-white">
        <table className="app-table transition-opacity duration-500 w-full table-fixed">
          <thead>
            <tr>
              <th>Name</th>
              <th>Slug</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {Categories.map((category) => (
              <tr key={category.id}>
                <td>
                  <div className="flex flex-col min-w-0">
                    <p className="truncate">{category._Name}</p>
                    <p className="text-xs text-gray-500 truncate">
                      ID: {category.id}
                    </p>
                  </div>
                </td>

                <td className="truncate">{category.slug}</td>

                <td>
                  <span
                    className={`inline-flex items-center text-xs font-medium ${
                      !category.enabled ? "text-red-500" : "text-emerald-500"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full mr-2 ${
                        !category.enabled ? "bg-red-500" : "bg-emerald-500"
                      }`}
                    />
                    {category.enabled ? "Enabled" : "Disabled"}
                  </span>
                </td>

                <td className="actions-cell">
                  <div>
                    <button
                      onClick={() => navi(`${category.id}`)}
                      className="action-btn"
                    >
                      <FontAwesomeIcon icon={faPencil} />
                    </button>

                    <button
                      onClick={() => toggleStatus(category.id)}
                      className="action-btn"
                    >
                      <FontAwesomeIcon
                        icon={category.enabled ? faX : faCheck}
                      />
                    </button>

                    <button
                      onClick={() => remove(category.id)}
                      className="action-btn"
                    >
                      <FontAwesomeIcon icon={faTrash} />
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

      <button
        onClick={() => {
          loadMore();
        }}
        className={`${Categories.length >= 10 ? "block" : "hidden"} w-fit px-3 p-1 bg-gray-300 rounded-lg cursor-pointer self-center`}
      >
        Load More
      </button>
    </article>
  );
};

export default Categories;
