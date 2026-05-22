const express = require('express')
const prisma = require('../config/prisma')
 
const router = express.Router()

// GET /api/diseases
router.get('/', async (req, res) => {
    try {
        const { keyword } = req.query
    
        const where = keyword
        ? {
            OR: [
                { name: { contains: keyword, mode: 'insensitive' } },
                { scientificName: { contains: keyword, mode: 'insensitive' } },
            ],
            }
        : {}
    
        const diseases = await prisma.disease.findMany({
            where,
            select: {
                id: true,
                name: true,
                slug: true,
                scientificName: true,
                description: true,
            },
            orderBy: { name: 'asc' },
        })
    
        return res.status(200).json({
            data: diseases,
            meta: {
                total: diseases.length,
                keyword: keyword ?? null,
            },
        })
    } catch (error) {
        console.error('Error saat mengambil daftar penyakit:', error)
        return res.status(500).json({ message: 'Terjadi kesalahan server.' })
    }
})

// GET /api/diseases/:slug
router.get('/:slug', async (req, res) => {
    try {
        const { slug } = req.params
    
        const disease = await prisma.disease.findUnique({
        where: { slug },
        select: {
            id: true,
            name: true,
            slug: true,
            scientificName: true,
            description: true,
            symptoms: true,
            treatment: true,
            imageUrl: true,
            createdAt: true,
            // Counting detected case
            _count: {
                select: { classifications: true },
            },
        },
        })
    
        if (!disease) {
            return res.status(404).json({ message: 'Penyakit tidak ditemukan.' })
        }
    
        const { _count, ...diseaseData } = disease
    
        return res.status(200).json({
            data: {
                ...diseaseData,
                totalDetections: _count.classifications,
            },
        })
    } catch (error) {
        console.error('Error saat mengambil detail penyakit:', error)
        return res.status(500).json({ message: 'Terjadi kesalahan server.' })
    }
})

module.exports = router