// Shared TypeScript interfaces for the Innerwise homepage

export interface ButtonProps {
  variant?: 'primary' | 'outline' | 'creamText';
  size?: 'default' | 'nav';
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  showChevron?: boolean;
}

export interface FAQItemData {
  id: string;
  question: string;
  answer: string;
}

export interface NeedCardData {
  id: string;
  title: string;
  titleSize: number;
  description: string;
  descriptionSize: number;
  imageSrc: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
}

export interface PillarCardData {
  id: string;
  label: string;
  title: string;
  tags: string;
  linkText: string;
  gradient: string;
  iconSrc: string;
  iconAlt: string;
  iconWidth: number;
  iconHeight: number;
}

export interface ResetCardData {
  id: string;
  title: string;
  meta: string;
  imageSrc: string;
  imageAlt: string;
  titleAlign?: 'left' | 'center';
}

export interface ExploreTileData {
  id: string;
  title: string;
  description: string;
  circleColor: string;
  iconSrc: string;
  iconAlt: string;
}

export interface FooterColumnData {
  heading: string;
  links: string[];
}
