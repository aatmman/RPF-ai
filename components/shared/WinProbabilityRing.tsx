import { cn } from "@/lib/utils";

interface WinProbabilityRingProps {
  percentage: number;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}

const WinProbabilityRing = ({ percentage, size = "md", showLabel = true }: WinProbabilityRingProps) => {
  const getColorClass = (pct: number) => {
    if (pct >= 80) return "text-success";
    if (pct >= 50) return "text-warning";
    return "text-destructive";
  };

  const sizeClasses = {
    sm: "w-12 h-12",
    md: "w-16 h-16",
    lg: "w-48 h-48",
  };

  const textSizes = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-4xl",
  };

  return (
    <div className={cn("relative", sizeClasses[size])}>
      <svg className="w-full h-full" viewBox="0 0 36 36">
        <path
          className="text-muted"
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          fill="none"
          stroke="currentColor"
          strokeWidth={size === "lg" ? "2.5" : "4"}
        />
        <path
          className={getColorClass(percentage)}
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          fill="none"
          stroke="currentColor"
          strokeDasharray={`${percentage}, 100`}
          strokeLinecap="round"
          strokeWidth={size === "lg" ? "2.5" : "4"}
        />
      </svg>
      {showLabel && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={cn("font-bold", textSizes[size], getColorClass(percentage))}>
            {percentage}%
          </span>
          {size === "lg" && (
            <span className="text-sm font-medium text-muted-foreground">Win Probability</span>
          )}
        </div>
      )}
    </div>
  );
};

export default WinProbabilityRing;





