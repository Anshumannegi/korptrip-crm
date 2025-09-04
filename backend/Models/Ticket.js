import mongoose from "mongoose";
const TicketSchema = new mongoose.Schema(
  {
    query_no: {
      type: Number,
      unique: true,
    },
    query_type: {
      type: String,
      enum: ["domestic", "international"],
    },
    corporate: {
      type: String,
    },
    industry: {
      type: [String],
      enum: [
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
      ],
    },
    location: {
      type: String,
    },
    contact_person: {
      type: String,
    },
    contact_number: {
      type: Number,
    },
    email_id: {
      type: String,
    },
    designation: {
      type: String,
    },
    destination: {
      type: String,
    },
    travel_type: {
      type: [String],
      enum: [
        "Residential Conference",
        "Corporate event",
        "tour and event",
        "tour",
        "non residential conference",
        "meeting",
        "flight only",
        "others",
      ],
    },
    date_of_travel: {
      type: Date,
    },
    duration: {
      type: [String],
      enum: ["1N/2D", "2N/3D", "3N/4D", "4N/5D", "5N/6D", "6N/7D", "7N/8D"],
    },
    number_of_person: {
      type: Number,
    },
    hotel_resort_category: {
      type: [String],
      enum: [
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
      ],
    },
    budget: {
      type: Number,
      required: false,
    },
    remark: {
      type: String,
      required: false,
    },
    isCompleted: {
      type: String,
      enum: [
        "Pending", // Task has been created but not started
        "In Progress", // Task is currently being worked on
        "Completed", // Task has been successfully finished
        "On Hold", // Task is temporarily paused
        "Cancelled", // Task was stopped and will not be completed
        "Awaiting Review", // Task is done but awaiting approval
        "Assigned", // Task has been assigned but not started yet
        "Reopened", // Task was marked as completed but needs more work
        "Failed", // Task was attempted but failed
        "Deferred", // Task has been postponed
      ],
      default: "Pending",
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      default: null,
    },
  },
  { timestamps: true }
);

TicketSchema.pre("save", async function (next) {
  if (!this.query_no) {
    try {
      const lastQuery = await mongoose
        .model("tickets")
        .findOne()
        .sort({ query_no: -1 });
      this.query_no =
        lastQuery && lastQuery.query_no ? lastQuery.query_no + 1 : 1;
    } catch (error) {
      return next(error); // Pass any errors to Mongoose
    }
  }
  next();
});

const tickets = mongoose.model("tickets", TicketSchema);
export default tickets;
