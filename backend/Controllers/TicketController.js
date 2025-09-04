import TicketModel from "../Models/Ticket.js";
import UserModel from "../Models/User.js";
import SubTicketModel from "../Models/SubTickets.js";

export const addTicket = async (req, res) => {
  try {
    const {
      query_type,
      corporate,
      industry,
      location,
      contact_person,
      contact_number,
      email_id,
      designation,
      destination,
      travel_type,
      date_of_travel,
      duration,
      number_of_person,
      hotel_resort_category,
      budget,
      remark,
    } = req.body;

    const ticketModel = new TicketModel({
      query_type,
      corporate,
      industry,
      location,
      contact_person,
      contact_number,
      email_id,
      designation,
      destination,
      travel_type,
      date_of_travel,
      duration,
      number_of_person,
      hotel_resort_category,
      budget,
      remark,
      assignedTo: null,
      isCompleted: "Pending",
    });
    await ticketModel.save();
    res
      .status(201)
      .json({ message: "Query generated Successfully", success: true });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", success: false });
    console.log(error);
  }
};

export const getAllTickets = async (req, res) => {
  try {
    const allTickets = await TicketModel.find();
    res.status(200).json({
      message: "Queries Fetched Successfully",
      success: true,
      data: allTickets,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", success: false });
    console.log(error);
  }
};

export const updateTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    if (updatedData.date_of_travel) {
      updatedData.date_of_travel = new Date(updatedData.date_of_travel);
      if (isNaN(updatedData.date_of_travel)) {
        return res
          .status(400)
          .json({ message: "Invalid Date of Travel Format", sucsess: false });
      }
    }

    const updatedTicket = await TicketModel.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!updatedTicket) {
      return res
        .status(404)
        .json({ message: "Query not Found", success: false });
    }
    res.status(200).json({
      message: "Query Updated Successfully",
      success: true,
      data: updatedTicket,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", success: false });
    console.log(error);
  }
};

export const getTicketDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const ticketDetails = await TicketModel.findById(id);
    if (!ticketDetails) {
      return res
        .status(404)
        .json({ message: "Query not exist", success: false });
    }
    res.status(200).json({
      message: "Query Details Found",
      success: true,
      data: ticketDetails,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: error.message,
    });
    console.log(error);
  }
};

const deleteTicketAndChild = async (ticketId) => {
  const children = await SubTicketModel.find({
    parentId: ticketId,
    parentType: "Ticket",
  });

  if (children.length > 0) {
    for (let child of children) {
      await deleteSubTicketAndChildren(child._id);
    }
  }
};
export const deleteTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const ticket = await TicketModel.findById(id);
    if (!ticket) {
      return res
        .status(404)
        .json({ message: "Query not Found", success: false });
    }

    await deleteTicketAndChild(id);

    await ticket.deleteOne();
    res
      .status(200)
      .json({ message: "Query deleted successfully", success: true });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

export const assignedTicket = async (req, res) => {
  try {
    const { ticketId, UserId } = req.body;

    // If UserId is null
    if (UserId === null) {
      const unassignedTicket = await TicketModel.findByIdAndUpdate(
        ticketId,
        { assignedTo: null, isCompleted: "Pending" }, // Set assignedTo to null
        { new: true }
      );

      if (!unassignedTicket) {
        return res
          .status(404)
          .json({ message: "Ticket not found", success: false });
      }

      return res
        .status(200)
        .json({ message: "Ticket successfully unassigned", success: true });
    }

    // If UserId is provided, find the user and assign the ticket
    const user = await UserModel.findById(UserId);
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not Found", success: false });
    }

    const assignedTicket = await TicketModel.findByIdAndUpdate(
      ticketId,
      { assignedTo: UserId, isCompleted: "Assigned" },
      { new: true }
    );

    if (!assignedTicket) {
      return res
        .status(404)
        .json({ message: "Ticket not found", success: false });
    }

    res
      .status(200)
      .json({ message: "Ticket assigned successfully", success: true });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

export const changeStatus = async (req, res) => {
  try {
    const { ticketId, userId, statusValue } = req.body;

    const user = await UserModel.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not Found", success: false });
    }

    const ticket = await TicketModel.findById(ticketId);
    if (!ticket) {
      return res
        .status(404)
        .json({ message: "Ticket not Found", success: false });
    }

    // Check if the ticket is assigned to the logged-in user
    if (!ticket.assignedTo.equals(userId)) {
      return res.status(403).json({
        message: "Access Denied, not able to change status",
        success: false,
      });
    }

    // Update the status and save the ticket
    ticket.isCompleted = statusValue;
    await ticket.save();

    return res.status(200).json({
      message: "Status updated successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", success: false });
    console.log(error);
  }
};

