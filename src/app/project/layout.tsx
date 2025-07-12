import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
};

export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 