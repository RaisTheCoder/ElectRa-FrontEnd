import { useFormik } from "formik";
import React from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import api from "../api/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Helmet } from "react-helmet";
import { GoogleLogin } from "@react-oauth/google";
import { useTheme } from "../context/ThemeContext";

const Login = () => {
  const navi = useNavigate();

  const { login } = useAuth();
  const { resolvedTheme } = useTheme();

  const { values, errors, handleChange, handleSubmit } = useFormik({
    initialValues: {
      username: "",
      password: "",
    },

    onSubmit: async (values) => {
      await login(values);
      navi("/");
    },
  });

  const { fetchUser } = useAuth();

  const handleGoogle = async (credentialResponse) => {
    await api.post("/account/google", {
      token: credentialResponse.credential,
    });

    await fetchUser();
    navi("/");
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4">
      <Helmet>
        <title>Sign In - ElectRa</title>
      </Helmet>
      <div className="w-full max-w-md bg-surface rounded-2xl shadow-lg p-8 space-y-6">
        <div className="text-center space-y-1">
          <h3 className="text-2xl font-bold">Welcome back</h3>
          <p className="text-sm text-gray-500">Log in to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <input
              className="w-full border border-border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary"
              value={values.username}
              onChange={handleChange}
              type="text"
              name="username"
              placeholder="Username"
            />
            {errors.username && (
              <span className="text-sm text-red-500">{errors.username}</span>
            )}
          </div>

          <div className="space-y-2">
            <input
              className="w-full border border-border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary"
              value={values.password}
              onChange={handleChange}
              type="password"
              name="password"
              placeholder="Password"
            />
            {errors.password && (
              <span className="text-sm text-red-500">{errors.password}</span>
            )}
          </div>

          <button
            type="submit"
            className="w-full button primary text-white p-3! rounded-lg transition"
          >
            Log In
          </button>

          <div className="grid grid-cols1">
            <GoogleLogin
              onSuccess={handleGoogle}
              theme={resolvedTheme === "dark" ? "filled_black" : "outline"}
              size="large"
              shape="rectangular"
              text="signin_with"
              logo_alignment="left"
              onError={() => console.log("Google login failed")}
              buttonText="Login"
            />
          </div>
        </form>

        <div className="text-center text-sm text-gray-500">
          Don’t have an account?
          <Link to="/register" className="text-primary ml-1 hover:underline">
            Create one
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Login;