// Sub-Tickets
export const addSubTicket = async (req, res) => {
  try {
    const { subTicketText, assignedTo, parentId, parentType } = req.body;
    const user = req.user;
    // console.log(user);

    let parent = null;
    let rootTicket = null;
    if (parentType === "Ticket") {
      parent = await TicketModel.findById(parentId);
      rootTicket = parent;
    } else {
      parent = await SubTicketModel.findById(parentId);
      while (parent && parent.parentType === "SubTicket") {
        parent = await SubTicketModel.findById(parent.parentId);
      }
      rootTicket = await TicketModel.findById(parent.parentId);
    }

    if (!rootTicket) {
      return res
        .status(400)
        .json({ message: "Could not resolve root ticket ", success: false });
    }

    // Authorization Check
    if (user.isAdmin) {
      // console.log("User is Admin");
    } else {
      if (user._id.toString() !== rootTicket.assignedTo.toString()) {
        return res.status(403).json({
          message: "Not authorized to add sub-ticket for this query",
          success: false,
        });
      }
    }

    const subTicket = new SubTicketModel({
      subTicketText,
      assignedTo,
      parentId,
      parentType,
    });

    await subTicket.save();
    return res.status(201).json({
      message: "Sub-ticket created Successfully",
      subTicket,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: err.message, success: false });
  }
};

export const updateSubTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const { subTicketId } = req.query;
    const updatedData = req.body;
    const user = req.user;

    let parent = null;
    let rootTicket = null;

    // console.log(updatedData);

    if (updatedData.parentType === "Ticket") {
      parent = await TicketModel.findById(updatedData.parentId);
      rootTicket = parent;
    } else {
      parent = await SubTicketModel.findById(updatedData.parentId);

      // Debug log
      // console.log("Fetched parent sub-ticket:", parent);

      if (!parent) {
        return res.status(404).json({
          message: "Parent sub-ticket not found",
          success: false,
        });
      }
      while (parent && parent.parentType === "SubTicket") {
        parent = await SubTicketModel.findById(parent.parentId);
        if (!parent) {
          return res.status(400).json({
            message: "Broken sub-ticket hierarchy: parent not found",
            success: false,
          });
        }
      }
      rootTicket = await TicketModel.findById(parent.parentId);
    }

    if (!rootTicket) {
      return res
        .status(400)
        .json({ message: "Could not resolve root ticket ", success: false });
    }

    if (user.isAdmin) {
      // console.log("admin");
    } else {
      if (user._id.toString() !== rootTicket.assignedTo.toString()) {
        return res.status(403).json({
          message: "Not authorized to update sub-ticket for this query",
          success: false,
        });
      }
    }

    const updatedSubTicket = await SubTicketModel.findByIdAndUpdate(
      subTicketId,
      updatedData,
      { new: true, runValidators: true }
    );

    // console.log(updatedSubTicket, "check ticket");
    // console.log(updatedData);

    if (!updatedSubTicket) {
      return res
        .status(404)
        .json({ message: "Sub Query not Found", success: false });
    }

    res.status(200).json({
      message: "Sub Query Updated Successfully",
      sucess: true,
      data: updatedSubTicket,
    });
  } catch (error) {
    console.log("Error in Updating Ticket", error);
    return res.status(500).json({
      message: "Server error while updating sub-ticket",
      error: error.message,
      success: false,
    });
  }
};

