import Notification from "../models/Notification.js";

export const getNotifications = async (req, res) => {
  const notifications = await Notification.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(notifications);
};

export const markAsRead = async (req, res) => {
  const notification = await Notification.findById(req.params.id);
  if (notification && notification.user.toString() === req.user._id.toString()) {
    notification.isRead = true;
    await notification.save();
    res.json(notification);
  } else {
    res.status(404).json({ message: "Notification not found" });
  }
};

export const createNotification = async (req, res) => {
  const { message, type, userId } = req.body;
  const notification = new Notification({ message, type, user: userId });
  const createdNotification = await notification.save();
  res.status(201).json(createdNotification);
};
