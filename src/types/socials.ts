export interface ContactItemProps {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  text: string;
  description: string;
  bgColor: string;
  hoverColor: string;
} 