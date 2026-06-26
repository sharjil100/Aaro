import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function RatingStars({
  value,
  count,
  className,
}: {
  value: number;
  count?: number;
  className?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-1 text-sm", className)}>
      <Star className="h-3.5 w-3.5 fill-accent-400 text-accent-400" />
      <span className="font-semibold text-ink">{value.toFixed(1)}</span>
      {count != null && (
        <span className="text-faint">({count.toLocaleString("en-IN")})</span>
      )}
    </span>
  );
}
