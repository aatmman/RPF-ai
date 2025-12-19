import { cn } from "@/lib/utils";

type StatusType = "in-stock" | "out-of-stock" | "healthy" | "low" | "out" | "ready" | "win" | "loss";

interface StatusBadgeProps {
  status: StatusType;
  label?: string;
}

const statusStyles: Record<StatusType, string> = {
  "in-stock": "bg-success-light text-success border-2 border-foreground",
  "out-of-stock": "bg-error-light text-error border-2 border-foreground",
  "healthy": "bg-success-light text-success border-2 border-foreground",
  "low": "bg-warning text-white border-2 border-foreground",
  "out": "bg-error-light text-error border-2 border-foreground",
  "ready": "bg-warning/20 text-foreground border-2 border-foreground",
  "win": "text-success font-semibold",
  "loss": "text-error font-semibold",
};

const defaultLabels: Record<StatusType, string> = {
  "in-stock": "In Stock",
  "out-of-stock": "Out of Stock",
  "healthy": "Healthy",
  "low": "Low",
  "out": "Out",
  "ready": "Ready to Ship",
  "win": "Win",
  "loss": "Loss",
};

const StatusBadge = ({ status, label }: StatusBadgeProps) => {
  const displayLabel = label || defaultLabels[status];
  const isBadge = !["win", "loss"].includes(status);
  
  return (
    <span
      className={cn(
        statusStyles[status],
        isBadge && "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
      )}
    >
      {displayLabel}
    </span>
  );
};

export default StatusBadge;
