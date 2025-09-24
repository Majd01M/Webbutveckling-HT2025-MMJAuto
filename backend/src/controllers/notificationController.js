import Notification from "../models/Notification.js";

export const listMyNotifications = async (req, res) => {
  const items = await Notification.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(items);
};

export const markRead = async (req, res) => {
  const note = await Notification.findOne({ _id: req.params.id, user: req.user._id });
  if (!note) return res.status(404).json({ message: "Not found" });
  note.read = true;
  await note.save();
  res.json(note);
};

// Admin: create a notification for a user
export const createNotification = async (req, res) => {
  const { userId, type, message } = req.body;
  const note = await Notification.create({ user: userId, type, message });
  res.status(201).json(note);
};