const deleteSubTicketAndChildren = async (subTicketId) => {
  const children = await SubTicketModel.find({
    parentId: subTicketId,
    // parentType: "SubTicket",
  });

  for (let child of children) {
    // Recursively delete child's children
    await deleteSubTicketAndChildren(child._id);
    // Delete child itself
    await SubTicketModel.findByIdAndDelete(child._id);
  }

  // Finally delete the parent sub-ticket itself
  await SubTicketModel.findByIdAndDelete(subTicketId);
};

export const deleteSubTicket = async (req, res) => {
  try {
    const { id } = req.params;
    // const { parentId, parentType } = req.body;
    const { parentId, parentType, subTicketId } = req.query;
    const user = req.user;

    let parent = null;
    let rootTicket = null;

    if (parentType === "Ticket") {
      parent = await TicketModel.findById(parentId);
      rootTicket = parent;
    } else {
      parent = await SubTicketModel.findById(parentId);

      while (parent && parent.parentType === "SubTicket") {
        parent = await SubTicketModel.findById(parent.parentId);
      }

      if (parent && parent.parentType === "Ticket") {
        rootTicket = await TicketModel.findById(parent.parentId);
      } else {
        return res.status(400).json({
          message: "Could not resolve root ticket from sub-ticket",
          success: false,
        });
      }
    }

    if (!rootTicket) {
      return res
        .status(400)
        .json({ message: "Could not resolve root ticket ", success: false });
    }

    if (user.isAdmin) {
      // console.log("admin");
    } else {
      if (user._id.toString() !== rootTicket.assignedTo.toString()) {
        return res.status(403).json({
          message: "Not authorized to update sub-ticket for this query",
          success: false,
        });
      }
    }

    // await deleteSubTicketAndChildren(id);
    await deleteSubTicketAndChildren(subTicketId);

    res.status(200).json({
      message: "SubTicket and it's children Deleted Successfully",
      success: true,
    });
  } catch (error) {
    console.log("Error in Deleting Ticket", error);
    return res.status(500).json({
      message: "Server error while deleting sub-ticket",
      error: error.message,
      success: false,
    });
  }
};

export const getSubTicketDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const SubTicketDetails = await SubTicketModel.findById(id);
    if (!SubTicketDetails) {
      return res
        .status(404)
        .json({ message: "Query don't exists", success: false });
    }

    res.status(200).json({
      message: "Sub Query Details Found",
      success: true,
      data: SubTicketDetails,
    });
  } catch (error) {
    console.log("Error in fetching Sub-Ticket", error);
    return res.status(500).json({
      message: "Server error while fetching sub-ticket",
      error: error.message,
      success: false,
    });
  }
};

export const getAllSubTickets = async (req, res) => {
  try {
    const allSubTicketsData = await SubTicketModel.find();
    if (!allSubTicketsData) {
      return res.status(404).json({
        message: "Sub Tickets not found",
        success: false,
      });
    }

    res.status(200).json({
      message: "All Sub Tickets data found Successfully",
      success: true,
      data: allSubTicketsData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error in Fetching All Sub Tickets",
      error: error.message,
      success: false,
    });
  }
};

const getNestedTicket = async (parentId, parentType) => {
  const subTicket = await SubTicketModel.find({ parentId, parentType });

  const result = [];
  for (let st of subTicket) {
    const children = await getNestedTicket(st._id, "SubTicket");
    result.push({
      ...st.toObject(),
      children,
    });
  }
  return result;
};
export const getParticularNLevelSubTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const query = await TicketModel.findById(id);
    if (!query) {
      return res.status(404).json({
        message: "Query not found",
        status: "false",
      });
    }
    const children = await getNestedTicket(query._id, "Ticket");
    res.json({
      ...query.toObject(),
      children,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error while fetching particular N-Level Sub Ticket",
      success: false,
      error: error.message,
    });
  }
};
