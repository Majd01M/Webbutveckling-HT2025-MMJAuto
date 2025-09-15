import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const signToken = (user) =>
  jwt.sign(
    { id: user._id, role: user.role, email: user.email, name: user.name },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  )

export const register = async (req, res) => {
  const { name, email, password } = req.body
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Missing fields' })
  }
  const exists = await User.findOne({ email })
  if (exists) return res.status(409).json({ message: 'Email already in use' })

  const passwordHash = await bcrypt.hash(password, 10)
  const user = await User.create({ name, email, passwordHash })
  const token = signToken(user)

  res.status(201).json({
    token,
    user: { id: user._id, name: user.name, email: user.email, role: user.role }
  })
}

export const login = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (!user) return res.status(401).json({ message: 'Invalid credentials' })

  const ok = await bcrypt.compare(password, user.passwordHash)
  if (!ok) return res.status(401).json({ message: 'Invalid credentials' })

  const token = signToken(user)
  res.json({
    token,
    user: { id: user._id, name: user.name, email: user.email, role: user.role }
  })
}

export const me = async (req, res) => {
  res.json({ user: req.user })
}

