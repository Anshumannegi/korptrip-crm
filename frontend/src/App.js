import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
// import Tickets from "./pages/Tickets";
import InvoiceForm from "./pages/InvoiceForm";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import About from "./Components/About";
import AddTicketForm from "./Components/AddTicketForm";
import TicketDetails from "./Components/TicketDetails";
import AdminProtectedRoute from "./Components/AdminProtectedRoute";
import Unauthorized from "./Components/Unauthorized";
import ProtectedRoute from "./Components/ProtectedRoute";
import RedirectAuthenticated from "./Components/RedirectAuthenticated";
import NotFound from "./Components/NotFound";
import { ToastContainer } from "react-toastify";
import { lazy, Suspense } from "react";
import ShimmerTable from "./Components/ShimmerTable";
import "react-toastify/dist/ReactToastify.css";

// Lazy Loading
const Tickets = lazy(() => import("./pages/Tickets.js"));

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={"/"} element={<Navigate to="/login" />} />
        <Route path={"/home"} element={<Home />} />
        <Route path={"/unauthorized"} element={<Unauthorized />} />

        <Route path={"/about"} element={<About />} />

        {/* Protected Routes for login and Signup  */}
        <Route element={<RedirectAuthenticated />}>
          <Route path={"/login"} element={<Login />} />
          <Route path={"/signup"} element={<Signup />} />
        </Route>

        {/* Protected Routes for Admin  */}
        <Route element={<AdminProtectedRoute />}>
          <Route path={"/dashboard"} element={<Dashboard />} />
        </Route>

        {/* Protected Routes  */}
        <Route element={<ProtectedRoute />}>
          <Route
            path={"/tickets"}
            element={
              <Suspense fallback={<ShimmerTable />}>
                <Tickets />
              </Suspense>
            }
          />
          <Route path={"/invoiceForm"} element={<InvoiceForm />} />
          <Route path={"/addTicket"} element={<AddTicketForm />} />
          <Route path={"/ticketDetails/:id"} element={<TicketDetails />} />
        </Route>

        {/* Default Route  */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
