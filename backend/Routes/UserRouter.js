import express from "express";
import ensureAuthenticated from "../Middlewares/Auth.js";
import CheckAdmin from "../Middlewares/CheckAdmin.js";
import { getAllUser } from "../Controllers/UserController.js";

const router = express.Router();

router.get("/allUser", ensureAuthenticated, getAllUser);

export default router;
