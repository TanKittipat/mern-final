import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["Admin", "User"],
      default: "User",
    },
    firstNameEn: { type: String, required: true },
    lastNameEn: { type: String, required: true },
    firstNameTh: { type: String, required: true },
    lastNameTh: { type: String, required: true },
  },
  { timestamps: true }
);

export const UserModel = mongoose.model("User", userSchema);
