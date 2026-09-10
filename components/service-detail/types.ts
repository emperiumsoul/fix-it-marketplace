export interface ServicePackageData {
  name: string;
  description?: string;
  price: number;
  scope?: string;
  includedTasks?: string[];
  exclusions?: string[];
  estimatedDuration?: string;
}

export interface ServiceFAQData {
  question: string;
  answer: string;
}

export interface ServiceProviderData {
  id?: string;
  clerkUserId?: string;
  displayName: string;
  slug?: string;
  headline?: string;
  photoUrl?: string;
  expertise?: string[];
  bio?: string;
  languages?: string[];
  serviceAreas?: string[];
  availability?: string;
  phoneNumber?: string;
  whatsappNumber?: string;
}

export interface ServiceProjectData {
  title: string;
  subtitle?: string;
  imageUrl: string;
  hasOverlay?: boolean;
}

export interface RecommendedServiceItem {
  slug: string;
  title: string;
  rating: number;
  reviews: number;
  price: number;
  imageUrl: string;
}

export interface ServiceDetailData {
  id?: string;
  title: string;
  slug: string;
  summary: string;
  categoryTitle: string;
  categorySlug: string;
  provider: ServiceProviderData;
  startingPrice: number;
  currency: string;
  serviceAreas: string[];
  includedTasks: string[];
  exclusions: string[];
  descriptionText: string;
  packages: ServicePackageData[];
  faqs: ServiceFAQData[];
  coverImageUrl?: string;
  galleryImages: { url: string; alt: string }[];
  recentProjects: ServiceProjectData[];
  relatedServices: RecommendedServiceItem[];
}
