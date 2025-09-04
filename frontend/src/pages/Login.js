import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";
import { useDispatch } from "react-redux";
import { login } from "../utilities/authSlice";
import { FaPrayingHands } from "react-icons/fa";

const Login = () => {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;
    if (!email || !password) return handleError("Credentials are required");

    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginInfo),
      });

      const result = await response.json();
      const { success, message, jwtToken, name, error, isAdmin } = result;

      if (success) {
        handleSuccess(message);
        const userData = { user: { name, email, isAdmin }, token: jwtToken };
        dispatch(login(userData)); // ✅ Store in Redux
        localStorage.setItem("authState", JSON.stringify(userData));

        setTimeout(() => navigate("/home"), 1000);
      } else {
        handleError(error?.details?.[0]?.message || message);
      }
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-gray-100 p-6">
      <h1 className="text-center mb-8 text-4xl font-bold text-gray-800">
        Login
      </h1>

      <div className="flex flex-col lg:flex-row bg-white shadow-xl rounded-lg overflow-hidden w-full max-w-4xl">
        {/* Left Side: Form */}
        <div className="w-full lg:w-2/3 p-6 flex flex-col justify-center">
          <h2 className="text-2xl font-semibold text-gray-700 text-center mb-4 flex items-center justify-center gap-2">
            Namaste <FaPrayingHands />
          </h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Enter Your Email"
              onChange={handleChange}
              value={loginInfo.email}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
            />
            <input
              type="password"
              name="password"
              placeholder="Enter Your Password"
              onChange={handleChange}
              value={loginInfo.password}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
            />
            <button className="w-full p-3 bg-red-400 text-white rounded-lg font-semibold hover:bg-red-500 transition">
              Login
            </button>
          </form>
          <p className="text-center text-gray-600 mt-4">
            Don't have an account?{" "}
            <Link to="/signup" className="text-red-400 font-semibold">
              Register
            </Link>
          </p>
        </div>

        {/* Right Side: Info (Hidden on Small Screens) */}
        <div className="hidden lg:flex w-1/3 bg-orange-300 text-white p-6 items-center justify-center">
          <p className="text-center">
            Welcome back! Access your account and continue your journey with us.
            Login now!
          </p>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Login;
