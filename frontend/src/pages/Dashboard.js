import { useEffect, useState } from "react";
import PieChart from "../Components/PieChart";

const Dashboard = () => {
  const [tickets, setTickets] = useState([]);

  const [pendingCount, setPendingCount] = useState(0);
  const [inProgressCount, setInProgressCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [onHoldCount, setOnHoldCount] = useState(0);
  const [cancelledCount, setCancelledCount] = useState(0);
  const [awaitingReviewCount, setAwaitingReviewCount] = useState(0);
  const [assignedCount, setAssignedCount] = useState(0);
  const [reopenedCount, setReopenedCount] = useState(0);
  const [failedCount, setFailedCount] = useState(0);
  const [deferredCount, setDeferredCount] = useState(0);

  const getAllTickets = async () => {
    try {
      const url = "http://localhost:8080/ticket/getAllTickets";
      const authState = JSON.parse(localStorage.getItem("authState"));

      if (!authState || !authState?.token) {
        console.log("Auth Token not Found");
        return;
      }

      console.log(authState);
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authState.token}`,
      };

      const response = await fetch(url, {
        method: "GET",
        headers: headers,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json();

      console.log(result?.data);
      setTickets(result?.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllTickets();
  }, []);

  const handleStatusCount = () => {
    setPendingCount(
      tickets.filter((ticket) => ticket?.isCompleted === "Pending").length
    );
    setInProgressCount(
      tickets.filter((ticket) => ticket?.isCompleted === "In Progress").length
    );
    setCompletedCount(
      tickets.filter((ticket) => ticket?.isCompleted === "Completed").length
    );
    setOnHoldCount(
      tickets.filter((ticket) => ticket?.isCompleted === "On Hold").length
    );
    setCancelledCount(
      tickets.filter((ticket) => ticket?.isCompleted === "Cancelled").length
    );
    setAwaitingReviewCount(
      tickets.filter((ticket) => ticket?.isCompleted === "Awaiting Review")
        .length
    );
    setAssignedCount(
      tickets.filter((ticket) => ticket?.isCompleted === "Assigned").length
    );
    setReopenedCount(
      tickets.filter((ticket) => ticket?.isCompleted === "Reopened").length
    );
    setFailedCount(
      tickets.filter((ticket) => ticket?.isCompleted === "Failed").length
    );
    setDeferredCount(
      tickets.filter((ticket) => ticket?.isCompleted === "Deferred").length
    );
  };

  useEffect(() => {
    if (tickets.length > 0) {
      handleStatusCount();
    }
  }, [tickets]);

  return (
    <div className="min-h-screen p-4">
      <div className="text-center text-2xl font-bold mb-6">
        <h1>Dashboard</h1>
      </div>

      {/* Chart Section */}
      <div className="flex justify-center items-center">
        <div className="h-64 sm:h-80 md:h-96 w-full max-w-xs sm:max-w-md md:max-w-lg flex justify-center">
          <PieChart
            pendingCount={pendingCount}
            inProgressCount={inProgressCount}
            completedCount={completedCount}
            onHoldCount={onHoldCount}
            cancelledCount={cancelledCount}
            awaitingReviewCount={awaitingReviewCount}
            assignedCount={assignedCount}
            reopenedCount={reopenedCount}
            failedCount={failedCount}
            deferredCount={deferredCount}
          />
        </div>
      </div>

      {/* Ticket Info Section */}
      <div className="flex flex-col sm:flex-row sm:flex-wrap justify-center items-center sm:gap-16 sm:mt-12 gap-4 mt-6">
        <div className="p-6 sm:p-4 w-full sm:w-auto text-center font-semibold text-xl bg-gray-300 shadow-xl rounded-lg">
          Total Tickets: {tickets.length}
        </div>
        <div
          className="p-6 sm:p-4 w-full sm:w-auto text-center font-semibold text-xl text-gray-600 shadow-xl rounded-lg"
          style={{ backgroundColor: "rgba(209, 213, 219, 0.2)" }}
        >
          Pending: {pendingCount}
        </div>
        <div
          className="p-6 sm:p-4 w-full sm:w-auto text-center font-semibold text-xl text-gray-600 shadow-xl rounded-lg"
          style={{ backgroundColor: "rgba(96, 165, 250, 0.2)" }}
        >
          In Progress: {inProgressCount}
        </div>
        <div
          className="p-6 sm:p-4 w-full sm:w-auto text-center font-semibold text-xl text-gray-600 shadow-xl rounded-lg"
          style={{ backgroundColor: "rgba(74, 222, 128, 0.2)" }}
        >
          Completed: {completedCount}
        </div>
        <div
          className="p-6 sm:p-4 w-full sm:w-auto text-center font-semibold text-xl text-gray-600 shadow-xl rounded-lg"
          style={{ backgroundColor: "rgba(253, 224, 71, 0.2)" }}
        >
          On Hold: {onHoldCount}
        </div>
        <div
          className="p-6 sm:p-4 w-full sm:w-auto text-center font-semibold text-xl text-gray-600 shadow-xl rounded-lg"
          style={{ backgroundColor: "rgba(248, 113, 113, 0.2)" }}
        >
          Cancelled: {cancelledCount}
        </div>
        <div
          className="p-6 sm:p-4 w-full sm:w-auto text-center font-semibold text-xl text-gray-600 shadow-xl rounded-lg"
          style={{ backgroundColor: "rgba(251, 146, 60, 0.2)" }}
        >
          Awaiting Rewiew: {awaitingReviewCount}
        </div>
        <div
          className="p-6 sm:p-4 w-full sm:w-auto text-center font-semibold text-xl text-gray-600 shadow-xl rounded-lg"
          style={{ backgroundColor: "rgba(192, 132, 252, 0.2)" }}
        >
          Assigned: {assignedCount}
        </div>
        <div
          className="p-6 sm:p-4 w-full sm:w-auto text-center font-semibold text-xl text-gray-600 shadow-xl rounded-lg"
          style={{ backgroundColor: "rgba(217, 119, 6, 0.2)" }}
        >
          Reopened: {reopenedCount}
        </div>
        <div
          className="p-6 sm:p-4 w-full sm:w-auto text-center font-semibold text-xl text-gray-600 shadow-xl rounded-lg"
          style={{ backgroundColor: "rgba(185, 28, 28, 0.2)" }}
        >
          Failed: {failedCount}
        </div>
        <div
          className="p-6 sm:p-4 w-full sm:w-auto text-center font-semibold text-xl text-gray-600 shadow-xl rounded-lg"
          style={{ backgroundColor: "rgba(139, 92, 246, 0.2)" }}
        >
          Deferred: {deferredCount}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
