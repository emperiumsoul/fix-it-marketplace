import {
  Zap,
  Wrench,
  Sparkles,
  Paintbrush,
  Truck,
  Armchair,
  Flower2,
  Hammer,
  Home,
  Building2,
  type LucideIcon,
} from "lucide-react";

export interface CategoryPreset {
  title: string;
  heroSubtitle: string;
  popularSubcategories: Array<{ name: string; query: string; icon?: LucideIcon }>;
  exploreCards: Array<{
    title: string;
    imageUrl: string;
    subItems: string[];
  }>;
  faqs: Array<{ question: string; answer: string }>;
  tags: string[];
}

export const CATEGORY_PRESETS: Record<string, CategoryPreset> = {
  "electrical-repairs": {
    title: "Electrical Repairs",
    heroSubtitle: "Certified electricians for wiring, circuit breaker repairs, inverter setups, and safe electrical installations in Ghana.",
    popularSubcategories: [
      { name: "Wiring & Rewiring", query: "Wiring", icon: Zap },
      { name: "Circuit Breaker / Fuse", query: "Circuit Breaker", icon: Zap },
      { name: "Ceiling Fan & Lighting", query: "Lighting Installation", icon: Zap },
      { name: "Generator & Inverter", query: "Inverter Installation", icon: Zap },
      { name: "Socket & Switch Repair", query: "Socket Repair", icon: Zap },
    ],
    exploreCards: [
      {
        title: "Residential Wiring & Safety",
        imageUrl: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=500&q=80",
        subItems: ["Full House Rewiring", "Cable Concealment", "Fault Troubleshooting", "Earth Grounding Installation"],
      },
      {
        title: "Distribution Boards & Breakers",
        imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=500&q=80",
        subItems: ["DB Board Replacement", "Circuit Breaker Tripping Fix", "Surge Protection", "Industrial 3-Phase Setup"],
      },
      {
        title: "Lighting & Fixture Installations",
        imageUrl: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=500&q=80",
        subItems: ["Chandeliers & Pendant Lights", "LED Strip Lighting", "Outdoor Security Floodlights", "Ceiling Fan Fitting"],
      },
      {
        title: "Generators, Inverters & Solar",
        imageUrl: "https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=500&q=80",
        subItems: ["Changeover Switch Setup", "Home Inverter Installation", "Solar Panel Wiring", "Backup Generator Hookup"],
      },
      {
        title: "Sockets, Switches & Outlets",
        imageUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=500&q=80",
        subItems: ["Wall Socket Replacement", "Smart Switches", "AC Dedicated Outlets", "Water Heater Switch"],
      },
      {
        title: "Emergency Electrical Troubleshooting",
        imageUrl: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=500&q=80",
        subItems: ["Burning Smell Diagnosis", "Blackout Restoration", "Appliance Short Circuit Fix", "24/7 Rapid Response"],
      },
    ],
    faqs: [
      {
        question: "Are your electricians certified and experienced with Ghanaian standards?",
        answer: "Yes. Electricians on Fix it are verified professionals experienced with Ghanaian Energy Commission regulations and British Standard (BS 7671) wiring systems.",
      },
      {
        question: "How are electrical repair prices determined?",
        answer: "Pricing starts from transparent base rates in GHS for diagnostics and routine repairs. For major rewiring or parts replacement, the provider provides a clear itemized quote before work starts.",
      },
      {
        question: "Do providers bring their own diagnostic tools and materials?",
        answer: "Providers arrive with multi-meters, voltage detectors, insulation testers, and core hand tools. Specific replacement parts (breakers, conduits, cables) can be supplied by the provider or purchased jointly.",
      },
      {
        question: "Can an electrician install a backup generator or automatic changeover switch?",
        answer: "Yes, many of our verified electrical contractors specialize in automatic and manual changeover switches for residential and commercial generators.",
      },
    ],
    tags: [
      "Electrical Wiring",
      "Circuit Breakers",
      "Generator Changeover",
      "Ceiling Fan Installation",
      "Inverter Setup",
      "Socket Repair",
      "Security Lights",
      "Earthing Installation",
      "Emergency Electrician Accra",
      "Solar Electrical",
    ],
  },

  plumbing: {
    title: "Plumbing",
    heroSubtitle: "Experienced plumbers for leak repairs, drain unblocking, bathroom renovations, and pump installations across Ghana.",
    popularSubcategories: [
      { name: "Leak Detection & Pipe Repair", query: "Pipe Leak", icon: Wrench },
      { name: "Drain & Sewer Unblocking", query: "Drain Unblocking", icon: Wrench },
      { name: "Toilet & Tap Repair", query: "Tap Repair", icon: Wrench },
      { name: "Water Heater Installation", query: "Water Heater", icon: Wrench },
      { name: "Borehole & Water Tank Setup", query: "Water Tank", icon: Wrench },
    ],
    exploreCards: [
      {
        title: "Pipe Repairs & Leak Fixes",
        imageUrl: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=500&q=80",
        subItems: ["Burst Pipe Repair", "Under-Sink Leaks", "Wall Seepage Diagnosis", "PPR / PVC Pipe Fitting"],
      },
      {
        title: "Bathroom & Toilet Plumbing",
        imageUrl: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=500&q=80",
        subItems: ["Commode / Toilet Installation", "Shower Mixer Valve", "Sink & Vanity Fitting", "Bidet Sprayer Setup"],
      },
      {
        title: "Drain Cleaning & Unblocking",
        imageUrl: "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=500&q=80",
        subItems: ["Kitchen Sink Unblocking", "Floor Drain Clearing", "Inspection Chamber Cleaning", "Septic Line Flushing"],
      },
      {
        title: "Water Storage Tanks & Pumps",
        imageUrl: "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&w=500&q=80",
        subItems: ["Polytank Installation", "Booster Pump Servicing", "Float Valve Replacement", "Borehole Pump Setup"],
      },
      {
        title: "Water Heaters & Geysers",
        imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=500&q=80",
        subItems: ["Electric Water Heater Setup", "Instant Shower Geysers", "Thermostat Replacement", "Pressure Relief Valve Fix"],
      },
      {
        title: "Kitchen Plumbing & Waste Disposal",
        imageUrl: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=500&q=80",
        subItems: ["Double Sink Installation", "Washing Machine Hookup", "Grease Trap Cleaning", "Water Filter Fitting"],
      },
    ],
    faqs: [
      {
        question: "How quickly can a plumber arrive in an emergency leak?",
        answer: "Many verified plumbers offer same-day and emergency call-outs within 1 to 2 hours in Accra, Tema, and Kumasi.",
      },
      {
        question: "Do your plumbers handle Polytank and water booster pump installation?",
        answer: "Yes, our plumbers regularly install overhead and ground Polytanks, automatic pressure pumps, and float control valves.",
      },
      {
        question: "Who purchases the pipes and fittings?",
        answer: "The plumber can inspect your setup, provide a bill of quantities for required materials, and either purchase them for you with receipts or accompany you to the hardware store.",
      },
    ],
    tags: [
      "Pipe Leak Repair",
      "Drain Clearing",
      "Toilet Installation",
      "Polytank Setup",
      "Booster Pump",
      "Water Heater",
      "Shower Mixer",
      "PPR Welding",
      "Plumber Accra",
      "Plumber Kumasi",
    ],
  },

  "house-cleaning": {
    title: "House Cleaning",
    heroSubtitle: "A cleaner space, without the hassle. Book verified residential, commercial, and move-out cleaners in Ghana.",
    popularSubcategories: [
      { name: "House Cleaning", query: "House Cleaning", icon: Home },
      { name: "Deep Cleaning", query: "Deep Cleaning", icon: Sparkles },
      { name: "Office Cleaning", query: "Office Cleaning", icon: Building2 },
      { name: "Move-out Cleaning", query: "Move-out Cleaning", icon: Truck },
      { name: "Sofa Cleaning", query: "Sofa Cleaning", icon: Armchair },
    ],
    exploreCards: [
      {
        title: "Home & Apartment Cleaning",
        imageUrl: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=500&q=80",
        subItems: ["Regular Cleaning", "Deep Cleaning", "Kitchen Cleaning", "Bathroom Sanitization"],
      },
      {
        title: "Office & Commercial Spaces",
        imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=500&q=80",
        subItems: ["Daily Office Upkeep", "Conference Rooms", "Shared Workspaces", "Sanitary Services"],
      },
      {
        title: "Move-in & Move-out Cleaning",
        imageUrl: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=500&q=80",
        subItems: ["End-of-Tenancy Cleaning", "Interior Cupboards", "Window Washing", "Floor Scrubbing"],
      },
      {
        title: "Sofa, Carpet & Mattress Cleaning",
        imageUrl: "https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&w=500&q=80",
        subItems: ["Fabric Sofa Shampooing", "Leather Conditioning", "Carpet Stain Removal", "Mattress Steam Cleaning"],
      },
      {
        title: "Post-Construction Cleanup",
        imageUrl: "https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=500&q=80",
        subItems: ["Paint Splatter Removal", "Cement Dust Cleanup", "Grout Cleaning", "Initial Habitation Clean"],
      },
      {
        title: "Compound & Outdoor Cleaning",
        imageUrl: "https://images.unsplash.com/photo-1558904541-efa8c4a08931?auto=format&fit=crop&w=500&q=80",
        subItems: ["Pavement Pressure Washing", "Gutter Sweeping", "Trash Removal", "Patio Scrubbing"],
      },
    ],
    faqs: [
      {
        question: "What is included in a standard house cleaning service?",
        answer: "A standard clean covers dusting, sweeping, mopping, bathroom scrubbing, kitchen counter wiping, and trash disposal across all main rooms.",
      },
      {
        question: "Do I need to provide cleaning detergents and equipment?",
        answer: "Most service providers bring their own specialized detergents, microfiber cloths, and mops. You can select packages with supplies included or request using your preferred brands.",
      },
      {
        question: "Can I book recurring weekly or bi-weekly cleaning?",
        answer: "Yes! Many providers offer scheduled weekly or monthly recurring packages at discounted rates.",
      },
    ],
    tags: [
      "Residential Cleaning",
      "Deep Clean Accra",
      "Sofa Shampooing",
      "Move-out Cleaning",
      "Post Construction Cleanup",
      "Window Cleaning",
      "Carpet Wash",
      "Office Cleaning Ghana",
    ],
  },

  "painting-decorating": {
    title: "Painting",
    heroSubtitle: "Professional painters for interior walls, exterior facades, POP ceiling finishes, and textured wall designs.",
    popularSubcategories: [
      { name: "Interior Wall Painting", query: "Interior Painting", icon: Paintbrush },
      { name: "Exterior Building Painting", query: "Exterior Painting", icon: Paintbrush },
      { name: "POP Ceiling Finishing", query: "POP Ceiling", icon: Paintbrush },
      { name: "Waterproofing & Priming", query: "Waterproofing", icon: Paintbrush },
      { name: "Wood & Metal Varnishing", query: "Varnish", icon: Paintbrush },
    ],
    exploreCards: [
      {
        title: "Interior Wall & Room Painting",
        imageUrl: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=500&q=80",
        subItems: ["Living Room Repaint", "Bedroom Accent Walls", "Washable Silk / Matte Finish", "Drywall Sanding & Primer"],
      },
      {
        title: "Exterior House & Compound Walls",
        imageUrl: "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=500&q=80",
        subItems: ["Weather-Shield Painting", "Compound Fence Wall Painting", "High-Reach Scaffold Work", "Fungus & Mold Treatment"],
      },
      {
        title: "POP & Screeding Works",
        imageUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=500&q=80",
        subItems: ["Wall Screeding for Smooth Finish", "POP Ceiling Painting", "Crown Molding Detailing", "Crack Patching"],
      },
      {
        title: "Specialty Finishes & Textures",
        imageUrl: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=500&q=80",
        subItems: ["Stucco / Coral Finish", "Wood Varnishing & Polishing", "Gate & Burglar Proof Painting", "Epoxy Floor Coatings"],
      },
    ],
    faqs: [
      {
        question: "How is the painting cost calculated?",
        answer: "Painting is typically priced per room, per square meter, or per full house package. Packages outline surface preparation, primer coats, and finishing coats.",
      },
      {
        question: "Do painters help choose the right paint brands?",
        answer: "Yes, experienced painters advise on top-performing Ghanaian and international paints (Dulux, Coral, Azar, Leyland) suitable for tropical humidity.",
      },
    ],
    tags: [
      "Interior Painting",
      "Exterior Painting",
      "Wall Screeding",
      "POP Finishing",
      "Weather Shield",
      "Painter in Accra",
      "Gate Painting",
    ],
  },

  "moving-relocation": {
    title: "Moving",
    heroSubtitle: "Hassle-free home and office moving, packing, heavy lifting, and delivery services across Greater Accra and Ghana.",
    popularSubcategories: [
      { name: "House Moving", query: "House Moving", icon: Truck },
      { name: "Office Relocation", query: "Office Moving", icon: Truck },
      { name: "Furniture Loading & Transport", query: "Furniture Transport", icon: Truck },
      { name: "Packing & Boxing Services", query: "Packing", icon: Truck },
      { name: "Inter-City Delivery", query: "Inter-City Moving", icon: Truck },
    ],
    exploreCards: [
      {
        title: "Residential House Moving",
        imageUrl: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=500&q=80",
        subItems: ["1-3 Bedroom Apartments", "Full Compound Houses", "Furniture Dismantling", "Placement at New Home"],
      },
      {
        title: "Office & Business Relocation",
        imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=500&q=80",
        subItems: ["Office Desks & Chairs", "IT Equipment Handling", "Filing Cabinets", "Weekend Relocations"],
      },
      {
        title: "Packing, Boxing & Protection",
        imageUrl: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=500&q=80",
        subItems: ["Bubble Wrap for Fragile Items", "Heavy-Duty Cartons", "Wardrobe Boxes", "Tape & Blankets Provided"],
      },
      {
        title: "Pickup & Delivery Truck Hire",
        imageUrl: "https://images.unsplash.com/photo-1586769852044-692d6e3703f0?auto=format&fit=crop&w=500&q=80",
        subItems: ["Mini Trucks / Kia Bongo", "Enclosed Box Vans", "Loading Helpers Included", "Accra - Kumasi - Takoradi"],
      },
    ],
    faqs: [
      {
        question: "Does the moving team provide packing materials?",
        answer: "Yes, moving packages can include cartons, bubble wraps, and mattress covers, or you can opt for labor and vehicle only.",
      },
      {
        question: "Can the team disassemble and reassemble large furniture?",
        answer: "Yes, movers carry toolkits to dismantle beds, wardrobes, and dining tables and reassemble them at your new location.",
      },
    ],
    tags: [
      "House Moving Accra",
      "Office Relocation",
      "Kia Bongo Truck Hire",
      "Furniture Moving",
      "Packing Services",
      "Intercity Relocation Ghana",
    ],
  },

  "gardening-landscaping": {
    title: "Gardening",
    heroSubtitle: "Professional gardeners and landscapers for lawn mowing, hedge trimming, weed clearing, and garden design.",
    popularSubcategories: [
      { name: "Lawn Mowing & Maintenance", query: "Lawn Mowing", icon: Flower2 },
      { name: "Hedge Trimming & Pruning", query: "Hedge Trimming", icon: Flower2 },
      { name: "Landscape Design & Turfing", query: "Landscaping", icon: Flower2 },
      { name: "Compound Weed Control", query: "Weed Control", icon: Flower2 },
      { name: "Tree Cutting & Lopping", query: "Tree Cutting", icon: Flower2 },
    ],
    exploreCards: [
      {
        title: "Lawn Care & Grass Mowing",
        imageUrl: "https://images.unsplash.com/photo-1558904541-efa8c4a08931?auto=format&fit=crop&w=500&q=80",
        subItems: ["Motorized Mower Cutting", "Edge Trimming", "Bermuda / Carpet Grass Care", "Grass Fertilization"],
      },
      {
        title: "Hedge Trimming & Tree Care",
        imageUrl: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=500&q=80",
        subItems: ["Ficus / Bougainvillea Shaping", "Palm Tree Pruning", "Dead Branch Removal", "Overhanging Limb Cutting"],
      },
      {
        title: "Landscape Design & Planting",
        imageUrl: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=500&q=80",
        subItems: ["Ornamental Plant Installation", "Flowerbed Design", "Paver & Gravel Paths", "Rock Gardens"],
      },
      {
        title: "Compound Clearing & Weed Control",
        imageUrl: "https://images.unsplash.com/photo-1592417817098-8f3d69104a47?auto=format&fit=crop&w=500&q=80",
        subItems: ["Bush Clearing", "Herbicide Application", "Gravel Bed Weeding", "Debris Haulage"],
      },
    ],
    faqs: [
      {
        question: "Do gardeners bring their own motorized lawnmowers and hedge trimmers?",
        answer: "Yes, gardeners bring motorized brush cutters, lawnmowers, shears, and rakes to ensure a clean finish.",
      },
      {
        question: "Is garden waste removed after the service?",
        answer: "Standard packages include bagging and disposal of trimmed branches, grass clippings, and garden debris.",
      },
    ],
    tags: [
      "Lawn Mowing",
      "Gardener Accra",
      "Hedge Trimming",
      "Carpet Grass",
      "Bush Clearing",
      "Landscaping Ghana",
    ],
  },

  "furniture-assembly": {
    title: "Furniture Assembly",
    heroSubtitle: "Handymen for assembling flat-pack furniture, TV wall mounting, bed frame setups, and custom fittings.",
    popularSubcategories: [
      { name: "Bed & Wardrobe Assembly", query: "Bed Assembly", icon: Hammer },
      { name: "TV Wall Mounting", query: "TV Mounting", icon: Hammer },
      { name: "Office Desk & Chair Assembly", query: "Office Desk Assembly", icon: Hammer },
      { name: "Kitchen Cabinet Fitting", query: "Cabinet Assembly", icon: Hammer },
      { name: "Curtain Rods & Shelving", query: "Curtain Rods", icon: Hammer },
    ],
    exploreCards: [
      {
        title: "Bedroom Furniture Setup",
        imageUrl: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=500&q=80",
        subItems: ["Platform Beds", "Sliding Door Wardrobes", "Dressing Tables & Mirrors", "Nightstands"],
      },
      {
        title: "Living Room & Wall Fixtures",
        imageUrl: "https://images.unsplash.com/photo-1540518614846-7ede433c4550?auto=format&fit=crop&w=500&q=80",
        subItems: ["TV Wall Brackets (32\" - 85\")", "Floating Shelves", "Curtain Rods & Blinds", "Picture Frames & Art"],
      },
      {
        title: "Office & Study Workstations",
        imageUrl: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=500&q=80",
        subItems: ["Ergonomic Desk Assembly", "Executive Chairs", "Bookcases & Book Shelves", "Cable Management"],
      },
    ],
    faqs: [
      {
        question: "Can the handyman mount large TV screens on concrete and drywall?",
        answer: "Yes, specialists carry heavy-duty masonry drill bits, anchor plugs, and level gauges for secure mounting on all Ghanaian block walls.",
      },
    ],
    tags: ["TV Wall Mounting", "Wardrobe Assembly", "Bed Assembly", "Handyman Accra", "Curtain Rod Fitting"],
  },

  "appliance-home-repairs": {
    title: "Home Repairs",
    heroSubtitle: "Skilled technicians for air conditioner servicing, washing machines, refrigerators, generators, and general home repairs.",
    popularSubcategories: [
      { name: "Air Conditioner Servicing", query: "AC Servicing", icon: Wrench },
      { name: "Refrigerator & Freezer Repair", query: "Fridge Repair", icon: Wrench },
      { name: "Washing Machine Repair", query: "Washing Machine Repair", icon: Wrench },
      { name: "Door Locks & Carpentry Fixes", query: "Locksmith", icon: Hammer },
      { name: "Roof & Ceiling Leaks", query: "Roof Repair", icon: Hammer },
    ],
    exploreCards: [
      {
        title: "Air Conditioning Maintenance",
        imageUrl: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=500&q=80",
        subItems: ["Chemical AC Wash", "Gas Refill (R410A / R22)", "Compressor Troubleshooting", "Water Dripping Repair"],
      },
      {
        title: "Kitchen & Laundry Appliances",
        imageUrl: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=500&q=80",
        subItems: ["Automatic Washing Machine Fix", "Fridge Not Cooling Fix", "Microwave Repair", "Oven Heating Element"],
      },
      {
        title: "Carpentry, Doors & Locks",
        imageUrl: "https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?auto=format&fit=crop&w=500&q=80",
        subItems: ["Door Lock Installation", "Hinge Replacement", "Kitchen Drawer Alignment", "Security Gate Locks"],
      },
    ],
    faqs: [
      {
        question: "Do technicians provide genuine replacement parts for appliances?",
        answer: "Yes, verified repair specialists test and source compatible OEM parts (Samsung, LG, Nasco, Midea, Bruhm) with warranty receipts.",
      },
    ],
    tags: ["AC Servicing Accra", "Fridge Repair", "Washing Machine Repair", "Gas Refill", "Locksmith", "Handyman Ghana"],
  },
};

export function getCategoryPreset(slug: string): CategoryPreset {
  const normalized = slug.toLowerCase().trim();

  if (normalized.includes("electric")) return CATEGORY_PRESETS["electrical-repairs"];
  if (normalized.includes("plumb")) return CATEGORY_PRESETS["plumbing"];
  if (normalized.includes("paint")) return CATEGORY_PRESETS["painting-decorating"];
  if (normalized.includes("mov")) return CATEGORY_PRESETS["moving-relocation"];
  if (normalized.includes("garden")) return CATEGORY_PRESETS["gardening-landscaping"];
  if (normalized.includes("furnitur") || normalized.includes("assembl")) return CATEGORY_PRESETS["furniture-assembly"];
  if (normalized.includes("repair") || normalized.includes("appliance")) return CATEGORY_PRESETS["appliance-home-repairs"];
  
  // Default to house-cleaning
  return CATEGORY_PRESETS["house-cleaning"];
}
