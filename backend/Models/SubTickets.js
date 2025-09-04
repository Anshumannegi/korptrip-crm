import mongoose from "mongoose";

const SubTicketsSchema = new mongoose.Schema(
  {
    subTicketText: {
      type: String,
      required: true,
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      default: null,
    },
    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "parentType",
    },
    parentType: {
      type: String,
      enum: ["Ticket", "SubTicket"],
      required: true,
    },
  },
  { timestamps: true }
);

const subTickets = mongoose.model("subTickets", SubTicketsSchema);

export default subTickets;
