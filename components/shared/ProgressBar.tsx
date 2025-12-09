import { cn } from "@/lib/utils";

interface ProgressBarProps {
  percentage: number;
  showLabel?: boolean;
  className?: string;
}

const ProgressBar = ({ percentage, showLabel = true, className }: ProgressBarProps) => {
  const getGradient = (pct: number) => {
    if (pct >= 70) return "bg-gradient-to-r from-green-400 to-green-500";
    if (pct >= 50) return "bg-gradient-to-r from-yellow-400 to-orange-500";
    return "bg-gradient-to-r from-red-400 to-red-500";
  };

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <div className="w-24 bg-muted rounded-full h-1.5">
        <div
          className={cn("h-1.5 rounded-full", getGradient(percentage))}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showLabel && <span className="font-medium text-sm">{percentage}%</span>}
    </div>
  );
};

export default ProgressBar;





