"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Wrench,
  Zap,
  Paintbrush,
  Play,
  Heart,
  Star,
  Video,
} from "lucide-react";

export interface WelcomeServiceCardItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  price: number;
  currency: string;
  rating: number;
  reviewCount: number;
  location: string;
  imageUrl: string;
  provider: {
    displayName: string;
    photoUrl?: string;
    badge: string;
  };
  hasVideoConsultation?: boolean;
}

const CATEGORY_TABS = [
  { id: "cleaning", title: "House Cleaning", icon: Sparkles },
  { id: "plumbing", title: "Plumbing", icon: Wrench },
  { id: "electrical", title: "Electrical Repairs", icon: Zap },
  { id: "painting", title: "Painting & Decorating", icon: Paintbrush },
];

const SAMPLE_SERVICES: Record<string, WelcomeServiceCardItem[]> = {
  cleaning: [
    {
      id: "clean-1",
      slug: "residential-deep-cleaning-accra",
      title: "I will provide full residential deep cleaning and sanitization",
      category: "Cleaning",
      price: 250,
      currency: "GH₵",
      rating: 5.0,
      reviewCount: 179,
      location: "East Legon, Accra",
      imageUrl:
        "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80",
      provider: {
        displayName: "Abena Osei",
        photoUrl:
          "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80",
        badge: "Top Rated",
      },
      hasVideoConsultation: true,
    },
    {
      id: "clean-2",
      slug: "move-in-move-out-cleaning",
      title: "I will do post-tenancy and move-in deep cleaning for apartments",
      category: "Cleaning",
      price: 320,
      currency: "GH₵",
      rating: 4.9,
      reviewCount: 94,
      location: "Cantonments, Accra",
      imageUrl:
        "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=600&q=80",
      provider: {
        displayName: "Kofi Boateng",
        photoUrl:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
        badge: "Top Rated",
      },
      hasVideoConsultation: false,
    },
    {
      id: "clean-3",
      slug: "sofa-carpet-steam-cleaning",
      title: "I will steam clean sofas, carpets, and upholstery with HEPA vacuum",
      category: "Cleaning",
      price: 180,
      currency: "GH₵",
      rating: 5.0,
      reviewCount: 215,
      location: "Osu, Accra",
      imageUrl:
        "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80",
      provider: {
        displayName: "Kwame Mensah",
        photoUrl:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80",
        badge: "Vetted Pro",
      },
      hasVideoConsultation: true,
    },
    {
      id: "clean-4",
      slug: "office-commercial-cleaning-ghana",
      title: "I will clean corporate offices, shared spaces, and retail shops",
      category: "Cleaning",
      price: 450,
      currency: "GH₵",
      rating: 4.8,
      reviewCount: 68,
      location: "Airport Residential, Accra",
      imageUrl:
        "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80",
      provider: {
        displayName: "Daniel Johnson",
        photoUrl:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=120&q=80",
        badge: "Top Rated",
      },
      hasVideoConsultation: false,
    },
  ],
  plumbing: [
    {
      id: "plumb-1",
      slug: "leak-detection-emergency-pipe-repair",
      title: "I will fix pipe leaks, blocked drains, and faulty toilet valves",
      category: "Plumbing",
      price: 120,
      currency: "GH₵",
      rating: 5.0,
      reviewCount: 142,
      location: "Spintex, Accra",
      imageUrl:
        "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=600&q=80",
      provider: {
        displayName: "Joey Seko",
        photoUrl:
          "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=120&q=80",
        badge: "Top Rated",
      },
      hasVideoConsultation: true,
    },
    {
      id: "plumb-2",
      slug: "water-tank-pump-servicing",
      title: "I will service booster pumps, overhead water tanks, and pipes",
      category: "Plumbing",
      price: 200,
      currency: "GH₵",
      rating: 4.9,
      reviewCount: 88,
      location: "Tema",
      imageUrl:
        "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=600&q=80",
      provider: {
        displayName: "Kwaku Frimpong",
        photoUrl:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
        badge: "Vetted Pro",
      },
      hasVideoConsultation: false,
    },
  ],
  electrical: [
    {
      id: "elec-1",
      slug: "circuit-breaker-diagnostics-ghana",
      title: "I will troubleshoot short circuits, replace fuses, and rewire sockets",
      category: "Electrical",
      price: 150,
      currency: "GH₵",
      rating: 5.0,
      reviewCount: 165,
      location: "Achimota, Accra",
      imageUrl:
        "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=600&q=80",
      provider: {
        displayName: "Billy Brennan",
        photoUrl:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80",
        badge: "Top Rated",
      },
      hasVideoConsultation: true,
    },
  ],
  painting: [
    {
      id: "paint-1",
      slug: "interior-exterior-wall-painting",
      title: "I will paint interior rooms and exterior weatherproof coatings",
      category: "Painting",
      price: 300,
      currency: "GH₵",
      rating: 4.9,
      reviewCount: 110,
      location: "East Legon, Accra",
      imageUrl:
        "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=600&q=80",
      provider: {
        displayName: "Marc Austin",
        photoUrl:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=120&q=80",
        badge: "Top Rated",
      },
      hasVideoConsultation: false,
    },
  ],
};

