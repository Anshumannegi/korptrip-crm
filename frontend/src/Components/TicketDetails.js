import { useEffect, useRef, useState } from "react";
import { handleError, handleSuccess } from "../utils";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import SubTicketItem from "./SubTicketItem";

const TicketDetails = () => {
  const { id } = useParams();
  const inputRef = useRef(null);
  const [date, setDate] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [assignQueryTo, setAssignQueryTo] = useState(null);
  const [allUser, setAllUser] = useState([]);
  const [status, setStatus] = useState("");
  const [subTicketDetails, setSubTicketDetails] = useState({});
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const navigate = useNavigate();

  const [ticketDetails, setTicketDetails] = useState();
  const { user, token } = useSelector((store) => store.auth);

  const handleAssignQuery = async (UserId) => {
    try {
      const url = "http://localhost:8080/ticket/assignTicket";
      const authState = JSON.parse(localStorage.getItem("authState"));
      if (!authState.token) {
        console.log("Token not Found");
        return;
      }

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authState?.token}`,
      };

      const body = JSON.stringify({
        ticketId: id,
        UserId: UserId,
      });

      const response = await fetch(url, {
        method: "PUT",
        headers: headers,
        body: body,
      });

      if (!response.ok) {
        throw new Error(`HTTP Error ! Status , ${response?.status}`);
      }

      const result = await response.json();
      console.log(result.message);
      getTicketDetails();
    } catch (error) {
      console.log(error);
      handleError(error);
    }
  };

  const handleAssignChange = (e) => {
    const selectedUser = e.target.value;
    setAssignQueryTo(selectedUser);
    if (selectedUser === "") {
      setAssignQueryTo(null);
      handleAssignQuery(null);
    } else {
      setAssignQueryTo(selectedUser);
      const userId = allUser?.find((user) => user?.name === selectedUser)?._id;
      if (userId) {
        handleAssignQuery(userId);
        console.log(`ticket ${id} assigned to user ${selectedUser}`);
      }
    }
  };

  const handleAssignStatus = async (statusValue) => {
    try {
      const url = "http://localhost:8080/ticket/changeStatus";
      const authState = JSON.parse(localStorage.getItem("authState"));
      if (!authState?.token) {
        console.log("Token not Found");
        return;
      }
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authState?.token}`,
      };

      const userId = allUser.find(
        (user) => user.name === authState?.user?.name
      )?._id;

      const body = JSON.stringify({
        ticketId: id,
        userId,
        statusValue,
      });

      const response = await fetch(url, {
        method: "PUT",
        headers: headers,
        body: body,
      });

      if (!response.ok) {
        throw new Error(`HTTP Error ! Status , ${response?.status}`);
      }

      const result = await response.json();
      // console.log(result.message, "handleAssignStatus");
      // console.log(ticketDetails);
      getTicketDetails();
    } catch (error) {
      console.log(error);
      handleError(error);
    }
  };

  const handleStatusChange = (e) => {
    const statusValue = e.target.value;
    if (statusValue === "") {
      setStatus("Pending");
      handleAssignStatus("Pending");
    } else {
      setStatus(statusValue);
      handleAssignStatus(statusValue);
    }
  };

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

  const getTicketDetails = async () => {
    try {
      const url = `http://localhost:8080/ticket/getTicketDetail/${id}`;
      const authState = JSON.parse(localStorage.getItem("authState"));
      console.log(allUser, "All Users before fetching ticket details");

      if (!authState?.token) {
        console.log("Auth Token not Found");
        return;
      }
      console.log(authState);
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
      const ticket = result?.data;
      if (ticket) {
        const formattedDate = new Date(ticket.date_of_travel)
          .toISOString()
          .split("T")[0];

        setTicketDetails(ticket);
        setDate(formattedDate);

        // Prefill form data
        setFormData({
          query_type: ticket?.query_type,
          corporate: ticket?.corporate,
          industry: ticket?.industry,
          location: ticket?.location,
          contact_person: ticket?.contact_person,
          contact_number: ticket?.contact_number,
          email_id: ticket?.email_id,
          designation: ticket?.designation,
          destination: ticket?.destination,
          travel_type: ticket?.travel_type,
          date_of_travel: date,
          duration: ticket?.duration,
          number_of_person: ticket?.number_of_person,
          hotel_resort_category: ticket?.hotel_resort_category,
          budget: ticket?.budget,
          remark: ticket?.remark,
          isCompleted: ticket?.isCompleted,
          assignedTo: ticket?.assignedTo,
        });

        const userName = allUser?.find(
          (user) => user?._id === ticket?.assignedTo
        )?.name;

        setAssignQueryTo(userName || null);
        // console.log(ticket.isCompleted);
        setStatus(ticket.isCompleted);
      }
    } catch (error) {
      console.log(error);
      handleError(error);
    }
  };

  const getSubTicketDetails = async () => {
    try {
      const url = `http://localhost:8080/ticket/getParticularNLevelSubTicket/${id}`;
      const authState = JSON.parse(localStorage.getItem("authState"));

      if (!authState?.token) {
        console.log("Auth token not found");
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
        throw new Error(`HTTP error ! Status: ${response.status}`);
      }
      const subTickets = await response.json();
      // console.log(subTickets);
      setSubTicketDetails(subTickets);
    } catch (error) {
      console.log(error);
      handleError(error);
    }
  };

  useEffect(() => {
    getTicketDetails();
    getSubTicketDetails();
  }, []);

  useEffect(() => {
    if (showInput && inputRef?.current) {
      inputRef.current.focus();
    }
  }, [showInput]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const url = `http://localhost:8080/ticket/updateTicket/${id}`;
      const authState = JSON.parse(localStorage.getItem("authState"));
      if (!authState || !authState?.token) {
        console.log("Auth token not found");
        return;
      }

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authState?.token}`,
      };

      const response = await fetch(url, {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      console.log(result.data);
      getTicketDetails();
      handleSuccess("Ticket Updated Successfully");
      setIsOpen(false);
    } catch (error) {
      handleError(error);
      console.log(error);
    }
  };

  const handleDeleteTicket = async () => {
    // console.log("Delete");
    try {
      const url = `http://localhost:8080/ticket/deleteTicket/${id}`;
      const authState = JSON.parse(localStorage.getItem("authState"));

      if (!authState || !authState?.token) {
        console.log("Auth token not found");
        return;
      }

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authState?.token}`,
      };

      const response = await fetch(url, {
        method: "DELETE",
        headers: headers,
      });
      const result = await response.json();
      console.log(result);
      handleSuccess("Ticket Deleted Successfully");
      navigate("/tickets");
    } catch (error) {
      handleError(error);
    }
  };

  const addSubTicket = async (parentId, parentType, subTicketText) => {
    try {
      const url = "http://localhost:8080/ticket/addSubTicket";
      const authState = JSON.parse(localStorage.getItem("authState"));
      if (!authState?.token) {
        console.log("Auth token not found");
        return;
      }

      const body = {
        subTicketText,
        parentId,
        parentType,
      };

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authState.token}`,
      };

      const response = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error("Failed to add sub ticket");
      }

      const data = await response.json();
      console.log("SubTicket Added:", data);

      // refresh list
      getSubTicketDetails();
    } catch (error) {
      console.log(error);
      handleError(error);
    }
  };

  return (
    <div className="bg-gray-50 p-8 w-full flex ">
      <div className="w-[70%]">
        <h2 className="text-3xl text-center font-bold text-indigo-600">
          Sub Queries
        </h2>
        <div className="mt-10">
          {!showInput ? (
            <button
              className="bg-indigo-400 py-2 px-4 text-white rounded-lg font-bold my-1"
              onClick={() => setShowInput(true)}
            >
              Add Sub Query
            </button>
          ) : (
            <div className="mt-3 flex gap-2">
              <textarea
                ref={inputRef}
                placeholder="Enter sub-ticket..."
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-1 border rounded-md px-2 py-1 text-sm"
                value={inputValue}
                name="inputValue"
              ></textarea>
              <button
                onClick={() => {
                  if (inputValue.trim()) {
                    addSubTicket(id, "Ticket", inputValue); // 👈 parentType is Ticket here
                    setInputValue("");
                    setShowInput(false);
                  }
                }}
                disabled={!inputValue.trim()}
                className={`px-3 py-1  text-white rounded-md text-sm ${
                  inputValue.trim()
                    ? " bg-green-500 hover:bg-green-600"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                Submit
              </button>
              <button
                onClick={() => {
                  setInputValue("");
                  setShowInput(false);
                }}
                className="px-3 py-1 bg-red-400 text-white rounded-md hover:bg-red-500 text-sm"
              >
                Cancel
              </button>
            </div>
          )}

          {subTicketDetails && subTicketDetails?.children?.length > 0 ? (
            subTicketDetails?.children?.map((subTicket) => (
              <SubTicketItem
                key={subTicket._id}
                subTicket={subTicket}
                addSubTicket={addSubTicket}
                getSubTicketDetails={getSubTicketDetails}
              />
            ))
          ) : (
            <div className="text-gray-500 text-sm italic mt-2">
              No Sub Ticket Data Available
            </div>
          )}
        </div>
      </div>
      {/* max-w-3xl */}
      <div className="w-[30%] mx-auto bg-white p-8 rounded-lg shadow-lg flex flex-col absolute right-0">
        <h1 className="text-4xl font-bold text-center text-indigo-600 mb-8">
          Query Details
        </h1>
        {assignQueryTo && (
          <h3 className=" font-medium text-lg text-green-700 mb-4 sm:text-2xl sm:text-center ">
            Query Assigned to -: {assignQueryTo}
          </h3>
        )}
        {/* Grid Layout for Two Columns */}
        {/* grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 */}
        <div className="">
          {[
            { label: "Query Type", value: ticketDetails?.query_type },
            { label: "Corporate Name", value: ticketDetails?.corporate },
            { label: "Industry", value: ticketDetails?.industry },
            { label: "Location", value: ticketDetails?.location },
            { label: "Contact Person", value: ticketDetails?.contact_person },
            { label: "Contact Number", value: ticketDetails?.contact_number },
            { label: "Email", value: ticketDetails?.email_id },
            { label: "Designation", value: ticketDetails?.designation },
            { label: "Destination", value: ticketDetails?.destination },
            { label: "Travel Type", value: ticketDetails?.travel_type },
            { label: "Date of Travel", value: date },
            { label: "Duration", value: ticketDetails?.duration },
            {
              label: "Number of Person",
              value: ticketDetails?.number_of_person,
            },
            {
              label: "Hotel/Resort Category",
              value: ticketDetails?.hotel_resort_category,
            },
            { label: "Budget", value: ticketDetails?.budget },
            { label: "Remark", value: ticketDetails?.remark },
            // {
            //   label: "Status",
            //   value: ticketDetails?.isCompleted,
            // },
          ].map((field, index) => (
            <div key={index} className="text-lg font-semibold text-gray-700">
              {field.label}:
              <span className="font-normal text-gray-500">
                {" "}
                {field.value || "N/A"}
              </span>
            </div>
          ))}
          <div className="">
            <label
              htmlFor="isCompleted"
              className="text-lg font-semibold text-gray-700 mr-3"
            >
              Status:{" "}
            </label>
            <select
              name="isCompleted"
              id="isCompleted"
              value={status}
              onChange={handleStatusChange}
              disabled={user?.name !== assignQueryTo}
              className="font-normal text-gray-500 border border-black px-3 py-1 rounded-lg"
            >
              {[
                "Pending",
                "In Progress",
                "Completed",
                "OnHold",
                "Cancelled",
                "Awaiting Review",
                "Assigned",
                "Reopened",
                "Failed",
                "Deferred",
              ].map((val, index) => (
                <option value={val} key={index}>
                  {val}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Button Section */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-6">
          <button
            className="py-2 px-10 bg-indigo-600 rounded-lg shadow-lg text-white font-semibold text-lg hover:bg-indigo-500 transition-all"
            onClick={() => setIsOpen(true)}
          >
            Edit Query
          </button>

          {user.isAdmin && (
            <button
              className="py-2 px-10 bg-red-600 rounded-lg shadow-lg text-white font-semibold text-lg hover:bg-red-500 transition-all"
              onClick={handleDeleteTicket}
            >
              Delete Query
            </button>
          )}
        </div>
        {user.isAdmin && (
          <div className="my-6 flex flex-col gap-3 justify-center items-center  sm:flex-row  sm:justify-center">
            <label htmlFor="dropdown" className="font-semibold text-xl">
              Assign Query -:{" "}
            </label>
            <select
              name="dropdown"
              id="dropdown"
              value={assignQueryTo || ""}
              onChange={handleAssignChange}
              className="mx-3 border border-black px-3 py-1 rounded-lg"
            >
              <option value="">None</option>
              {allUser?.map((user) => {
                return (
                  <option key={user._id} value={user.name}>
                    {user.name}
                  </option>
                );
              })}
            </select>
          </div>
        )}
      </div>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full max-h-screen overflow-y-auto">
            <h2 className="text-xl font-bold mb-4 text-center">Edit Query</h2>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Query Type
              </label>
              <div className="flex gap-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="query_type"
                    value="domestic"
                    checked={formData.query_type === "domestic"}
                    onChange={handleChange}
                    className="w-5 h-5 text-red-400 focus:ring-red-500"
                  />
                  <span>Domestic</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="query_type"
                    value="international"
                    checked={formData.query_type === "international"}
                    onChange={handleChange}
                    className="w-5 h-5 text-red-400 focus:ring-red-500"
                  />
                  <span>International</span>
                </label>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Corporate
              </label>
              <input
                type="text"
                name="corporate"
                value={formData?.corporate}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
                placeholder="Enter your Corporate Name"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Industry
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  "pharma",
                  "Ngo",
                  "Manufacturing",
                  "embassy",
                  "IT",
                  "Banking And Finance",
                  "Ministry",
                  "Insurance",
                  "mobile and telecommunication",
                  "marketing",
                  "others",
                ].map((option) => (
                  <label key={option} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="industry"
                      value={option}
                      checked={formData?.industry == option}
                      onChange={handleChange}
                      className="w-5 h-5 text-red-400 focus:ring-red-500"
                    />
                    <span className="capitalize">{option}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData?.location}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
                placeholder="Enter your Location"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Contact Person
              </label>
              <input
                type="text"
                name="contact_person"
                value={formData?.contact_person}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
                placeholder="Enter the Contact Person Name"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Contact Number
              </label>
              <input
                type="number"
                name="contact_number"
                value={formData?.contact_number}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
                placeholder="Enter the Contact Number"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Email
              </label>
              <input
                type="email"
                name="email_id"
                value={formData?.email_id}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
                placeholder="Enter the Email Id"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Designation
              </label>
              <input
                type="text"
                name="designation"
                value={formData?.designation}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
                placeholder="Enter the Designation"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Destination
              </label>
              <input
                type="text"
                name="destination"
                value={formData?.destination}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
                placeholder="Enter the Destination"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Travel Type
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  "Residential Conference",
                  "Corporate event",
                  "tour and event",
                  "tour",
                  "non residential conference",
                  "meeting",
                  "flight only",
                  "others",
                ].map((option) => (
                  <label key={option} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="travel_type"
                      value={option}
                      checked={formData.travel_type == option}
                      onChange={handleChange}
                      className="w-5 h-5 text-red-400 focus:ring-red-500"
                    />
                    <span className="capitalize">{option}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Date of Travel
              </label>
              <input
                type="date"
                name="date_of_travel"
                value={formData?.date_of_travel}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
                placeholder="Enter the Date of Travel"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Duration
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  "1N/2D",
                  "2N/3D",
                  "3N/4D",
                  "4N/5D",
                  "5N/6D",
                  "6N/7D",
                  "7N/8D",
                ].map((option) => (
                  <label key={option} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="duration"
                      value={option}
                      checked={formData?.duration == option}
                      onChange={handleChange}
                      className="w-5 h-5 text-red-400 focus:ring-red-500"
                    />
                    <span className="capitalize">{option}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Number of Person
              </label>
              <input
                type="number"
                name="number_of_person"
                value={formData?.number_of_person}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
                placeholder="Enter the Number of Person"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Hotel/Resort Category
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  "Budget",
                  "Standard",
                  "Luxury",
                  "Resort",
                  "2Star",
                  "3Star",
                  "4Star",
                  "5Star",
                  "Lodge",
                  "Guest House",
                  "Others",
                ].map((option) => (
                  <label key={option} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="hotel_resort_category"
                      value={option}
                      checked={formData?.hotel_resort_category == option}
                      onChange={handleChange}
                      className="w-5 h-5 text-red-400 focus:ring-red-500"
                    />
                    <span className="capitalize">{option}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Budget
              </label>
              <input
                type="number"
                name="budget"
                value={formData?.budget}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
                placeholder="Enter the Budget if Any"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Remark
              </label>
              <input
                type="text"
                name="remark"
                value={formData?.remark}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
                placeholder="Remarks"
              />
            </div>
            {/* Submit Button */}
            <div className="flex justify-end mt-4 space-x-2">
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 bg-gray-300 rounded hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="p-2 bg-indigo-600 text-white rounded hover:bg-indigo-500 transition"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketDetails;
