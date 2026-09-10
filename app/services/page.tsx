import SearchPage, { generateMetadata as searchGenerateMetadata } from "@/app/search/page";
import type { Metadata } from "next";

interface ServicesPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata(props: ServicesPageProps): Promise<Metadata> {
  const meta = await searchGenerateMetadata(props);
  return {
    ...meta,
    title: "All Services in Ghana | Fix it Marketplace",
    description: "Browse verified local tradespeople, cleaners, electricians, and plumbers across Ghana. Compare pricing, reviews, and book online.",
  };
}

export default SearchPage;
