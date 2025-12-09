import { cn } from "@/lib/utils";

interface FilterChipProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
}

const FilterChip = ({ label, active = false, onClick }: FilterChipProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "filter-chip",
        active ? "filter-chip-active" : "filter-chip-inactive"
      )}
    >
      {label}
    </button>
  );
};

export default FilterChip;
