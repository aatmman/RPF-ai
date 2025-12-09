import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface FramedBoxProps {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  showDottedBg?: boolean;
}

/**
 * A reusable Magic Loops-inspired framed container.
 * White background with thick black border, drop shadow, and optional dotted background.
 */
const FramedBox = ({
  children,
  className,
  innerClassName,
  showDottedBg = true,
}: FramedBoxProps) => {
  return (
    <div
      className={cn(
        "bg-white border-[3px] border-foreground rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
        showDottedBg && "dotted-bg",
        className
      )}
    >
      <div className={cn("p-4", innerClassName)}>{children}</div>
    </div>
  );
};

export default FramedBox;
