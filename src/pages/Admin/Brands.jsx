import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faPencil,
  faPhotoFilm,
  faSearch,
  faTrash,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { TailSpin } from "react-loader-spinner";
import { useNavigate } from "react-router";
import api from "../../api/client";

const Brands = () => {
  let limit = 10;
  const [skip, setSkip] = useState(0);
  const [apiBrands, setApiBrands] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  const search = useRef("");

  const navi = useNavigate();

  const focusInput = () => {
    search.current.focus();
  };

  const getBrands = async () => {
    setSkip(skip + limit);
    const res = await api.get(
      `/brands?limit=${limit}&skip=${skip}&ignoreDisabled=false`,
    );

    const temp = [];
    res.data.forEach((cat) => {
      temp.push(cat);
    });
    const result = [...brands, ...temp];

    setApiBrands(result);
    setBrands(result);
    if (search.current.value.trim() != "") {
      filterBrands(apiBrands);
    }
  };

  const filterBrands = () => {
    if (search.current.value != "") {
      const temp = apiBrands.filter((b) =>
        b._Name.toLowerCase().includes(search.current.value.toLowerCase()),
      );
      setBrands(temp);
    } else {
      setBrands(apiBrands);
    }
  };

  const toggleStatus = async (id) => {
    await api.put(`/brands/${id}`);
    setBrands((prev) =>
      prev.map((b) => (b.id === id ? { ...b, enabled: !b.enabled } : b)),
    );
  };

  const remove = async (id) => {
    await api.delete(`/brands/${id}`);
    setBrands(brands.filter((b) => b.id != id));
  };

  useEffect(() => {
    getBrands();
    setLoading(brands == [] ? true : false);
    window.scrollTo(0, 0);
  }, []);

  return (
    <article className="flex gap-5 flex-col bg-transparent">
      <button onClick={() => navi("add")} className="button">
        Add Brand
      </button>

      <div className="flex gap-5">
        <input
          type="text"
          className="w-full bg-gray-200 rounded-lg h-10 p-5"
          placeholder="Search..."
          ref={search}
          onClick={() => focusInput()}
          onKeyDown={(e) => {
            if (e.key == "Enter") filterBrands();
          }}
        />
        <button
          className="p-2 px-3 rounded-lg cursor-pointer bg-gray-200"
          onClick={() => filterBrands()}
        >
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>

      {loading && (
        <div className="flex justify-center py-10">
          <TailSpin height={60} width={60} color="#0A9ACF" />
        </div>
      )}

      <div className="overflow-x-auto rounded-xl bg-white">
        <table
          className={`${loading ? "opacity-0" : "opacity-100"} app-table transition-opacity duration-500 w-full table-fixed`}
        >
          <thead>
            <tr>
              <td>Brand</td>
              <td>Status</td>
              <td className="actions-cell">Actions</td>
            </tr>
          </thead>
          <tbody>
            {brands.map((brand) => {
              return (
                <tr key={brand.id}>
                  <td>
                    <img
                      className="product-thumb"
                      src={brand.icon}
                      alt={brand._Name}
                    />

                    <div>
                      <p>{brand._Name}</p>
                      <p className="text-xs text-gray-400">ID: {brand.id}</p>
                    </div>
                  </td>

                  <td>
                    <span
                      className={`inline-flex items-center text-xs font-medium ${
                        !brand.enabled ? "text-red-500" : "text-emerald-500"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full mr-2 ${
                          !brand.enabled ? "bg-red-500" : "bg-emerald-500"
                        }`}
                      />
                      {brand.enabled ? "Enabled" : "Disabled"}
                    </span>
                  </td>

                  <td className="actions-cell">
                    <div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navi(`${brand.id}`);
                        }}
                        className="action-btn"
                      >
                        <FontAwesomeIcon icon={faPencil} />
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleStatus(brand.id);
                        }}
                        className="action-btn"
                      >
                        <FontAwesomeIcon icon={brand.enabled ? faX : faCheck} />
                      </button>

                      <button
                        onClick={() => remove(brand.enablct.id)}
                        className="action-btn"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </article>
  );
};

export default Brands;
