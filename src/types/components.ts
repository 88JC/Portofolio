export interface ProfileAvatarProps {
  imageUrl?: string;
  fallbackInitials?: string;
  size?: number;
  className?: string;
  priority?: boolean;
}

export interface NavbarProps {
  position?: 'top' | 'footer';
}

export interface ClickableProps {
  onClick?: (event: React.MouseEvent) => void;
} 