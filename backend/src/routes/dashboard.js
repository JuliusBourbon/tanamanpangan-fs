const express = require('express')
const prisma = require('../config/prisma')
const authenticate = require('../middleware/auth')

const router = express.Router()

// GET /api/dashboard
router.get('/', authenticate, async (req, res) => {
  try {
    const userId = req.user.userId

    const now = new Date()
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)

    const [
      totalScans,
      scansThisMonth,
      healthyCount,
      recentHistory,
      lastScan,
    ] = await Promise.all([

      // Classification count
      prisma.classification.count({
        where: { userId },
      }),

      // This Month Classification
      prisma.classification.count({
        where: {
          userId,
          createdAt: { gte: startOfMonth },
        },
      }),

      // Healthy Classification count
      prisma.classification.count({
        where: {
          userId,
          disease: { slug: 'tomato-healthy' },
        },
      }),

      // Top 5 newest classification
      prisma.classification.findMany({
        where: { userId },
        include: {
          disease: {
            select: { name: true, slug: true, cropType: true },
          },
        },
        orderBy: { createdAt: 'desc' },
        take: 5,
      }),

      // Last Classification
      prisma.classification.findFirst({
        where: { userId },
        include: {
          disease: {
            select: { name: true, slug: true, cropType: true },
          },
        },
        orderBy: { createdAt: 'desc' },
      }),

    ])

    // Healthy Percentage
    const healthyPercentage = totalScans > 0
      ? Math.round((healthyCount / totalScans) * 100)
      : 0

    return res.status(200).json({
      data: {
        totalScans,
        scansThisMonth,
        healthyPercentage,
        lastScan,
        recentHistory,
      },
    })
  } catch (error) {
    console.error('Error saat mengambil data dashboard:', error)
    return res.status(500).json({ message: 'Terjadi kesalahan server.' })
  }
})

module.exports = router