export function WelcomeExplore() {
  const [activeTab, setActiveTab] = React.useState("cleaning");
  const [savedServices, setSavedServices] = React.useState<Record<string, boolean>>({});
  const [liveServices, setLiveServices] = React.useState<WelcomeServiceCardItem[]>([]);

  React.useEffect(() => {
    fetch('/api/services/popular')
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data?.services) && data.services.length > 0) {
          const mapped: WelcomeServiceCardItem[] = data.services.map((s: {
            _id: string;
            title: string;
            slug: string;
            startingPrice?: number;
            currency?: string;
            categoryTitle?: string;
            categorySlug?: string;
            imageUrl?: string;
            serviceAreas?: string[];
            provider?: {
              displayName?: string;
              photoUrl?: string;
              rating?: number;
              completedJobsCount?: number;
            };
          }) => {
            const catSlug = s.categorySlug || "";
            let mappedTab = "cleaning";
            if (catSlug.includes("plumb") || s.title?.toLowerCase().includes("plumb")) mappedTab = "plumbing";
            else if (catSlug.includes("electr") || s.title?.toLowerCase().includes("electr")) mappedTab = "electrical";
            else if (catSlug.includes("paint") || s.title?.toLowerCase().includes("paint")) mappedTab = "painting";
            else if (catSlug.includes("clean") || s.title?.toLowerCase().includes("clean")) mappedTab = "cleaning";

            const defaultImg =
              mappedTab === "plumbing"
                ? "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=600&q=80"
                : mappedTab === "electrical"
                ? "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=600&q=80"
                : mappedTab === "painting"
                ? "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=600&q=80"
                : "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80";

            return {
              id: s._id,
              slug: s.slug,
              title: s.title,
              category: s.categoryTitle || mappedTab.charAt(0).toUpperCase() + mappedTab.slice(1),
              price: s.startingPrice || 150,
              currency: s.currency || "GH₵",
              rating: s.provider?.rating || 5.0,
              reviewCount: s.provider?.completedJobsCount || 1,
              location: s.serviceAreas?.[0] || "Accra, Ghana",
              imageUrl: s.imageUrl || defaultImg,
              provider: {
                displayName: s.provider?.displayName || "Verified Provider",
                photoUrl: s.provider?.photoUrl,
                badge: "Verified Pro",
              },
              hasVideoConsultation: true,
              _tab: mappedTab,
            };
          });
          setLiveServices(mapped);
        }
      })
      .catch((err) => console.error("Error loading live explore services:", err));
  }, []);

  const toggleSave = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSavedServices((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Filter live services matching active tab
  const liveForTab = liveServices.filter((s) => (s as unknown as { _tab?: string })._tab === activeTab);
  const sampleForTab = SAMPLE_SERVICES[activeTab] || SAMPLE_SERVICES.cleaning;
  const services = [...liveForTab, ...sampleForTab.filter((sample) => !liveForTab.some((l) => l.slug === sample.slug))];

  return (
    <section className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 my-12">
      {/* Section Header with Controls matching 3.png */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <h2 className="font-grotesque font-bold text-[22px] sm:text-[26px] text-[#222325]">
          Explore popular services on Fix it
        </h2>

        <div className="flex items-center gap-4">
          <Link
            href="/search"
            className="text-[14px] font-semibold text-[#008744] hover:underline"
          >
            Show All
          </Link>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              aria-label="Previous"
              className="w-8 h-8 rounded-full border border-[#DADBDD] bg-white flex items-center justify-center text-[#404145] hover:bg-[#F7F7F7] transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              aria-label="Next"
              className="w-8 h-8 rounded-full border border-[#DADBDD] bg-white flex items-center justify-center text-[#404145] hover:bg-[#F7F7F7] transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Left Category Tabs + Right Service Cards */}
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Left Vertical Category Tabs matching 3.png */}
        <div className="w-full lg:w-[260px] shrink-0 flex flex-row lg:flex-col gap-3 overflow-x-auto no-scrollbar pb-2 lg:pb-0">
          {CATEGORY_TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3.5 p-4 rounded-[12px] border text-left transition-all shrink-0 cursor-pointer w-[200px] lg:w-full ${
                  isActive
                    ? "bg-[#F7F7F7] border-[#222325] shadow-xs"
                    : "bg-white border-[#E5E7EB] hover:border-[#DADBDD] hover:bg-[#F9FAFB]"
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                    isActive ? "bg-[#222325] text-white" : "bg-[#F3F4F6] text-[#404145]"
                  }`}
                >
                  <Icon className="w-4 h-4 stroke-[1.75]" />
                </div>
                <span
                  className={`text-[14px] font-semibold leading-tight line-clamp-2 ${
                    isActive ? "text-[#222325]" : "text-[#404145]"
                  }`}
                >
                  {tab.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Right Service Cards Carousel Grid matching 3.png */}
        <div className="flex-1 w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {services.map((svc) => {
            const isSaved = Boolean(savedServices[svc.id]);
            return (
              <Link
                key={svc.id}
                href={`/services/${svc.slug}`}
                className="group flex flex-col bg-white border border-[#DADBDD] rounded-[12px] overflow-hidden hover:border-[#62646A] hover:shadow-md transition-all cursor-pointer"
              >
                {/* Thumbnail with video overlay and heart save button matching 3.png */}
                <div className="relative w-full aspect-[4/3] bg-[#F7F7F7] overflow-hidden">
                  <Image
                    src={svc.imageUrl}
                    alt={svc.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Play icon badge in bottom-left */}
                  <div className="absolute bottom-2.5 left-2.5 w-7 h-7 rounded-full bg-black/60 text-white flex items-center justify-center backdrop-blur-xs">
                    <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                  </div>

                  {/* Heart save button in top-right */}
                  <button
                    type="button"
                    onClick={(e) => toggleSave(svc.id, e)}
                    aria-label="Save service"
                    className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-colors z-10 cursor-pointer"
                  >
                    <Heart
                      className={`w-3.5 h-3.5 transition-colors ${
                        isSaved ? "fill-[#B42318] text-[#B42318]" : "text-white"
                      }`}
                    />
                  </button>
                </div>

                {/* Card Content matching 3.png */}
                <div className="p-3.5 flex flex-col gap-2 flex-1 justify-between">
                  {/* Provider Info Row */}
                  <div className="flex items-center gap-2">
                    <div className="relative w-6 h-6 rounded-full overflow-hidden shrink-0 border border-[#E5E7EB]">
                      {svc.provider.photoUrl ? (
                        <Image
                          src={svc.provider.photoUrl}
                          alt={svc.provider.displayName}
                          fill
                          sizes="24px"
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-[#008744] text-white flex items-center justify-center text-[10px] font-bold">
                          {svc.provider.displayName.charAt(0)}
                        </div>
                      )}
                    </div>
                    <span className="text-[13px] font-medium text-[#222325] truncate">
                      {svc.provider.displayName}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded shrink-0 ${
                        svc.provider.badge === "Vetted Pro"
                          ? "bg-[#EEF2FF] text-[#4F46E5]"
                          : "bg-[#FEF3C7] text-[#92400E]"
                      }`}
                    >
                      {svc.provider.badge}
                    </span>
                  </div>

                  {/* Service Title */}
                  <h3 className="font-grotesque font-bold text-[14px] leading-[19px] text-[#222325] line-clamp-2 group-hover:text-[#008744] transition-colors">
                    {svc.title}
                  </h3>

                  {/* Rating */}
                  <div className="flex items-center gap-1 text-[13px]">
                    <Star className="w-3.5 h-3.5 fill-[#EAB308] text-[#EAB308]" />
                    <span className="font-bold text-[#222325]">{svc.rating}</span>
                    <span className="text-[#74767E]">({svc.reviewCount})</span>
                  </div>

                  {/* Price Row */}
                  <div className="pt-2 border-t border-[#F3F4F6] flex items-baseline justify-between">
                    <span className="text-[12px] text-[#74767E]">From</span>
                    <span className="font-grotesque font-bold text-[15px] text-[#222325]">
                      {svc.currency} {svc.price}
                    </span>
                  </div>

                  {/* Video Consultation Note if available */}
                  {svc.hasVideoConsultation && (
                    <div className="flex items-center gap-1 text-[11px] text-[#008744] pt-1">
                      <Video className="w-3 h-3 shrink-0" />
                      <span>Offers video consultations</span>
                    </div>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
