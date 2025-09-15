import Notification from '../models/Notification.js'

export const listNotifications = async (req, res) => {
  const notes = await Notification.find({ user: req.user.id }).sort({ createdAt: -1 })
  res.json(notes)
}

export const markAsRead = async (req, res) => {
  const note = await Notification.findOneAndUpdate(
    { _id: req.params.id, user: req.user.id },
    { read: true },
    { new: true }
  )
  if (!note) return res.status(404).json({ message: 'Notification not found' })
  res.json(note)
}

