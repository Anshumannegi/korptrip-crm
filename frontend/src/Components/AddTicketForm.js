import React, { useState } from "react";
import { handleError, handleSuccess } from "../utils";
import { useNavigate } from "react-router-dom";

const AddTicketForm = () => {
  const [formData, setFormData] = useState({
    query_type: "",
    corporate: "",
    industry: "",
    location: "",
    contact_person: "",
    contact_number: "",
    email_id: "",
    designation: "",
    destination: "",
    travel_type: "",
    date_of_travel: "",
    duration: "",
    number_of_person: "",
    hotel_resort_category: "",
    budget: "",
    remark: "",
    isCompleted: false,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const authState = JSON.parse(localStorage.getItem("authState"));
      if (!authState || !authState?.token) {
        console.log("Auth Token not Found");
        return;
      }
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authState.token}`,
      };
      const response = await fetch("http://localhost:8080/ticket/addTicket", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      const { success, message, error } = result;

      if (success) {
        setFormData({
          query_type: "",
          corporate: "",
          industry: "",
          location: "",
          contact_person: "",
          contact_number: "",
          email_id: "",
          designation: "",
          destination: "",
          travel_type: "",
          date_of_travel: "",
          duration: "",
          number_of_person: "",
          hotel_resort_category: "",
          budget: "",
          remark: "",
          isCompleted: false,
        });
        setTimeout(() => {
          handleSuccess("New Ticket added Successfully");
          navigate("/tickets");
        }, 1000);
      } else {
        handleError(error?.details?.[0]?.message || message);
      }
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div className="flex w-full justify-center items-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-xl">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Query Form
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
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
                      checked={formData.industry === option}
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
                      checked={formData.travel_type === option}
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
                      checked={formData?.duration === option}
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
                      checked={formData?.hotel_resort_category === option}
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
            <div>
              <button
                type="submit"
                className="w-full py-3 bg-red-400 text-white font-semibold rounded-lg hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTicketForm;
