import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface KPICardProps {
  title: string;
  value: string | number;
  suffix?: string;
  valueClassName?: string;
  sparkline?: ReactNode;
  children?: ReactNode;
}

const KPICard = ({ title, value, suffix, valueClassName, sparkline, children }: KPICardProps) => {
  return (
    <div className="card-rfp">
      <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
      <div className="flex items-baseline mt-2">
        <p className={cn("text-3xl font-bold text-foreground", valueClassName)}>{value}</p>
        {suffix && <span className="text-sm text-muted-foreground ml-1">{suffix}</span>}
      </div>
      {sparkline && <div className="mt-4">{sparkline}</div>}
      {children}
    </div>
  );
};

export default KPICard;
