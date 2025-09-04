import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../utilities/authSlice";
import { handleSuccess } from "../utils";
import { FaBars, FaTimes } from "react-icons/fa"; // Import Icons

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // Sidebar state
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, token } = useSelector((store) => store.auth); // ✅ Use Redux State

  const handleLogout = () => {
    dispatch(logout());
    handleSuccess("User Logged Out Successfully");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  return (
    <>
      {/* NAVBAR FOR LARGE SCREENS */}
      <div className="w-full h-16 border border-solid border-black flex items-center justify-between bg-gray-800 px-6">
        <h1 className="text-2xl font-bold text-white">
          <span className="text-red-400">Korp</span>trip
        </h1>

        {/* Desktop Links */}
        <ul className="hidden md:flex text-white">
          <li className="m-2 p-2 text-lg font-semibold hover:text-red-400">
            <Link to="/home">Home</Link>
          </li>
          {user?.isAdmin && (
            <li className="m-2 p-2 text-lg font-semibold hover:text-red-400">
              <Link to="/dashboard">Dashboard</Link>
            </li>
          )}
          <li className="m-2 p-2 text-lg font-semibold hover:text-red-400">
            <Link to="/tickets">Tickets</Link>
          </li>
          <li className="m-2 p-2 text-lg font-semibold hover:text-red-400">
            <Link to="/invoiceForm">Invoice Generation</Link>
          </li>
          {token ? (
            <li
              className="m-2 p-2 text-lg font-semibold hover:text-red-400 cursor-pointer"
              onClick={handleLogout}
            >
              Logout
            </li>
          ) : (
            <>
              <li className="m-2 p-2 text-lg font-semibold hover:text-red-400">
                <Link to="/login">Login</Link>
              </li>
              <li className="m-2 p-2 text-lg font-semibold hover:text-red-400">
                <Link to="/signup">Signup</Link>
              </li>
            </>
          )}
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* MOBILE SIDEBAR */}
      <div
        className={`fixed top-0 left-0 w-64 h-full bg-gray-900 text-white z-50 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-2xl"
          onClick={() => setIsOpen(false)}
        >
          <FaTimes />
        </button>

        <ul className="mt-16 flex flex-col items-start p-6 space-y-4">
          <li className="text-lg font-semibold hover:text-red-400">
            <Link to="/home" onClick={() => setIsOpen(false)}>
              Home
            </Link>
          </li>
          <li className="text-lg font-semibold hover:text-red-400">
            <Link to="/dashboard" onClick={() => setIsOpen(false)}>
              Dashboard
            </Link>
          </li>
          <li className="text-lg font-semibold hover:text-red-400">
            <Link to="/tickets" onClick={() => setIsOpen(false)}>
              Tickets
            </Link>
          </li>
          <li className="text-lg font-semibold hover:text-red-400">
            <Link to="/invoiceForm" onClick={() => setIsOpen(false)}>
              Invoice Generation
            </Link>
          </li>
          {token ? (
            <li
              className="text-lg font-semibold hover:text-red-400 cursor-pointer"
              onClick={() => {
                handleLogout();
                setIsOpen(false);
              }}
            >
              Logout
            </li>
          ) : (
            <>
              <li className="text-lg font-semibold hover:text-red-400">
                <Link to="/login" onClick={() => setIsOpen(false)}>
                  Login
                </Link>
              </li>
              <li className="text-lg font-semibold hover:text-red-400">
                <Link to="/signup" onClick={() => setIsOpen(false)}>
                  Signup
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>

      {/* Overlay when sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Navbar;
