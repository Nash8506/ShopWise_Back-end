import Users from "../models/userModel.js";
import jwt from "jsonwebtoken";

// Sign up a new user
export const signUpUser = async (req, res) => {
  try {
    let existingUser = await Users.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User with this email already exists",
      });
    }

    let cart = {};
    for (let i = 0; i < 300; i++) {
      cart[i] = 0;
    }

    const user = new Users({
      name: req.body.username,
      email: req.body.email,
      password: req.body.password,
      cartData: cart,
    });

    await user.save();
    const data = { user: { id: user.id } };
    const token = jwt.sign(data, process.env.JWT_SECRET);

    res.json({ success: true, token });
  } catch (error) {
    console.error("Error during signup", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Log in an existing user
export const loginUser = async (req, res) => {
  try {
    let user = await Users.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ success: false, message: "User not found" });
    }

    const isPasswordMatch = req.body.password === user.password;
    if (!isPasswordMatch) {
      return res.status(400).json({ success: false, message: "Incorrect password" });
    }

    const data = { user: { id: user.id } };
    const token = jwt.sign(data, process.env.JWT_SECRET);
    
    res.json({ success: true, token });
  } catch (error) {
    console.error("Error during login", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
