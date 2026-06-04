import React from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Categories from "./pages/Categories";
import Products from "./pages/Products";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Terms from "./pages/Terms";
import Product from "./pages/Product";

// Admin
import Admin from "./pages/Admin/Admin";
import NotFound from "./pages/NotFound";
import ProductsAdmin from "./pages/Admin/Products-Admin";
import UsersAdmin from "./pages/Admin/Users";
import BrandsAdmin from "./pages/Admin/Brands";
import ReviewsAdmin from "./pages/Admin/Reviews";
import CategoriesAdmin from "./pages/Admin/Categories";
import Dashboard from "./pages/Admin/Dashboard";
import SubCategoriesAdmin from "./pages/Admin/SubCategories";
import OrdersAdmin from "./pages/Admin/Orders";

// Forms
import ProductForm from "./pages/Admin/AddForm/ProductForm";
import CategoryForm from "./pages/Admin/AddForm/CategoryForm";
import SubCategoryForm from "./pages/Admin/AddForm/SubCategoryForm";

// Providers
import { AuthProvider } from "./context/AuthContext";
import { ProductProvider } from "./context/ProductContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { CartProvider } from "./context/CartContext";

// Me
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";
import BrandForm from "./pages/Admin/AddForm/BrandForm";
import AdminRoute from "./pages/Admin/AdminRoute";

import Checkout from "./pages/Checkout";
import OrderForm from "./pages/Admin/AddForm/OrderForm";
import OrderDetails from "./pages/OrderDetails";

const App = () => {
  return (
    <GoogleOAuthProvider clientId="1058825506209-j19iu52b1e03h694ogv30af2cmvjv1hu.apps.googleusercontent.com">
      <AuthProvider>
        <CartProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route path="*" element={<NotFound />} />
                <Route
                  index
                  element={
                    <ProductProvider>
                      <Home />
                    </ProductProvider>
                  }
                />
                <Route path="/categories" element={<Categories />} />
                <Route path="/products">
                  <Route
                    index
                    element={
                      <ProductProvider>
                        <Products />
                      </ProductProvider>
                    }
                  />
                  <Route
                    path=":id"
                    element={
                      <ProductProvider>
                        <Product />
                      </ProductProvider>
                    }
                  />
                  <Route
                    path="by/:category"
                    element={
                      <ProductProvider>
                        <Products />
                      </ProductProvider>
                    }
                  />
                  <Route
                    path="by/:category/:subCategory"
                    element={
                      <ProductProvider>
                        <Products />
                      </ProductProvider>
                    }
                  />
                </Route>
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/terms" element={<Terms />} />

                {/* Me */}
                <Route path="/me" element={<Profile />}>
                  {/* <Route path="orders" element={<Orders />} /> */}
                </Route>

                <Route path="/me/orders/:id" element={<OrderDetails />} />

                <Route path="cart" element={<Cart />} />
                <Route path="checkout" element={<Checkout />} />

                {/* Admin */}
                <Route element={<AdminRoute />}>
                  <Route path="/admin" element={<Admin />}>
                    <Route index element={<Dashboard />} />
                    <Route
                      path="products"
                      element={
                        <ProductProvider>
                          <ProductsAdmin />
                        </ProductProvider>
                      }
                    />
                    <Route path="users" element={<UsersAdmin />} />
                    <Route path="brands" element={<BrandsAdmin />} />
                    <Route path="reviews" element={<ReviewsAdmin />} />
                    <Route path="categories" element={<CategoriesAdmin />} />
                    <Route
                      path="subcategories"
                      element={<SubCategoriesAdmin />}
                    />
                    <Route path="orders" element={<OrdersAdmin />} />

                    {/* Add forms */}
                    <Route path="products/add" element={<ProductForm />} />
                    <Route path="categories/add" element={<CategoryForm />} />
                    <Route
                      path="subcategories/add"
                      element={<SubCategoryForm />}
                    />
                    <Route path="brands/add" element={<BrandForm />} />

                    {/* Details */}
                    <Route path="products/:id" element={<ProductForm />} />
                    <Route path="categories/:id" element={<CategoryForm />} />
                    <Route
                      path="subcategories/:id"
                      element={<SubCategoryForm />}
                    />
                    <Route path="brands/:id" element={<BrandForm />} />
                    <Route path="orders/:id" element={<OrderForm />} />
                  </Route>
                </Route>
              </Route>
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
};

export default App;
