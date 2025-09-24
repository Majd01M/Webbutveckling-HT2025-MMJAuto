import jwt from "jsonwebtoken";
import User from "../models/User.js";

const makeToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ message: "Email already registered" });
  const user = await User.create({ name, email, password, role: "customer" });
  return res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    token: makeToken(user._id)
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.matchPassword(password)))
    return res.status(401).json({ message: "Invalid credentials" });

  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    token: makeToken(user._id)
  });
};

export const me = async (req, res) => {
  res.json(req.user);
};

export const updateProfile = async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) return res.status(404).json({ message: "User not found" });

  user.name = req.body.name ?? user.name;
  if (req.body.password) user.password = req.body.password;
  if (req.body.preferences) user.preferences = { ...user.preferences, ...req.body.preferences };
  await user.save();

  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role
  });
};

