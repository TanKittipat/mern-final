import mongoose from "mongoose";
const { Schema } = mongoose;

const flightSchema = new Schema(
  {
    flightName: { type: String, required: true },
    departurePort: { type: String, required: true },
    destinationPort: { type: String, required: true },
    departureTime: { type: Date, required: true },
    destinationTime: { type: Date, required: true },
  },
  { timestamps: true }
);

export const flightModel = mongoose.model("Flight", flightSchema);
