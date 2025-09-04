import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import AuthRouter from "./Routes/AuthRouter.js";
import ProductRouter from "./Routes/ProductRouter.js";
import TicketRouter from "./Routes/TicketRouter.js";
import UserRouter from "./Routes/UserRouter.js";
import db from "./Models/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());
app.use("/auth", AuthRouter);
app.use("/products", ProductRouter);
app.use("/ticket", TicketRouter);
app.use("/user", UserRouter);

app.get("/ping", (req, res) => {
  res.send("PONG");
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT : ${PORT}`);
});
