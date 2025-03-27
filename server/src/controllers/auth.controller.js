import { generateToken } from "../libs/utils.js";
import { UserModel } from "../models/user.model.js";
import bcrypt from "bcrypt";

export const signUp = async (req, res) => {
  const { email, password, firstNameEn, lastNameEn, firstNameTh, lastNameTh } =
    req.body;

  if (
    !email ||
    !password ||
    !firstNameEn ||
    !lastNameEn ||
    !firstNameTh ||
    !lastNameTh
  ) {
    return res
      .status(400)
      .json({ message: "Please fill all required fields!" });
  }

  try {
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "This email is already used!" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new UserModel({
      email,
      firstNameEn,
      lastNameEn,
      firstNameTh,
      lastNameTh,
      password: hashedPassword,
    });

    await newUser.save();

    generateToken(newUser._id, res);

    return res.status(201).json({
      _id: newUser._id,
      firstNameEn: newUser.firstNameEn,
      lastNameEn: newUser.lastNameEn,
      firstNameTh: newUser.firstNameTh,
      lastNameTh: newUser.lastNameTh,
      email: newUser.email,
    });
  } catch (error) {
    console.error("Error during user registration:", error);
    return res.status(500).json({
      message: "Internal server error while registering new user!",
      error: error.message,
    });
  }
};

export const signIn = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Please fill all required fields!" });
  }
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    // Check password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Password is not matched!" });
    }
    generateToken(user._id, res);
    res.status(200).json({
      _id: user._id,
      firstNameEn: user.firstNameEn,
      lastNameEn: user.lastNameEn,
      firstNameTh: user.firstNameTh,
      lastNameTh: user.lastNameTh,
      email: user.email,
    });
  } catch (error) {
    res.status(500).json({
      message:
        "Internal server error while registering new user!" || error.message,
    });
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error while logging in user!" || error.message,
    });
  }
};

export const checkAuth = async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    res.status(500).json({
      message: "Internal server error while checking auth!" || error.message,
    });
  }
};
