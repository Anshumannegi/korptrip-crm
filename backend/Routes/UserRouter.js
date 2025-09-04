import express from "express";
import ensureAuthenticated from "../Middlewares/Auth.js";
import CheckAdmin from "../Middlewares/CheckAdmin.js";
import { getAllUser, getUserDetails } from "../Controllers/UserController.js";

const router = express.Router();

router.get("/allUser", ensureAuthenticated, getAllUser);
router.get("/getUserDetails", ensureAuthenticated, getUserDetails);

export default router;
