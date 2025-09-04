import React, { useEffect, useState, useRef } from "react";
import { handleError } from "../utils";
import { useParams } from "react-router-dom";

const SubTicketItem = ({
  subTicket,
  addSubTicket,
  getSubTicketDetails,
  level = 0,
}) => {
  const { id } = useParams();
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [children, setChildren] = useState(subTicket?.children || []);
  const [isEditing, setIsEditing] = useState(false);
  const [originalValue, setOriginalValue] = useState("");
  const inputRef = useRef(null);
  const textAreaRef = useRef(null);

  useEffect(() => {
    setChildren(subTicket?.children || []);
  }, [subTicket?.children]);

  // close Texbox when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setShowInput(false);
      }
    };

    if (showInput) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showInput]);

  useEffect(() => {
    if (showInput && textAreaRef?.current) textAreaRef.current.focus();
  }, [showInput]);

  const deleteSubTicket = async () => {
    try {
      const query = new URLSearchParams({
        parentId: subTicket?.parentId,
        parentType: level === 0 ? "Ticket" : "SubTicket",
        subTicketId: subTicket?._id,
      });

      const url = `http://localhost:8080/ticket/deleteSubTicket/${id}?${query}`;

      const authState = JSON.parse(localStorage.getItem("authState"));
      if (!authState?.token) {
        console.log("Auth token not found");
        return;
      }

      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authState?.token}`,
        },
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to delete sub ticket");
      }

      console.log(data.message);
      getSubTicketDetails();

      // Reset input
      setInputValue("");
      setShowInput(false);
    } catch (error) {
      console.log("Error:", error.message);
      handleError(error);
    }
  };

  const updateSubTicket = async () => {
    try {
      const url = `http://localhost:8080/ticket/updateSubTicket/${id}?subTicketId=${subTicket?._id}`;
      const authState = JSON.parse(localStorage.getItem("authState"));
      if (!authState?.token) {
        console.log("Auth token not found");
        return;
      }

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authState?.token}`,
      };

      const body = {
        subTicketText: inputValue,
        parentId: subTicket?.parentId,
        parentType: level === 0 ? "Ticket" : "SubTicket",
      };

      const response = await fetch(url, {
        method: "PUT",
        headers,
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error("Failed to add sub ticket");
      }

      const data = await response.json();
      console.log("updated Data", data);

      setIsEditing(false);
      getSubTicketDetails();

      setInputValue("");
      setShowInput(false);
    } catch (error) {
      console.log(error);
      handleError(error);
    }
  };

  const handleSubmitForAdd = () => {
    let parentType;
    let parentId;

    if (subTicket) {
      // You are inside a SubTicketItem → parent is this subTicket
      parentType = "SubTicket";
      parentId = subTicket._id;
    } else {
      // You are at top-level (direct child of Ticket)
      parentType = "Ticket";
      parentId = id; // ticketId from useParams
    }

    addSubTicket(parentId, parentType, inputValue);

    setInputValue("");
    setShowInput(false);
  };

  // when user clicks update → store original value
  const handleStartEditing = () => {
    setInputValue(subTicket?.subTicketText || "");
    setOriginalValue(subTicket?.subTicketText || ""); // ✅ store original
    setShowInput(true);
    setIsEditing(true);
  };

  return (
    <div className={`ml-4 mt-3`}>
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-3 hover:shadow-md transition cursor-pointer">
        {/* Header row */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center text-sm font-bold">
            {subTicket?.createdBy?.name
              ? subTicket.createdBy.name[0].toUpperCase()
              : "U"}
          </div>
          <div>
            <p className="font-semibold text-gray-800">
              {subTicket?.createdBy?.name || "Anonymous"}
            </p>
            <span className="text-xs text-gray-500">
              {new Date(subTicket?.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
        {/* Content */}
        {subTicket?.subTicketText && (
          <ul className="list-disc list-inside mt-2 text-gray-700 space-y-1">
            {subTicket.subTicketText.split("\n").map((line, index) =>
              line.trim() ? (
                <li key={index} className="text-sm">
                  {line}
                </li>
              ) : null
            )}
          </ul>
        )}
        {/* Actions */}
        <div className="mt-2 flex gap-4 text-sm text-gray-500">
          <button
            onClick={() => setShowInput(!showInput)}
            className="hover:text-green-600"
          >
            Add
          </button>
          <button
            className="hover:text-purple-600"
            onClick={handleStartEditing} // ✅ use the new function
          >
            Update
          </button>
          <button className="hover:text-red-600" onClick={deleteSubTicket}>
            Delete
          </button>
        </div>
        {/* Input field for adding sub-ticket */}
        {showInput && (
          <div ref={inputRef} className="mt-3 flex gap-2">
            <textarea
              ref={textAreaRef}
              placeholder="Enter sub-ticket..."
              onChange={(e) => setInputValue(e.target.value)}
              className="flex-1 border rounded-md px-2 py-1 text-sm"
              value={inputValue}
              name="inputValue"
            ></textarea>
            <button
              onClick={isEditing ? updateSubTicket : handleSubmitForAdd}
              disabled={
                !inputValue.trim() ||
                (isEditing && inputValue.trim() === originalValue.trim())
              }
              className={`px-3 py-1 rounded-md text-sm text-white ${
                !inputValue.trim() ||
                (isEditing && inputValue.trim() === originalValue.trim())
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-500 hover:bg-green-600"
              }`}
            >
              {isEditing ? "Update" : "Submit"}
            </button>
          </div>
        )}
      </div>

      {children.length > 0 && (
        <div className="pl-4 border-l-2 border-gray-300 mt-2">
          {children.map((child, index) => (
            <SubTicketItem
              // key={child?._id}
              key={child?._id || `${subTicket?._id}-${index}`}
              subTicket={child}
              addSubTicket={addSubTicket}
              getSubTicketDetails={getSubTicketDetails}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SubTicketItem;
