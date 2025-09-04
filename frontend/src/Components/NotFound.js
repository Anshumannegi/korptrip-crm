import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <h1 className="text-7xl sm:text-8xl font-bold text-red-500">404</h1>
      <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mt-2 text-center">
        Page Not Found
      </h2>
      <p className="text-base sm:text-lg text-gray-600 mt-2 text-center max-w-md">
        Sorry, the page you are looking for does not exist. It might have been
        moved or deleted.
      </p>
      <Link
        to="/login"
        className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 text-sm sm:text-base"
      >
        Go to Login Page
      </Link>
    </div>
  );
};

export default NotFound;
