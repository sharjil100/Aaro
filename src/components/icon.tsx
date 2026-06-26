import {
  Shirt,
  Sparkles,
  Smartphone,
  Sofa,
  Watch,
  Baby,
  ShoppingBasket,
  Dumbbell,
  type LucideIcon,
} from "lucide-react";

const map: Record<string, LucideIcon> = {
  Shirt,
  Sparkles,
  Smartphone,
  Sofa,
  Watch,
  Baby,
  ShoppingBasket,
  Dumbbell,
};

export function CategoryIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Cmp = map[name] ?? ShoppingBasket;
  return <Cmp className={className} aria-hidden />;
}
