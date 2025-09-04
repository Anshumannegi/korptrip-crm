import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const mongo_url = process.env.MONGO_URL;
mongoose.connect(mongo_url);

const db = mongoose.connection;

db.on("connected", () => {
  console.log("Connected to Mongodb Server");
});
db.on("error", (err) => {
  console.log("Mongodb Connection error", err);
});
db.on("disconnected", () => {
  console.log("Mongodb disconnected");
});

export default db;
