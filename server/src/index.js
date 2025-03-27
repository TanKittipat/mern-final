import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDB } from "./database/db.js";
const app = express();

const PORT = process.env.PORT;

app.use(express.json());
app.use(cors({ origin: process.env.BaseUrl }));

app.listen(PORT, (req, res) => {
  console.log("Server is running on http://localhost:" + PORT);
  connectDB();
});
