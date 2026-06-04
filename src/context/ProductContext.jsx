import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import api from "../api/client";
import { useParams } from "react-router";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [apiProducts, setApiProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState({});
  const { id } = useParams();
  const [reviews, setReviews] = useState([]);

  const [filters, setFilters] = useState({
    search: "",
    sort: "relevance",
    minPrice: "",
    maxPrice: "",
  });

  const search = useRef("");

  const [skip, setSkip] = useState(0);
  let limit = 16;

  const pushHistory = async (id) => {
    await api.post(`/history/push?productId=${id}`);
  };

  const item = async () => {
    try {
      const res = await api.get(`/products/${id}`);
      setProduct(res.data);
      setReviews(res.data.reviews);
    } catch {
      console.log("Could not get product.");
    } finally {
      setLoading(false);
    }
  };

  const fetch = async (category, subCategory, ignoreDisabled = true) => {
    try {
      let url = `/products?limit=${limit}&skip=${skip}&ignoreDisabled=${ignoreDisabled}`;

      const params = new URLSearchParams();

      if (category) params.append("category", category);
      if (subCategory) params.append("subCategory", subCategory);

      const queryString = params.toString();

      if (queryString) {
        url = `${url}&${queryString}`;
      }

      const res = await api.get(url);

      setApiProducts((prev) =>
        skip === 0 ? res.data : [...prev, ...res.data],
      );

      setProducts((prev) => (skip === 0 ? res.data : [...prev, ...res.data]));
    } catch {
      console.log("Could not get products.");
    } finally {
      setLoading(false);
    }
  };

  const loadMore = async () => {
    setSkip((prev) => prev + limit);
  };

  const remove = async (id) => {
    await api.delete(`/products/${id}`);
    var product = products.findIndex((p) => p.id == id);
    var newProducts = products.splice(product, 1);
    setProduct(newProducts);
  };

  const focusInput = () => {
    search.current.focus();
  };

  const applySearch = () => {
    setFilters((prev) => ({
      ...prev,
      search: search.current.value.trim(),
    }));
  };

  const filteredProducts = useMemo(() => {
    let result = [...apiProducts];

    if (filters.search) {
      result = result.filter((p) =>
        p.title.toLowerCase().includes(filters.search.toLowerCase()),
      );
    }

    if (filters.minPrice) {
      result = result.filter((p) => p.price >= Number(filters.minPrice));
    }

    if (filters.maxPrice) {
      result = result.filter((p) => p.price <= Number(filters.maxPrice));
    }

    if (filters.sort === "low-high") {
      result.sort((a, b) => a.price - b.price);
    }

    if (filters.sort === "high-low") {
      result.sort((a, b) => b.price - a.price);
    }

    if (filters.sort === "newest") {
      result.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    if (filters.sort === "oldest") {
      result.sort((a, b) => new Date(a.date) - new Date(b.date));
    }

    return result;
  }, [apiProducts, filters]);

  const toggleStatus = async (id) => {
    await api.put(`/products/${id}`);

    setApiProducts((prev) =>
      prev.map((p) => (p.id == id ? { ...p, enabled: !p.enabled } : p)),
    );
  };

  return (
    <ProductContext.Provider
      value={{
        fetch,
        loadMore,
        loading,
        product,
        item,
        toggleStatus,
        skip,
        search,
        reviews,
        setReviews,
        setSkip,
        id,
        remove,
        pushHistory,
        filters,
        setFilters,
        applySearch,
        focusInput,
        products: filteredProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);
