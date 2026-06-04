import { useFormik } from "formik";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RegisterSchema } from "../components/Validation/RegisterSchema";
import { Helmet } from "react-helmet";
import api from "../api/client";

const Register = () => {
  const [tos, setTos] = useState(false);

  const navi = useNavigate();

  const { values, errors, handleChange, handleSubmit } = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: async () => {
      try {
        await api.post("/account/register", values);
        navi("/");
      } catch (err) {
        console.log(err.response?.data);
      }

      console.log(values);
    },
    validationSchema: RegisterSchema,
  });

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <Helmet>
        <title>Sign Up - ElectRa</title>
      </Helmet>
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 space-y-6">
        <div className="text-center space-y-1">
          <h3 className="text-2xl font-bold">Register</h3>
          <p className="text-sm text-gray-500">Create your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <input
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={values.firstName}
              onChange={handleChange}
              type="text"
              name="firstName"
              placeholder="First Name"
            />

            <input
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={values.lastName}
              onChange={handleChange}
              type="text"
              name="lastName"
              placeholder="Last Name"
            />
          </div>
          <span className="text-red-500">{errors.firstName}</span>
          <span className="text-red-500">{errors.lastName}</span>

          <input
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={values.username}
            onChange={handleChange}
            type="text"
            name="username"
            placeholder="Username"
          />
          <span className="text-red-500">{errors.username}</span>

          <input
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={values.email}
            onChange={handleChange}
            type="email"
            name="email"
            placeholder="Email Address"
          />
          <span className="text-red-500">{errors.email}</span>

          <input
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={values.phone}
            onChange={handleChange}
            type="text"
            name="phone"
            placeholder="Phone Number"
          />
          <span className="text-red-500">{errors.phone}</span>

          <input
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={values.password}
            onChange={handleChange}
            type="password"
            name="password"
            placeholder="Password"
          />
          <span className="text-red-500">{errors.password}</span>

          <input
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={values.confirmPassword}
            onChange={handleChange}
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
          />
          <span className="text-red-500">{errors.confirmPassword}</span>

          <div className="space-y-3 text-sm text-gray-600">
            <label className="flex gap-2 items-start">
              <input
                type="checkbox"
                id="terms"
                name="terms"
                onChange={(e) => setTos(e.target.checked)}
              />
              <span>
                I agree to the{" "}
                <Link className="text-(--electra-blue)" to="/terms">
                  terms of service
                </Link>
              </span>
            </label>

            <label className="flex gap-2 items-start">
              <input type="checkbox" name="newsletter" />
              <span>I want email updates and offers</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={!tos}
            className={`w-full p-3 rounded-lg transition text-white
          ${tos ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-300 cursor-not-allowed"}`}
          >
            Register
          </button>
        </form>

        <div className="text-center text-sm text-gray-500">
          Already have an account?
          <Link to="/login" className="text-blue-600 ml-1 hover:underline">
            Log in
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Register;
