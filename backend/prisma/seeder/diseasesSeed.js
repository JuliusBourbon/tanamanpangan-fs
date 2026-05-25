const { PrismaClient } = require('@prisma/client')
const { PrismaPg } = require('@prisma/adapter-pg')
const { Pool } = require('pg')

require('dotenv').config()

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

module.exports = prisma

const diseases = [
  {
    name: 'Tomato - Bacterial Spot',
    slug: 'tomato-bacterial-spot',
    scientificName: 'Xanthomonas vesicatoria',
    cropType: 'tomato',
    description: 'Penyakit bakteri yang umum menyerang tanaman tomat rumahan, terutama saat musim hujan atau ketika tanaman sering terkena air.',
    symptoms: 'Muncul bercak-bercak kecil berwarna coklat gelap pada daun dengan tepi kekuningan. Bercak bisa berlubang di tengahnya. Pada buah muncul bintik-bintik kasar berwarna coklat yang membuat tampilan tomat kurang menarik.',
    treatment: 'Hindari menyiram dari atas agar daun tidak terlalu sering basah. Buang daun yang terinfeksi dan musnahkan. Semprotkan larutan tembaga atau fungisida yang tersedia di toko tanaman. Pastikan tanaman mendapat sirkulasi udara yang cukup.',
    imageUrl: null,
  },
  {
    name: 'Tomato - Early Blight',
    slug: 'tomato-early-blight',
    scientificName: 'Alternaria solani',
    cropType: 'tomato',
    description: 'Penyakit jamur yang sering dialami pemula berkebun tomat, biasanya muncul di daun bagian bawah terlebih dahulu.',
    symptoms: 'Bercak coklat dengan pola lingkaran-lingkaran seperti cincin target pada daun tua di bagian bawah. Di sekeliling bercak daun menguning. Jika dibiarkan, daun akan mengering dan rontok dari bawah ke atas.',
    treatment: 'Pangkas dan buang daun bawah yang terinfeksi segera. Beri mulsa di sekitar pangkal tanaman agar tanah tidak memercik ke daun saat disiram. Siram di bagian bawah tanaman, bukan dari atas. Semprotkan fungisida berbahan mankozeb jika tersedia.',
    imageUrl: null,
  },
  {
    name: 'Tomato - Healthy',
    slug: 'tomato-healthy',
    scientificName: null,
    cropType: 'tomato',
    description: 'Tanaman tomat dalam kondisi sehat dan tumbuh dengan baik.',
    symptoms: 'Tidak ada gejala penyakit. Daun berwarna hijau tua segar, permukaan mulus, dan tanaman tumbuh dengan normal.',
    treatment: 'Tidak diperlukan penanganan khusus. Pertahankan perawatan rutin: siram secara teratur di pagi hari, beri pupuk setiap 2 minggu, dan pastikan mendapat sinar matahari minimal 6 jam sehari.',
    imageUrl: null,
  },
  {
    name: 'Tomato - Late Blight',
    slug: 'tomato-late-blight',
    scientificName: 'Phytophthora infestans',
    cropType: 'tomato',
    description: 'Penyakit yang paling ditakuti pada tanaman tomat karena bisa menyebar sangat cepat dan merusak seluruh tanaman dalam waktu singkat, terutama saat cuaca lembap.',
    symptoms: 'Bercak hijau gelap berminyak pada daun yang dengan cepat berubah menjadi coklat kehitaman. Pada kondisi lembap, bagian bawah daun tampak seperti ditumbuhi lapisan putih tipis berbulu. Batang dan buah ikut membusuk dengan cepat.',
    treatment: 'Segera pisahkan atau buang tanaman yang terinfeksi agar tidak menular ke tanaman lain. Hindari kelembapan berlebih dengan tidak menyiram terlalu banyak. Pastikan tanaman tidak terlalu rapat. Semprotkan fungisida sesegera mungkin saat gejala pertama terlihat.',
    imageUrl: null,
  },
]

async function main() {
  console.log('Memulai proses seeding\n')

  const deleted = await prisma.disease.deleteMany()
  console.log(`🗑️  ${deleted.count} data lama dihapus\n`)

  let created = 0

  for (const disease of diseases) {
    await prisma.disease.create({ data: disease })
    console.log(`✅ Berhasil: ${disease.name}`)
    created++
  }

  console.log(`✅ Selesai! ${created} data baru dibuat.`)
}

main()
  .catch((e) => {
    console.error('❌ Error saat seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })