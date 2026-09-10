import * as React from "react";
import { currentUser } from "@clerk/nextjs/server";
import { HomeClientContainer } from "@/components/home/home-client-container";

interface HomePageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const sp = await searchParams;
  let user = null;
  try {
    user = await currentUser();
  } catch (err) {
    // Gracefully handle any server session fetch issues
  }

  const isWelcomePreview =
    sp.preview === "welcome" ||
    sp.preview === "signed-in" ||
    sp.modal === "true";

  const isPublicPreview = sp.preview === "public" || sp.public === "true";

  return (
    <HomeClientContainer
      initialIsSignedIn={Boolean(user)}
      initialUserName={user?.firstName || user?.username || undefined}
      isWelcomePreview={isWelcomePreview}
      isPublicPreview={isPublicPreview}
    />
  );
}
