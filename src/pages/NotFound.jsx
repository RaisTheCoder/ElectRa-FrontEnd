import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center px-6">
      <Helmet>
        <title>Not Found - ElectRa</title>
      </Helmet>
      <h1 className="text-7xl font-bold text-primary">404</h1>

      <p className="text-2xl font-semibold mt-4">Page not found</p>

      <p className="text-muted mt-2 max-w-md">
        The page you’re looking for doesn’t exist, was moved, or you typed the
        URL wrong.
      </p>

      <div className="mt-6 flex gap-4">
        <Link
          to="/"
          className="px-5 py-3 rounded-lg bg-[#0A9ACF] text-white hover:bg-[#087aa3] transition"
        >
          Go Home
        </Link>

        <Link
          to="/products"
          className="px-5 py-3 rounded-lg bg-surface hover:bg-surface-2 transition"
        >
          Browse Products
        </Link>
      </div>

      <div className="mt-10 text-sm text-gray-400">
        ElectRa // lost in the circuit ⚡
      </div>
    </div>
  );
};

export default NotFound;
