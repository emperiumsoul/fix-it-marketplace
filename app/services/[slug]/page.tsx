import * as React from "react";
import type { Metadata } from "next";
import { getServerClient } from "@/sanity/lib/server-client";
import { PublicHeader } from "@/components/navigation/public-header";
import { CategoryNav } from "@/components/navigation/category-nav";
import { ServiceDetailView } from "@/components/service-detail/service-detail-view";
import { Footer } from "@/components/navigation/footer";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;

  let title = "I will clean your home and living spaces | Fix it Ghana";
  let description =
    "Hire trusted, verified home cleaning professionals in Accra, Ghana. Dusting, vacuuming, mopping, and deep cleaning for living spaces.";

  try {
    const client = getServerClient();
    const service = await client.fetch(
      `*[_type == "service" && (slug.current == $slug || _id == $slug)][0]{
        title,
        summary,
        "providerName": provider->displayName,
        startingPrice,
        currency
      }`,
      { slug }
    );
    if (service?.title) {
      title = `${service.title} | Fix it Ghana`;
      description = service.summary || description;
    }
  } catch (err) {
    console.error("Error generating service metadata:", err);
  }

  return {
    title,
    description,
  };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;

  let serviceData = {
    title: "I will clean your home and living spaces",
    category: "Cleaning",
    provider: "Neat Home",
    price: 150,
    location: "Accra",
  };

  try {
    const client = getServerClient();
    const service = await client.fetch(
      `*[_type == "service" && (slug.current == $slug || _id == $slug)][0]{
        title,
        "categoryTitle": category->title,
        "providerName": provider->displayName,
        startingPrice,
        serviceAreas
      }`,
      { slug }
    );
    if (service?.title) {
      serviceData = {
        title: service.title,
        category: service.categoryTitle || "Cleaning",
        provider: service.providerName || "Neat Home",
        price: service.startingPrice || 150,
        location: service.serviceAreas?.[0] || "Accra",
      };
    }
  } catch (err) {
    console.error("Error fetching service detail:", err);
  }

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#404145] font-satoshi selection:bg-[#F3FDF9] selection:text-[#003912]">
      {/* Top Header matching 5.png */}
      <PublicHeader />

      {/* Category Nav Strip */}
      <CategoryNav />

      {/* Main Service Content */}
      <main className="flex-1">
        <ServiceDetailView
          initialTitle={serviceData.title}
          initialCategory={serviceData.category}
          initialProvider={serviceData.provider}
          initialPrice={serviceData.price}
          initialLocation={serviceData.location}
        />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
