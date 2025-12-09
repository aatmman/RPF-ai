import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import FilterChip from "@/components/shared/FilterChip";

interface FilterSidebarProps {
  selectedBuyer?: string | null;
  onBuyerChange?: (buyer: string | null) => void;
}

const FilterSidebar = ({ selectedBuyer, onBuyerChange }: FilterSidebarProps) => {
  const [buyers, setBuyers] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBuyers();
  }, []);

  const fetchBuyers = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/rfp/buyers');
      const result = await response.json();
      
      if (result.data) {
        setBuyers(result.data);
      }
    } catch (error) {
      console.error('Error fetching buyers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBuyerClick = (buyer: string) => {
    const newBuyer = selectedBuyer === buyer ? null : buyer;
    onBuyerChange?.(newBuyer);
  };

  return (
    <aside className="lg:col-span-1">
      <h2 className="text-xl font-bold text-foreground mb-4">Filters</h2>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground mb-3">Buyer</h3>
          {loading ? (
            <div className="text-sm text-muted-foreground">Loading buyers...</div>
          ) : buyers.length === 0 ? (
            <div className="text-sm text-muted-foreground">No buyers found</div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {buyers.map((buyer) => (
                <button
                  key={buyer}
                  onClick={() => handleBuyerClick(buyer)}
                  className={cn(
                    'px-3 py-1 rounded-full text-sm border transition-colors',
                    buyer === selectedBuyer
                      ? 'bg-indigo-600 text-white border-indigo-600'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  )}
                >
                  {buyer}
                </button>
              ))}
            </div>
          )}
        </div>
        
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground mb-3">Category</h3>
          <div className="flex flex-wrap gap-2">
            {["Snacks", "Beverages", "Frozen"].map((category) => (
              <FilterChip
                key={category}
                label={category}
                active={false}
                onClick={() => {}}
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
                active={false}
                onClick={() => {}}
              />
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default FilterSidebar;

