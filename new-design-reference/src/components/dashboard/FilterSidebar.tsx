import { useState } from "react";
import FilterChip from "@/components/shared/FilterChip";

interface FilterSidebarProps {
  onFilterChange?: (filters: FilterState) => void;
}

interface FilterState {
  buyer: string | null;
  category: string | null;
  status: string | null;
}

const FilterSidebar = ({ onFilterChange }: FilterSidebarProps) => {
  const [filters, setFilters] = useState<FilterState>({
    buyer: "Global Mart",
    category: "Beverages",
    status: "In Progress",
  });

  const handleFilterClick = (type: keyof FilterState, value: string) => {
    const newFilters = {
      ...filters,
      [type]: filters[type] === value ? null : value,
    };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  return (
    <div>
      <span className="section-header">Filters</span>
      <h2 className="text-lg font-black text-foreground mb-4">Refine Results</h2>
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground mb-3">Buyer</h3>
          <div className="flex flex-wrap gap-2">
            {["Global Mart", "Costco", "Fresh Foods"].map((buyer) => (
              <FilterChip
                key={buyer}
                label={buyer}
                active={filters.buyer === buyer}
                onClick={() => handleFilterClick("buyer", buyer)}
              />
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground mb-3">Category</h3>
          <div className="flex flex-wrap gap-2">
            {["Snacks", "Beverages", "Frozen"].map((category) => (
              <FilterChip
                key={category}
                label={category}
                active={filters.category === category}
                onClick={() => handleFilterClick("category", category)}
              />
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground mb-3">Status</h3>
          <div className="flex flex-wrap gap-2">
            {["Draft", "In Progress", "Submitted"].map((status) => (
              <FilterChip
                key={status}
                label={status}
                active={filters.status === status}
                onClick={() => handleFilterClick("status", status)}
              />
            ))}
          </div>
        </div>
    </div>
  );
};

export default FilterSidebar;
