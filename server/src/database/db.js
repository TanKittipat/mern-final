import mongoose from "mongoose";
const MongoDB = process.env.MongoDB;

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MongoDB);
    console.log("Connect to DB: ", conn.connection.host);
  } catch (error) {
    console.log("MongoDB connection error: ", error);
  }
};
