import {
  addTicket,
  getAllTickets,
  updateTicket,
  getTicketDetail,
  deleteTicket,
  assignedTicket,
  changeStatus,
  addSubTicket,
  updateSubTicket,
  deleteSubTicket,
  getSubTicketDetails,
  getAllSubTickets,
  getParticularNLevelSubTicket,
  changePriorityOfSubTicket,
  changePriorityOfTicket,
} from "../Controllers/TicketController.js";

import ensureAuthenticated from "../Middlewares/Auth.js";
import CheckAdmin from "../Middlewares/CheckAdmin.js";

import express from "express";
const router = express.Router();

router.post("/addTicket", ensureAuthenticated, addTicket);
router.get("/getAllTickets", ensureAuthenticated, getAllTickets);
router.put("/updateTicket/:id", ensureAuthenticated, updateTicket);
router.get("/getTicketDetail/:id", ensureAuthenticated, getTicketDetail);
router.delete("/deleteTicket/:id", ensureAuthenticated, deleteTicket);
router.put("/assignTicket", ensureAuthenticated, CheckAdmin, assignedTicket);
router.put("/changeStatus", ensureAuthenticated, changeStatus);
router.put(
  "/changePriorityOfTicket/:id",
  ensureAuthenticated,
  CheckAdmin,
  changePriorityOfTicket
);

// sub-ticket routes
router.post("/addSubTicket", ensureAuthenticated, addSubTicket);
router.get("/getSubTicket/:id", ensureAuthenticated, getSubTicketDetails);
router.put("/updateSubTicket/:id", ensureAuthenticated, updateSubTicket);
router.delete("/deleteSubTicket/:id", ensureAuthenticated, deleteSubTicket);
router.get("/getAllSubTickets", ensureAuthenticated, getAllSubTickets);
router.get(
  "/getParticularNLevelSubTicket/:id",
  ensureAuthenticated,
  getParticularNLevelSubTicket
);
router.put(
  "/changePriorityOfSubTicket",
  ensureAuthenticated,
  CheckAdmin,
  changePriorityOfSubTicket
);
export default router;
