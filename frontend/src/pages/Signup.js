import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";
import { FaPrayingHands } from "react-icons/fa";

const Signup = () => {
  const [signupInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password } = signupInfo;
    if (!name || !email || !password)
      return handleError("All fields are required");

    try {
      const response = await fetch("http://localhost:8080/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signupInfo),
      });

      const result = await response.json();
      const { success, message, error } = result;

      if (success) {
        handleSuccess(message);
        setTimeout(() => navigate("/login"), 1000);
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
        Sign Up
      </h1>

      <div className="flex flex-col lg:flex-row bg-white shadow-xl rounded-lg overflow-hidden w-full max-w-4xl">
        {/* Left Side: Form */}
        <div className="w-full lg:w-2/3 p-6 flex flex-col justify-center">
          <h2 className="text-2xl font-semibold text-gray-700 text-center mb-4 flex items-center justify-center gap-2">
            Namaste <FaPrayingHands />
          </h2>
          <form onSubmit={handleSignup} className="space-y-4">
            <input
              type="text"
              name="name"
              autoFocus
              placeholder="Enter Your Name"
              onChange={handleChange}
              value={signupInfo.name}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
            />
            <input
              type="email"
              name="email"
              placeholder="Enter Your Email"
              onChange={handleChange}
              value={signupInfo.email}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
            />
            <input
              type="password"
              name="password"
              placeholder="Enter Your Password"
              onChange={handleChange}
              value={signupInfo.password}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
            />
            <button className="w-full p-3 bg-red-400 text-white rounded-lg font-semibold hover:bg-red-500 transition">
              Create Account
            </button>
          </form>
          <p className="text-center text-gray-600 mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-red-400 font-semibold">
              Login
            </Link>
          </p>
        </div>

        {/* Right Side: Info (Hidden on Small Screens) */}
        <div className="hidden lg:flex w-1/3 bg-orange-300 text-white p-6 items-center justify-center">
          <p className="text-center">
            Join us and experience the best services. Sign up now!
          </p>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Signup;
