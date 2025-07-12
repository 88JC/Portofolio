import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Stats",
};

export default function StatsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 