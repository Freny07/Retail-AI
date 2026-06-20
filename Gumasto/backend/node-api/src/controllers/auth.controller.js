import User from "../models/User.model.js";
import {
  hashPassword,
  comparePassword,
  generateToken
} from "../services/auth.service.js";
import { generateOTP, hashOTP } from "../utils/otp.js";
import { sendOTPEmail } from "../services/email.service.js";
import crypto from "crypto";

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "User not found" });

    const otp = generateOTP();
    user.resetOTP = hashOTP(otp);
    user.resetOTPExpiry = Date.now() + 10 * 60 * 1000;

    await user.save();
    console.log(`🔑 [OTP DEBUG] Generated OTP for ${email}: ${otp}`);

    try {
      await sendOTPEmail(email, otp);
    } catch (emailErr) {
      console.warn("⚠️ SMTP Email sending failed. Please read the OTP from the server terminal console:", otp);
    }

    res.json({ message: "OTP generated (check email or server console)", otp });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "User already exists" });
    }

    if (!name || !email || !password) {
  return res.status(400).json({ message: "Name, email, and password are required" });
}


    const hashedPassword = await hashPassword(password);

    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    const token = generateToken(user);

    res.status(201).json({
      message: "User registered successfully",
      token
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user);

    res.status(200).json({
      message: "Login successful",
      token
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
      return res.status(400).json({
        message: "Email, OTP and new password are required"
      });
    }

    const hashedOTP = crypto
      .createHash("sha256")
      .update(otp)
      .digest("hex");

    const user = await User.findOne({
      email,
      resetOTP: hashedOTP,
      resetOTPExpiry: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid or expired OTP"
      });
    }

    user.password = await hashPassword(newPassword);
    user.resetOTP = undefined;
    user.resetOTPExpiry = undefined;

    await user.save();

    res.json({ message: "Password reset successful" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
