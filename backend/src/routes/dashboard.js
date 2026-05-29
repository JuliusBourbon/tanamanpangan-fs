const express = require('express')
const prisma = require('../config/prisma')
const authenticate = require('../middleware/auth')
const { GetObjectCommand } = require('@aws-sdk/client-s3')
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner')
const { s3 } = require('../middleware/upload')

const router = express.Router()

// HELPER: generate presigned URL
const getPresignedImageUrl = async (imageUrl) => {
    try {
        const url = new URL(imageUrl)
        const key = url.pathname.startsWith('/') ? url.pathname.slice(1) : url.pathname
        const command = new GetObjectCommand({
            Bucket: process.env.AWS_S3_BUCKET,
            Key: key,
        })
        return await getSignedUrl(s3, command, { expiresIn: 3600 })
    } catch (error) {
        console.error('Error saat membuat presigned URL:', error.message)
        return null
    }
}


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

    if (lastScan && lastScan.imageUrl) {
      lastScan.imageUrl = await getPresignedImageUrl(lastScan.imageUrl)
    }

    // 2. Proses Presigned URL untuk array recentHistory menggunakan Promise.all
    const recentHistoryWithUrls = await Promise.all(
      recentHistory.map(async (item) => {
        if (item.imageUrl) {
          return {
            ...item,
            imageUrl: await getPresignedImageUrl(item.imageUrl),
          }
        }
        return item
      })
    )

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
        recentHistory: recentHistoryWithUrls,
      },
    })
  } catch (error) {
    console.error('Error saat mengambil data dashboard:', error)
    return res.status(500).json({ message: 'Terjadi kesalahan server.' })
  }
})

module.exports = router