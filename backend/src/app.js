require('dotenv').config()
const express = require('express')
const cors = require('cors')
const authRoutes = require('./routes/auth')

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}))

app.use('/auth', authRoutes)

app.get('/', (req, res) => {
  res.json({ message: 'WORKED!' })
})

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ message: 'Something went wrong' })
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})