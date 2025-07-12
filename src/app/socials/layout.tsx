import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Socials",
};

export default function SocialsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 