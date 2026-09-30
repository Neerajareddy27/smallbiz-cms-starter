// Seed script: fills the database with realistic sample content for "Bloom & Co.",
// a fictional florist. Replace the values below (or just edit everything in /admin)
// when starting a new client project.
//
//   npm run db:seed              -> wipe + reseed
//   tsx prisma/seed.ts --if-empty -> only seeds when there's no data (used by `npm run dev`)
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

async function main() {
  if (process.argv.includes("--if-empty") && (await db.settings.count()) > 0) return;

  // Wipe existing content so re-running the seed is always safe.
  await db.$transaction([
    db.inquiry.deleteMany(),
    db.galleryItem.deleteMany(),
    db.service.deleteMany(),
    db.aboutContent.deleteMany(),
    db.settings.deleteMany(),
  ]);

  await db.settings.create({
    data: {
      id: 1,
      businessName: "Bloom & Co.",
      tagline: "Fresh flowers, thoughtfully arranged.",
      heroTitle: "Flowers that say what words can't",
      heroSubtitle:
        "Hand-tied bouquets, wedding florals and event styling from our little studio on Maple Street, made fresh every morning.",
      heroImageUrl: "/samples/hero.svg",
      whatsappNumber: "15551234567",
      phoneNumber: "+1 555 123 4567",
      email: "hello@bloomandco.example",
      address: "24 Maple Street, Springfield",
      instagramUrl: "https://instagram.com/bloomandco",
      facebookUrl: "https://facebook.com/bloomandco",
      twitterUrl: "https://x.com/bloomandco",
      youtubeUrl: "https://youtube.com/@bloomandco",
    },
  });

  await db.aboutContent.create({
    data: {
      id: 1,
      title: "Rooted in community, growing with care",
      imageUrl: "/samples/about.svg",
      body: [
        "Bloom & Co. began in 2015 as a tiny market stall with a bucket of tulips and a big idea: flowers should feel personal, not mass-produced.",
        "Today we're a five-person studio working directly with local growers. Every bouquet is designed by hand, using what's freshest and in season, so no two arrangements are ever quite the same.",
        "Whether it's a last-minute thank-you, a wedding with two hundred guests, or a weekly delivery for your café, we treat every order as if it were going to our own family.",
      ].join("\n\n"),
    },
  });

  const services = [
    ["Custom Bouquets", "Hand-tied bouquets designed around your colours, occasion and budget. Same-day delivery available within the city.", "From $45", true],
    ["Wedding Florals", "Bridal bouquets, ceremony arches, centrepieces and more. Includes a free consultation and tasting-style mock-up.", "From $850", true],
    ["Event Styling", "Full floral design for parties, corporate launches and dinners, from installation through to clean-up.", "From $400", true],
    ["Weekly Subscription", "A fresh seasonal arrangement delivered to your home or office every week. Pause or cancel any time.", "$35 / week", false],
    ["Floral Workshops", "Two-hour hands-on classes where you'll learn to arrange a bouquet and take it home. All materials included.", "$60 per person", false],
  ] as const;
  for (const [i, [name, description, price, featured]] of services.entries()) {
    await db.service.create({
      data: { name, description, price, featured, imageUrl: `/samples/service-${i + 1}.svg` },
    });
  }

  const captions = [
    "Spring peony bouquet",
    "Rustic wedding arch",
    "Garden-style table centrepiece",
    "Blush and cream bridal bouquet",
    "Our studio on a busy Saturday",
    "Dried flower wreath",
    "Autumn harvest arrangement",
    "Workshop class in full bloom",
  ];
  for (const [i, caption] of captions.entries()) {
    await db.galleryItem.create({ data: { type: "IMAGE", url: `/samples/gallery-${i + 1}.svg`, caption } });
  }
  // A sample video (any direct .mp4 URL or YouTube link works).
  await db.galleryItem.create({
    data: {
      type: "VIDEO",
      url: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
      caption: "Time-lapse: a bloom opens",
    },
  });

  await db.inquiry.createMany({
    data: [
      {
        name: "Priya Sharma",
        email: "priya@example.com",
        phone: "+1 555 010 2233",
        message: "Hi! We're getting married on June 14th and would love a quote for bridal bouquets and table centrepieces for about 80 guests.",
        read: false,
      },
      {
        name: "Daniel Okafor",
        email: "daniel.o@example.com",
        phone: "",
        message: "Do you deliver to the north side of town? I'd like to send flowers to my mum for her birthday on Friday.",
        read: false,
      },
      {
        name: "Mei Tanaka",
        email: "mei.t@example.com",
        phone: "+1 555 010 8891",
        message: "Interested in the weekly subscription for our café. Could you tell me what's included and whether there's a discount for 3+ months?",
        read: true,
      },
    ],
  });

  console.log("✓ Seeded Bloom & Co. sample data");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
