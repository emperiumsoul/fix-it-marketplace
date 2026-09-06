import { ServiceProjectData } from "./types";

export interface CategoryPreset {
  promoTitle: string;
  promoTagline: string;
  promoChecks: string[];
  highlights: string[];
  projects: ServiceProjectData[];
  testimonial: {
    quote: string;
    author: string;
    rating: number;
  };
  reviews: {
    name: string;
    avatarLetter: string;
    avatarBg: string;
    rating: number;
    location: string;
    timeAgo: string;
    comment: string;
  }[];
  tags: string[];
  icon: "home" | "wrench" | "zap" | "paintbrush" | "truck" | "leaf" | "hammer";
}

export const CATEGORY_PRESETS: Record<string, CategoryPreset> = {
  plumbing: {
    promoTitle: "Plumbing repairs",
    promoTagline: "Reliable pipes. A sounder home.",
    promoChecks: ["Certified plumbers", "Rapid leak mitigation", "Guaranteed fittings"],
    highlights: [
      "Emergency leak and burst pipe detection",
      "PPR/PVC piping and drain unblocking",
      "Choose a convenient date and time",
    ],
    projects: [
      {
        title: "PPR pipe replacement & booster pump install",
        subtitle: "Clean, leak-free high pressure flow.",
        imageUrl: "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=800&q=80",
        hasOverlay: true,
      },
      {
        title: "Kitchen sink drain assembly",
        imageUrl: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80",
      },
      {
        title: "Water storage tank hookup",
        imageUrl: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80",
      },
    ],
    testimonial: {
      quote: "Fixed our compound's burst booster pump connection within 90 minutes. Neat work and zero mess left behind!",
      author: "Kwesi, Cantonments",
      rating: 5.0,
    },
    reviews: [
      {
        name: "Kwesi A.",
        avatarLetter: "K",
        avatarBg: "bg-[#1E3A8A]",
        rating: 5.0,
        location: "Cantonments",
        timeAgo: "1 week ago",
        comment: "Very prompt in diagnosing an elusive pipe leak behind our bathroom tiles without damaging the wall.",
      },
      {
        name: "Akua M.",
        avatarLetter: "A",
        avatarBg: "bg-[#065F46]",
        rating: 5.0,
        location: "Osu",
        timeAgo: "3 weeks ago",
        comment: "Excellent workmanship on replacing our kitchen sink traps and taps. Upfront pricing with no surprise add-ons.",
      },
      {
        name: "Ebenezer O.",
        avatarLetter: "E",
        avatarBg: "bg-[#9A3412]",
        rating: 4.8,
        location: "Airport Residential",
        timeAgo: "1 month ago",
        comment: "Calibrated our automated overhead tank float switch. Works seamlessly now.",
      },
      {
        name: "Derrick K.",
        avatarLetter: "D",
        avatarBg: "bg-[#374151]",
        rating: 5.0,
        location: "Tema",
        timeAgo: "2 months ago",
        comment: "Professional master plumber. Arrived on time with full tooling and replacement fittings.",
      },
    ],
    tags: ["Leak Repair", "Pipe Fitting", "Drain Unblocking", "Water Tank & Pump"],
    icon: "wrench",
  },

  "electrical-repairs": {
    promoTitle: "Electrical repairs",
    promoTagline: "Safe power. Uninterrupted living.",
    promoChecks: ["Licensed electricians", "Safety certified diagnostics", "Clean trunking & wiring"],
    highlights: [
      "Fault diagnostics and circuit breaker repairs",
      "Solar inverter and generator synchronization",
      "Choose a convenient date and time",
    ],
    projects: [
      {
        title: "Distribution board upgrade & circuit balancing",
        subtitle: "Safe, surge-protected domestic power.",
        imageUrl: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80",
        hasOverlay: true,
      },
      {
        title: "Hybrid inverter & battery installation",
        imageUrl: "https://images.unsplash.com/photo-1508873696983-2df57046475a?auto=format&fit=crop&w=600&q=80",
      },
      {
        title: "Chandelier and LED architectural lighting",
        imageUrl: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80",
      },
    ],
    testimonial: {
      quote: "Solved a persistent circuit breaker tripping fault that two previous electricians could not figure out. Highly recommended!",
      author: "Yaw, Kumasi",
      rating: 5.0,
    },
    reviews: [
      {
        name: "Yaw B.",
        avatarLetter: "Y",
        avatarBg: "bg-[#854D0E]",
        rating: 5.0,
        location: "Ahodwo, Kumasi",
        timeAgo: "2 weeks ago",
        comment: "Very knowledgeable technician. Calibrated our solar inverter changeover switch and rebalanced the phases.",
      },
      {
        name: "Sandra T.",
        avatarLetter: "S",
        avatarBg: "bg-[#701A75]",
        rating: 5.0,
        location: "Adum",
        timeAgo: "1 month ago",
        comment: "Neat surface trunking and installed 6 new heavy-duty AC sockets safely.",
      },
      {
        name: "Gideon F.",
        avatarLetter: "G",
        avatarBg: "bg-[#1E293B]",
        rating: 4.8,
        location: "KNUST Campus",
        timeAgo: "1 month ago",
        comment: "Punctual, carried complete digital multimeters and insulation testers. Great service.",
      },
      {
        name: "Bernice D.",
        avatarLetter: "B",
        avatarBg: "bg-[#14532D]",
        rating: 5.0,
        location: "Bantama",
        timeAgo: "2 months ago",
        comment: "Fixed our generator automated transfer switch. Power transitions smoothly now.",
      },
    ],
    tags: ["Fault Diagnostics", "Rewiring", "Circuit Breakers", "Inverter Setup"],
    icon: "zap",
  },

  "painting-decorating": {
    promoTitle: "Painting & decorating",
    promoTagline: "Vibrant walls. Flawless finishes.",
    promoChecks: ["Precision masking", "Moisture-proof coatings", "Zero messy splatters"],
    highlights: [
      "Interior wall skimming and smooth matte coats",
      "Weather-resistant exterior weatherproofing",
      "Choose a convenient date and time",
    ],
    projects: [
      {
        title: "Living room accent wall & POP ceiling finish",
        subtitle: "Smooth plaster and crisp color transitions.",
        imageUrl: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80",
        hasOverlay: true,
      },
      {
        title: "Exterior weatherproof wall coating",
        imageUrl: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=600&q=80",
      },
      {
        title: "Dining area cornice detailing",
        imageUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80",
      },
    ],
    testimonial: {
      quote: "Emmanuel transformed our four-bedroom house before moving in. Clean drop sheets, sharp straight ceiling edges, and very polite team.",
      author: "Nana, Spintex",
      rating: 5.0,
    },
    reviews: [
      {
        name: "Nana K.",
        avatarLetter: "N",
        avatarBg: "bg-[#164E63]",
        rating: 5.0,
        location: "Spintex",
        timeAgo: "3 weeks ago",
        comment: "The wall skimming was silky smooth. No lumps or visible roller streaks anywhere.",
      },
      {
        name: "Evelyn A.",
        avatarLetter: "E",
        avatarBg: "bg-[#831843]",
        rating: 5.0,
        location: "East Legon Hills",
        timeAgo: "1 month ago",
        comment: "Painted our perimeter walls with anti-fungal exterior paint. Looks brand new.",
      },
      {
        name: "Francis D.",
        avatarLetter: "F",
        avatarBg: "bg-[#365314]",
        rating: 4.8,
        location: "Sakumono",
        timeAgo: "2 months ago",
        comment: "Protected our tiled floors with heavy plastic sheets. Cleaned up thoroughly when finished.",
      },
      {
        name: "Priscilla B.",
        avatarLetter: "P",
        avatarBg: "bg-[#713F12]",
        rating: 5.0,
        location: "Tema Community 6",
        timeAgo: "3 months ago",
        comment: "Helped choose the perfect warm white shade. Work finished ahead of schedule.",
      },
    ],
    tags: ["Interior Painting", "Exterior Weatherproofing", "POP Ceilings", "Wall Skimming"],
    icon: "paintbrush",
  },

  "moving-relocation": {
    promoTitle: "Moving & relocation",
    promoTagline: "Careful handling. Stress-free moving.",
    promoChecks: ["Enclosed weatherproof trucks", "Bubble wrapping & blankets", "Trained handling crew"],
    highlights: [
      "Apartment and full home relocation",
      "Fragile electronics and glassware packing",
      "Choose a convenient date and time",
    ],
    projects: [
      {
        title: "Full townhouse relocation & furniture packing",
        subtitle: "Carefully wrapped and transported safely.",
        imageUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80",
        hasOverlay: true,
      },
      {
        title: "Secure box loading in covered truck",
        imageUrl: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=600&q=80",
      },
      {
        title: "Heavy appliance positioning",
        imageUrl: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80",
      },
    ],
    testimonial: {
      quote: "Punctual crew with an enclosed truck. They wrapped our 65-inch television and glass dining set with heavy blankets. Zero scratches!",
      author: "Abena, Accra",
      rating: 5.0,
    },
    reviews: [
      {
        name: "Abena P.",
        avatarLetter: "A",
        avatarBg: "bg-[#831843]",
        rating: 5.0,
        location: "East Legon",
        timeAgo: "2 weeks ago",
        comment: "Took great care of our wooden furniture. Heavy lifting handled effortlessly by 4 polite loaders.",
      },
      {
        name: "Kweku S.",
        avatarLetter: "K",
        avatarBg: "bg-[#1E3A8A]",
        rating: 5.0,
        location: "Tema",
        timeAgo: "1 month ago",
        comment: "Arrived at 7:00 AM sharp as promised. Moving from Tema to Accra was totally stress free.",
      },
      {
        name: "Mavis O.",
        avatarLetter: "M",
        avatarBg: "bg-[#065F46]",
        rating: 4.8,
        location: "Madina",
        timeAgo: "1 month ago",
        comment: "Reasonable transparent pricing in GHS with truck and all labor included.",
      },
      {
        name: "Charles T.",
        avatarLetter: "C",
        avatarBg: "bg-[#713F12]",
        rating: 5.0,
        location: "Cantonments",
        timeAgo: "2 months ago",
        comment: "Used SwiftHaul twice already. Consistently dependable moving service.",
      },
    ],
    tags: ["Home Moving", "Office Relocation", "Furniture Transport", "Packing & Hauling"],
    icon: "truck",
  },

  "gardening-landscaping": {
    promoTitle: "Garden & lawn care",
    promoTagline: "Lush compounds. Pristine outdoor spaces.",
    promoChecks: ["Petrol lawn mowers", "Hedge & palm trimming", "Green waste disposal"],
    highlights: [
      "Compound mowing and perimeter weed clearing",
      "Shrub shaping and decorative flowerbed care",
      "Choose a convenient date and time",
    ],
    projects: [
      {
        title: "Compound lawn edging & ornamental pruning",
        subtitle: "A neat, refreshing outdoor compound.",
        imageUrl: "https://images.unsplash.com/photo-1557429287-b2e26467fc2b?auto=format&fit=crop&w=800&q=80",
        hasOverlay: true,
      },
      {
        title: "Bougainvillea hedge trimming",
        imageUrl: "https://images.unsplash.com/photo-1592417817098-8f3d6910985c?auto=format&fit=crop&w=600&q=80",
      },
      {
        title: "Clean compound sweep and bagged trimmings",
        imageUrl: "https://images.unsplash.com/photo-1558904541-efa8c4a08931?auto=format&fit=crop&w=600&q=80",
      },
    ],
    testimonial: {
      quote: "Yaw trimmed our overgrown hedges and cut the compound grass evenly in under 3 hours. Bagged all garden waste neatly.",
      author: "Kojo, Legon Hills",
      rating: 4.9,
    },
    reviews: [
      {
        name: "Kojo F.",
        avatarLetter: "K",
        avatarBg: "bg-[#14532D]",
        rating: 5.0,
        location: "Legon Hills",
        timeAgo: "1 week ago",
        comment: "Excellent lawn edging with sharp borders around our walkways.",
      },
      {
        name: "Vivian E.",
        avatarLetter: "V",
        avatarBg: "bg-[#701A75]",
        rating: 5.0,
        location: "Adenta",
        timeAgo: "3 weeks ago",
        comment: "Brought petrol strimmers and lawn mowers. Very polite and hard working.",
      },
      {
        name: "Joshua N.",
        avatarLetter: "J",
        avatarBg: "bg-[#1E293B]",
        rating: 4.8,
        location: "East Legon",
        timeAgo: "1 month ago",
        comment: "Treated our grass patches and shaped our potted palms nicely.",
      },
      {
        name: "Theresa B.",
        avatarLetter: "T",
        avatarBg: "bg-[#854D0E]",
        rating: 5.0,
        location: "Haatso",
        timeAgo: "2 months ago",
        comment: "Booked recurring bi-weekly compound upkeep. Always reliable.",
      },
    ],
    tags: ["Lawn Mowing", "Hedge Trimming", "Garden Upkeep", "Weed Clearing"],
    icon: "leaf",
  },

  "furniture-assembly": {
    promoTitle: "Furniture assembly",
    promoTagline: "Solid builds. Perfectly mounted.",
    promoChecks: ["Precision laser leveling", "Heavy-duty wall anchors", "No wobbly joints"],
    highlights: [
      "Flat-pack wardrobes, bed frames, and desk assembly",
      "TV wall mounting into brick and concrete walls",
      "Choose a convenient date and time",
    ],
    projects: [
      {
        title: "Multi-door wardrobe & media console assembly",
        subtitle: "Sturdy fittings and level alignments.",
        imageUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80",
        hasOverlay: true,
      },
      {
        title: "Heavy TV wall mount with concealed cables",
        imageUrl: "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=600&q=80",
      },
      {
        title: "Office executive desk and ergonomic chair setup",
        imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80",
      },
    ],
    testimonial: {
      quote: "Assembled our complex 6-door flat-pack wardrobe and mounted our 75-inch TV into concrete effortlessly. 10/10 service!",
      author: "Selorm, Osu",
      rating: 5.0,
    },
    reviews: [
      {
        name: "Selorm A.",
        avatarLetter: "S",
        avatarBg: "bg-[#1E3A8A]",
        rating: 5.0,
        location: "Osu",
        timeAgo: "2 weeks ago",
        comment: "Carried all Allen keys, electric drills, and heavy-duty Fischer wall plugs.",
      },
      {
        name: "Beatrice M.",
        avatarLetter: "B",
        avatarBg: "bg-[#831843]",
        rating: 5.0,
        location: "Cantonments",
        timeAgo: "3 weeks ago",
        comment: "Assembled our dining table and 6 chairs in less than an hour. Very sturdy.",
      },
      {
        name: "Michael K.",
        avatarLetter: "M",
        avatarBg: "bg-[#14532D]",
        rating: 4.8,
        location: "Airport Residential",
        timeAgo: "1 month ago",
        comment: "Used a laser level to ensure our television was perfectly level.",
      },
      {
        name: "Janet O.",
        avatarLetter: "J",
        avatarBg: "bg-[#374151]",
        rating: 5.0,
        location: "East Legon",
        timeAgo: "2 months ago",
        comment: "Professional and cleaned up all packaging cardboard before leaving.",
      },
    ],
    tags: ["Flat-Pack Assembly", "TV Wall Mounting", "Bed Frame Assembly", "Handyman"],
    icon: "hammer",
  },

  // Default cleaning preset matching 5.png
  cleaning: {
    promoTitle: "Home cleaning",
    promoTagline: "A cleaner home. A happier you.",
    promoChecks: ["Reliable", "Detail oriented", "Sparkling results"],
    highlights: [
      "Regular and deep cleaning options",
      "Kitchen, bathroom and living-space cleaning",
      "Choose a convenient date and time",
    ],
    projects: [
      {
        title: "Kitchen and living-room refresh",
        subtitle: "A cleaner, brighter space.",
        imageUrl: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80",
        hasOverlay: true,
      },
      {
        title: "Bathroom deep scrub and descaling",
        imageUrl: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80",
      },
      {
        title: "Freshly organized hallway and supplies",
        imageUrl: "https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&w=600&q=80",
      },
    ],
    testimonial: {
      quote: "Clear communication and careful attention to detail. My apartment looks amazing!",
      author: "Ama, Accra",
      rating: 5.0,
    },
    reviews: [
      {
        name: "Ama K.",
        avatarLetter: "A",
        avatarBg: "bg-[#71717A]",
        rating: 5.0,
        location: "Accra",
        timeAgo: "2 weeks ago",
        comment: "Very thorough and professional. My house looks and smells so fresh. Great attention to detail.",
      },
      {
        name: "Kofi M.",
        avatarLetter: "K",
        avatarBg: "bg-[#831843]",
        rating: 5.0,
        location: "Tema",
        timeAgo: "1 month ago",
        comment: "Punctual, friendly and did an excellent job. Highly recommend!",
      },
      {
        name: "Efua S.",
        avatarLetter: "E",
        avatarBg: "bg-[#9D174D]",
        rating: 4.0,
        location: "Accra",
        timeAgo: "1 month ago",
        comment: "Good service and clear communication. Will book again.",
      },
      {
        name: "Daniel A.",
        avatarLetter: "D",
        avatarBg: "bg-[#991B1B]",
        rating: 5.0,
        location: "East Legon",
        timeAgo: "2 months ago",
        comment: "Reliable and hardworking. My apartment was spotless.",
      },
    ],
    tags: ["House Cleaning", "Deep Cleaning", "Regular Cleaning", "Move-out Cleaning"],
    icon: "home",
  },
};

export function getCategoryPreset(categorySlugOrTitle: string): CategoryPreset {
  const normalized = (categorySlugOrTitle || "").toLowerCase().trim();
  if (normalized.includes("plumb")) return CATEGORY_PRESETS["plumbing"];
  if (normalized.includes("electr")) return CATEGORY_PRESETS["electrical-repairs"];
  if (normalized.includes("paint")) return CATEGORY_PRESETS["painting-decorating"];
  if (normalized.includes("mov")) return CATEGORY_PRESETS["moving-relocation"];
  if (normalized.includes("garden") || normalized.includes("lawn")) return CATEGORY_PRESETS["gardening-landscaping"];
  if (normalized.includes("furnit") || normalized.includes("assembl")) return CATEGORY_PRESETS["furniture-assembly"];
  return CATEGORY_PRESETS["cleaning"];
}
