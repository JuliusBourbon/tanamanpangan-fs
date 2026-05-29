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
    name: 'Bacterial Spot',
    slug: 'tomato-bacterial-spot',
    scientificName: 'Xanthomonas vesicatoria',
    cropType: 'tomato',
    severity: 'Medium',
    description: 'Bacterial spot is a highly destructive disease affecting tomato and pepper production worldwide. It causes dark brown to black lesions on all above-ground plant tissues, including leaves, stems, and fruits.',
    symptoms: [
      'Small, water-soaked or greasy-looking spots initially appearing on the underside of the leaves.',
      'Spots develop a light brown center with a dark margin, sometimes surrounded by a yellow halo.',
      "Enlarging spots become sunken on the upper leaf surface, darken, and the centers may crack or fall out.",
      "Coalescing leaf spots lead to general yellowing, necrosis, and eventual premature defoliation.",
      "On fruits, small brown to black spots appear, which later enlarge, become slightly raised, and develop a rough, scabby surface.",
      "Dark, elongated streaks or lesions can also form on stems and pedicels."
    ],
    rootCauses: "Infection by the bacterial spot species complex, which includes four distinct species: Xanthomonas euvesicatoria, Xanthomonas vesicatoria, Xanthomonas perforans, and Xanthomonas gardneri.",
    treatment: [
      "Application of copper-based agrochemicals (although commercial efficacy is currently limited due to widespread copper tolerance and resistance in pathogen populations)."
    ],
    preventiveMeasures: [
      "Implementing a combination of good cultural management tactics.",
      "Utilizing elite tomato cultivars bred with genetic resistance to the disease.",
      "Planting certified, pathogen-free seeds and transplants.",
      "Practicing crop rotation and maintaining field sanitation to minimize water-splashed bacterial spread."
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Bacterial_spot_on_tomato_leaf.jpg/2560px-Bacterial_spot_on_tomato_leaf.jpg"
  },
  {
    name: "Early Blight",
    slug: "tomato-early-blight",
    scientificName: "Alternaria solani, Alternaria tomatophila",
    cropType: "tomato",
    severity: "Medium",
    description: "Early blight is a very common and destructive fungal disease that affects tomato plants. It attacks the foliage, stems, and fruits. Infections typically begin on the older, lower leaves closest to the ground and gradually progress up the plant.",
    symptoms: [
      "Small dark spots initially appear on older foliage near the ground.",
      "Spots enlarge into circular lesions (up to 0.5 inches in diameter), turning brown and developing characteristic concentric rings that resemble a target or bulls-eye.",
      "Leaf tissue surrounding the spots often turns yellow (forming a yellow halo).",
      "Severely infected leaves turn brown, dry up, die, and eventually fall off (premature defoliation).",
      "On seedling stems, infections near the soil line cause dark, sunken, and dry lesions (collar rot) that can cause the seedling to wilt and die.",
      "On fruits, dark, leathery, and slightly sunken spots with concentric rings develop. These typically occur near the stem end of the fruit and can cause premature dropping."
    ],
    rootCauses: "Infection by the fungal pathogens Alternaria solani and Alternaria tomatophila. The fungal spores overwinter in the soil on infected plant debris, on seeds, or on weed hosts. The disease is easily spread by splashing water (rain or overhead watering) and thrives in warm temperatures with high humidity or heavy dew.",
    treatment: [
      "Prune or remove the lower leaves that first show symptoms (do not remove more than one-third of the plant's total foliage) to slow the spread and improve air circulation.",
      "Apply fungicides labeled for vegetables, such as those containing copper or chlorothalonil. Fungicides are most effective when applied as early as possible after the first symptoms appear or as a regular preventative measure."
    ],
    preventiveMeasures: [
      "Plant tomato varieties that are resistant or tolerant to early blight.",
      "Practice crop rotation by avoiding planting members of the Solanaceae family (tomatoes, potatoes, eggplants, peppers) in the same location for at least 2 consecutive years.",
      "Apply mulch (plastic or organic materials) over the soil under the plants to create a barrier, preventing soil-borne spores from splashing onto the leaves during rain.",
      "Water plants directly at the base (preferably using drip irrigation or soaker hoses) to keep the foliage dry.",
      "Provide adequate spacing between plants and use supports (staking or trellising) to ensure good air circulation.",
      "Clean up, burn, or dispose of all infected plant debris far from the garden at the end of the harvest season to prevent the fungus from overwintering in the soil."
    ],
    imageUrl: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcS58CsxjIIk7g7viD_r2-znyA6XmLdBSutkqFm953ihDb_ypJvUq0T3yg8LX6An"
  },
  {
    name: "Late Blight",
    slug: "tomato-late-blight",
    scientificName: "Phytophthora infestans",
    cropType: "tomato",
    severity: "High",
    description: "Late blight is a devastating plant disease that affects tomatoes and potatoes. Caused by a water mold (oomycete), it is famous for causing the Irish Potato Famine in the 1840s. It spreads rapidly through the air and can wipe out healthy plants almost overnight when the weather is cool and wet.",
    symptoms: [
      "Large, irregular, water-soaked, pale green to dark brown lesions appear on leaves, often starting near the edges or tips.",
      "During high humidity or wet weather, a fuzzy, white fungal-like growth (spores) appears on the underside of the infected leaves.",
      "Dark brown to black irregular, spreading lesions develop on the stems and petioles, which can cause the plant to collapse.",
      "On tomato fruits, firm, large, irregular, greasy-looking, olive-brown to dark brown spots appear.",
      "Unlike some other fruit rots, the late blight lesions on fruit remain firm rather than becoming soft and mushy (unless secondary pathogens invade).",
      "Entire plants can turn completely brown, shrivel, and die within a few days of the first symptoms."
    ],
    rootCauses: "Infection by the oomycete (water mold) pathogen Phytophthora infestans. The pathogen produces sporangia (spores) that can travel miles on the wind, especially during cloudy, stormy weather. It thrives in cool (60-70°F / 15-21°C) and highly moist or wet conditions. It cannot survive in dead plant tissue; it requires living host tissue (like infected potato tubers left in the soil or volunteer plants) to overwinter.",
    treatment: [
      "Once a plant is severely infected, there is no cure; infected plants should be immediately pulled up, bagged, and disposed of in the trash (do not compost) to prevent the spread to nearby plants and farms.",
      "Fungicides (such as those containing chlorothalonil or copper) can be applied, but they act strictly as a protectant and must be applied before the disease takes hold or at the very first sign of infection."
    ],
    preventiveMeasures: [
      "Plant late blight-resistant tomato varieties if the disease is common in your area.",
      "Monitor weather reports and local agricultural extension alerts for late blight outbreaks in your region.",
      "Destroy any volunteer tomato or potato plants from the previous season, as these can harbor the overwintering pathogen.",
      "Ensure excellent air circulation by spacing plants appropriately, staking, and pruning to allow leaves to dry quickly.",
      "Water at the base of the plant using drip irrigation or soaker hoses to keep the foliage completely dry.",
      "Apply preventative fungicides during periods of cool, wet weather, especially if the disease has been reported nearby."
    ],
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSK8fHCxum_s_UXidLY7D2AlyDTNbZiWn_3lKi3vkIsU31ud-clnGEDPzxhnerZ"
  }
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