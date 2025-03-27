import jwt from "jsonwebtoken";
import { UserModel } from "../models/user.model.js";

export const protectedRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized - No Token Provided!" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized - Invalid Token!" });
    }
    const user = await UserModel.findById(decoded.userId).select("-password");
    // .select ใช้เลือก field ที่ต้องการ แต่ถ้าใส่ - จะเลือกไม่เอา
    if (!user) {
      return res.status(404).json({
        message: "User not found!",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ message: "Internal server error!" });
  }
};
