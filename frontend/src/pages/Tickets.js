import { useEffect, useState } from "react";
import { handleError } from "../utils";
import { Link, useNavigate } from "react-router-dom";

const Tickets = () => {
  const [tickets, setTickets] = useState();
  const [search, setSearch] = useState("");
  const [user, setAllUser] = useState([]);
  const navigate = useNavigate();

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

      // sort the tickets
      const sortedTicket = result?.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      console.log(sortedTicket);
      setTickets(sortedTicket);
    } catch (error) {
      handleError(error);
    }
  };

  // const filteredTickets = tickets?.filter((ticket) => {
  //   ticket?.corporate?.toLowerCase()?.includes(search?.toLowerCase())
  // });

  const filteredTickets = tickets?.filter((ticket) => {
    const searchText = search?.toLowerCase();

    return (
      ticket?.corporate?.toLowerCase()?.includes(searchText) ||
      ticket?.query_type?.toLowerCase()?.includes(searchText) ||
      ticket?.email_id?.toLowerCase()?.includes(searchText) ||
      ticket?.destination?.toLowerCase()?.includes(searchText) ||
      ticket?.location?.toLowerCase()?.includes(searchText) ||
      ticket?.contact_person?.toLowerCase()?.includes(searchText) ||
      ticket?.designation?.toLowerCase()?.includes(searchText) ||
      ticket?.isCompleted?.toLowerCase()?.includes(searchText) ||
      ticket?.travel_type?.some((type) =>
        type.toLowerCase().includes(searchText)
      ) ||
      ticket?.industry?.some((ind) => ind.toLowerCase().includes(searchText)) ||
      ticket?.hotel_resort_category?.some((cat) =>
        cat.toLowerCase().includes(searchText)
      ) ||
      ticket?.duration?.some((dur) => dur.toLowerCase().includes(searchText)) ||
      ticket?.budget?.toString().includes(searchText) ||
      ticket?.contact_number?.toString().includes(searchText) ||
      ticket?.number_of_person?.toString().includes(searchText) ||
      ticket?.query_no?.toString().includes(searchText) ||
      ticket?.remark?.toLowerCase()?.includes(searchText) ||
      ticket?.date_of_travel?.toLowerCase()?.includes(searchText) ||
      ticket?.number_of_person?.toString().includes(searchText) ||
      user
        .find((u) => u._id === ticket?.assignedTo)
        ?.name?.toLowerCase()
        ?.includes(searchText)
    );
  });

  const getAllUserDetails = async () => {
    try {
      const url = "http://localhost:8080/user/allUser";
      const authState = JSON.parse(localStorage.getItem("authState"));

      if (!authState.token) {
        console.log("Auth Token not Found");
        return;
      }
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authState?.token}`,
      };

      const response = await fetch(url, {
        method: "GET",
        headers: headers,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log(result);
      setAllUser(result?.data);
    } catch (error) {
      console.log(error);
      handleError(error);
    }
  };

  useEffect(() => {
    getAllUserDetails();
  }, []);

  console.log(filteredTickets);

  const handleTableColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-gray-300";
      case "In Progress":
        return "bg-blue-400";
      case "Completed":
        return "bg-green-400";
      case "On Hold":
        return "bg-yellow-300";
      case "Cancelled":
        return "bg-red-400";
      case "Awaiting Review":
        return "bg-orange-400";
      case "Assigned":
        return "bg-purple-400";
      case "Reopened":
        return "bg-amber-600";
      case "Failed":
        return "bg-red-700";
      case "Deferred":
        return "bg-violet-500";
      default:
        return "bg-gray-200";
    }
  };

  useEffect(() => {
    console.log("UseEffect called");
    getAllTickets();
  }, []);
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Queries</h1>

      {/* Button and Search Bar Container */}
      <div className="flex flex-col md:flex-row md:justify-between items-center gap-2 mb-4">
        <button className="bg-green-600 p-2 font-semibold text-white rounded-md w-full md:w-auto text-center mb-2 md:mb-0">
          <Link to={"/addTicket"}>Add Query</Link>
        </button>

        {/* Search Input */}
        <input
          type="text"
          placeholder="Search by Name..."
          className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 w-full md:w-auto"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* TABLE VIEW (Hidden on Small Screens) */}
      <div className="hidden md:block">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2">Corporate Name</th>
              <th className="border border-gray-300 p-2">Query Type</th>
              <th className="border border-gray-300 p-2">Email</th>
              {/* <th className="border border-gray-300 p-2">Contact Number</th> */}
              <th className="border border-gray-300 p-2">Destination</th>
              <th className="border border-gray-300 p-2">Assign To</th>
              <th className="border border-gray-300 p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredTickets?.map((ticket) => (
              <tr
                key={ticket._id}
                className={`border border-gray-300 cursor-pointer ${handleTableColor(
                  ticket?.isCompleted
                )} hover:bg-gray-200`}
                onClick={() => navigate(`/ticketDetails/${ticket._id}`)}
              >
                <td className="border border-gray-300 p-2 ">
                  {ticket?.corporate}
                </td>
                <td className="border border-gray-300 p-2">
                  {ticket?.query_type}
                </td>
                <td className="border border-gray-300 p-2">
                  {ticket?.email_id}
                </td>
                {/* <td className="border border-gray-300 p-2">
                  {ticket?.contact_number}
                </td> */}
                <td className="border border-gray-300 p-2">
                  {ticket?.destination}
                </td>
                <td className="border border-gray-300 p-2">
                  {/* {ticket?.assignedTo} */}
                  {user.find((u) => u._id === ticket?.assignedTo)?.name}
                </td>
                <td className="border border-gray-300 p-2">
                  {ticket?.isCompleted}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* CARD VIEW (Visible only on Small Screens) */}
      <div className="md:hidden space-y-4">
        {filteredTickets?.map((ticket) => (
          <div
            key={ticket._id}
            className={`border p-4 rounded-lg shadow-md cursor-pointer ${handleTableColor(
              ticket?.isCompleted
            )}`}
            onClick={() => navigate(`/ticketDetails/${ticket._id}`)}
          >
            <p className="text-lg font-semibold">
              Corporate Name: {ticket?.corporate}
            </p>
            <p className="text-lg font-semibold">
              Query Type: {ticket?.query_type}
            </p>
            <p className="text-lg font-semibold">Email: {ticket?.email_id}</p>
            <p className="text-lg font-semibold">
              Contact Number: {ticket?.contact_number}
            </p>
            <p className="text-lg font-semibold">
              Destination: {ticket?.destination}
            </p>
            <p className="text-lg font-semibold">
              Status: {ticket?.isCompleted}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tickets;
