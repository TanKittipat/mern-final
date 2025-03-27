import mongoose from "mongoose";
const { Schema } = mongoose;

const bookingSchema = new Schema(
  {
    flight: { type: String, required: true },
    userInfo: { type: Schema.Types.ObjectId, ref: "User", required: true },
    seatNo: { type: Number, required: true },
    ticketPrice: { type: Number, required: true },
  },
  { timestamps: true }
);

export const bookingModel = mongoose.model("Booking", bookingSchema);
