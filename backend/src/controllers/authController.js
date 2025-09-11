import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const sign = (u) => jwt.sign(
  { id: u._id, role: u.role, email: u.email, name: u.name },
  process.env.JWT_SECRET,
  { expiresIn: '7d' }
)

export const register = async (req, res) => {
  const { name, email, password } = req.body
  if (!name || !email || !password) return res.status(400).json({ message: 'Missing fields' })
  const exists = await User.findOne({ email })
  if (exists) return res.status(409).json({ message: 'Email already in use' })
  const passwordHash = await bcrypt.hash(password, 10)
  const user = await User.create({ name, email, passwordHash })
  res.status(201).json({ token: sign(user), user: { id: user._id, name: user.name, email: user.email, role: user.role } })
}

export const login = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (!user) return res.status(401).json({ message: 'Invalid credentials' })
  const ok = await bcrypt.compare(password, user.passwordHash)
  if (!ok) return res.status(401).json({ message: 'Invalid credentials' })
  res.json({ token: sign(user), user: { id: user._id, name: user.name, email: user.email, role: user.role } })
}

export const me = async (req, res) => res.json({ user: req.user })

