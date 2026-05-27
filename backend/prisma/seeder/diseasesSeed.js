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
    name: 'Bercak Bakteri (Bacterial Spot)',
    slug: 'tomato-bacterial-spot',
    scientificName: 'Xanthomonas vesicatoria',
    cropType: 'tomato',
    severity: 'medium',
    description: 'Penyakit bakteri yang sangat umum menyerang tanaman tomat rumahan. Bakteri ini berkembang biak dengan cepat pada kondisi hangat dan basah, sering kali menular melalui cipratan air hujan atau penyiraman yang mengenai tanah dan melompat ke daun bawah.',
    symptoms: [
      'Fase Awal: Muncul bercak-bercak kecil berair berwarna coklat gelap pada daun, biasanya dikelilingi lingkaran halo berwarna kekuningan.',
      'Fase Lanjut: Bercak membesar, mengering, dan bagian tengahnya bisa berlubang. Daun akhirnya menguning dan gugur.',
      'Pada Buah: Muncul bintik-bintik kasar, menonjol, dan berwarna coklat seperti keropeng. Meski buah masih bisa dimakan jika dikupas, tampilannya menjadi kurang menarik dan pertumbuhannya terhambat.',
    ],
    rootCauses: 'Kelembapan tinggi, sirkulasi udara antar tanaman yang buruk, dan cipratan air dari tanah yang terinfeksi ke area daun.',
    treatment: [
      'Segera potong daun atau cabang yang terinfeksi menggunakan gunting yang sudah disterilkan dengan alkohol.',
      'Jangan masukkan daun yang terinfeksi ke dalam tumpukan kompos rumahan karena bakteri dapat bertahan hidup. Bakar atau buang ke tempat sampah umum.',
      'Gunakan fungisida berbahan dasar tembaga organik hanya sebagai langkah terakhir untuk mencegah penyebaran ke daun yang sehat, bukan untuk menyembuhkan daun yang sudah sakit.',
    ],
    preventiveMeasures: [
      'Selalu siram tepat di pangkal tanah (akar), hindari menyiram dari atas yang membuat daun basah.',
      'Gunakan mulsa organik seperti jerami atau daun kering di atas tanah untuk mencegah air cipratan tanah mengenai daun bawah.',
      'Terapkan jarak tanam yang cukup agar udara bisa mengalir bebas di antara tanaman tomat untuk mengurangi kelembapan.',
    ],
    imageUrl: null,
  },
  {
    name: 'Hawar Awal (Early Blight)',
    slug: 'tomato-early-blight',
    scientificName: 'Alternaria solani',
    cropType: 'tomato',
    severity: 'medium',
    description: 'Penyakit jamur yang sangat umum dialami pemula berkebun tomat. Jamur ini biasanya menyerang daun tua di bagian bawah tanaman terlebih dahulu sebelum menyebar ke atas, terutama saat tanaman mulai berbunga atau berbuah.',
    symptoms: [
      'Fase Awal: Muncul bercak coklat kecil pada daun tua bagian bawah dengan pola lingkaran konsentris seperti cincin target atau mata banteng.',
      'Fase Lanjut: Jaringan di sekitar bercak menguning. Daun yang terinfeksi berat akan mengering dan rontok dari bawah ke atas secara bertahap.',
      'Pada Batang: Lesi gelap memanjang bisa muncul di pangkal batang bibit yang disebut collar rot, menyebabkan bibit roboh.',
    ],
    rootCauses: 'Spora jamur yang tersimpan di tanah atau sisa tanaman musim lalu. Menyebar melalui percikan air, angin, dan serangga. Tanaman yang kekurangan nutrisi lebih rentan.',
    treatment: [
      'Pangkas dan buang segera semua daun bawah yang menunjukkan gejala bercak target.',
      'Pastikan area di sekitar pangkal tanaman bersih dari daun-daun yang sudah gugur.',
      'Semprotkan fungisida organik berbahan mankozeb atau larutan baking soda (1 sendok teh per liter air) pada daun yang belum terinfeksi sebagai perlindungan.',
    ],
    preventiveMeasures: [
      'Berikan mulsa tebal di sekitar pangkal tanaman untuk mencegah spora di tanah memercik ke daun saat disiram.',
      'Rutin pangkas daun bawah yang sudah tua setiap minggu agar sirkulasi udara di bagian bawah tanaman tetap baik.',
      'Pastikan tanaman mendapat nutrisi yang cukup, terutama kalsium dan kalium, karena tanaman yang sehat lebih tahan terhadap serangan jamur.',
    ],
    imageUrl: null,
  },
  {
    name: 'Hawar Akhir (Late Blight)',
    slug: 'tomato-late-blight',
    scientificName: 'Phytophthora infestans',
    cropType: 'tomato',
    severity: 'high',
    description: 'Penyakit paling berbahaya pada tanaman tomat yang bisa menghancurkan seluruh tanaman hanya dalam 3–5 hari jika kondisi mendukung. Bukan jamur sejati melainkan organisme mirip jamur yang menyebar sangat cepat melalui udara, terutama saat cuaca dingin dan lembap.',
    symptoms: [
      'Fase Awal: Muncul bercak hijau gelap berminyak atau seperti basah kuyup pada tepi atau permukaan daun.',
      'Fase Lanjut: Bercak dengan cepat berubah menjadi coklat kehitaman. Pada kondisi lembap, bagian bawah daun ditumbuhi lapisan putih tipis berbulu halus yang merupakan spora penyakit.',
      'Pada Batang dan Buah: Batang menunjukkan lesi coklat kehitaman dan bisa patah. Buah membusuk dengan cepat menjadi coklat kehitaman dan berbau tidak sedap.',
    ],
    rootCauses: 'Cuaca dingin (10–20°C) dengan kelembapan tinggi di atas 90% selama beberapa jam adalah kondisi ideal penyebarannya. Spora menyebar sangat cepat melalui angin ke tanaman di sekitarnya.',
    treatment: [
      'TINDAKAN DARURAT: Segera pisahkan atau cabut seluruh tanaman yang terinfeksi dari area kebun untuk mencegah penyebaran ke tanaman lain.',
      'Masukkan tanaman yang terinfeksi ke dalam kantong plastik sebelum memindahkannya agar spora tidak menyebar ke udara. Buang ke tempat sampah, jangan dikompos.',
      'Semprotkan fungisida berbahan metalaksil atau tembaga pada tanaman yang belum terinfeksi di sekitarnya sebagai tindakan pencegahan darurat.',
    ],
    preventiveMeasures: [
      'Pantau prakiraan cuaca secara rutin. Saat cuaca diprediksi dingin dan hujan beberapa hari berturut-turut, lakukan penyemprotan fungisida preventif.',
      'Pastikan tanaman tidak terlalu rapat dan daun tidak saling menempel agar udara bisa mengalir dan daun cepat kering setelah hujan.',
      'Hindari menyiram di sore atau malam hari karena daun yang basah semalaman sangat rentan terhadap serangan penyakit ini.',
    ],
    imageUrl: null,
  },
  {
    name: 'Tomat Sehat (Healthy)',
    slug: 'tomato-healthy',
    scientificName: null,
    cropType: 'tomato',
    severity: 'low',
    description: 'Tanaman tomat dalam kondisi prima dan tumbuh dengan optimal. Pertahankan kondisi ini dengan perawatan rutin yang konsisten.',
    symptoms: [
      'Daun berwarna hijau tua segar dan merata tanpa bercak, lubang, atau perubahan warna.',
      'Batang tegak dan kokoh dengan ruas pertumbuhan yang normal.',
      'Pertumbuhan tunas baru terlihat aktif dan tanaman terlihat segar dan bersemangat.',
    ],
    rootCauses: 'Tidak ada masalah. Tanaman mendapatkan air, nutrisi, sinar matahari, dan sirkulasi udara yang cukup.',
    treatment: [
      'Tidak diperlukan penanganan khusus.',
      'Pertahankan jadwal penyiraman rutin di pagi hari langsung ke pangkal tanaman.',
      'Lanjutkan pemupukan seimbang setiap 2 minggu sekali untuk menjaga kesehatan tanaman.',
    ],
    preventiveMeasures: [
      'Periksa bagian bawah daun secara rutin setiap minggu untuk mendeteksi gejala awal penyakit sedini mungkin.',
      'Pangkas tunas air (tunas yang tumbuh di ketiak daun) secara rutin agar energi tanaman terfokus pada pertumbuhan buah.',
      'Pastikan tanaman mendapat sinar matahari penuh minimal 6–8 jam sehari untuk pertumbuhan yang optimal.',
    ],
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