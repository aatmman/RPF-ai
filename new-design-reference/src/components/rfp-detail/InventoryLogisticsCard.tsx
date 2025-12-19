import { RFPDetail } from "@/data/mockData";
import StatusBadge from "@/components/shared/StatusBadge";

interface InventoryLogisticsCardProps {
  rfp: RFPDetail;
}

const InventoryLogisticsCard = ({ rfp }: InventoryLogisticsCardProps) => {
  const stockPercentage = Math.min((rfp.stockLevel.current / rfp.stockLevel.required) * 100, 100);
  
  const formatNumber = (num: number) => {
    if (num >= 1000) return `${Math.round(num / 1000)}k`;
    return num.toString();
  };

  return (
    <div className="card-rfp">
      <h2 className="text-lg font-bold mb-4">Inventory & Logistics</h2>
      
      <div className="space-y-4">
        <div>
          <div className="flex justify-between items-baseline mb-1 text-sm">
            <span className="font-medium text-foreground">Stock Level</span>
            <span className="text-muted-foreground">
              {formatNumber(rfp.stockLevel.current)} / {formatNumber(rfp.stockLevel.required)} units
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2.5">
            <div
              className="bg-primary h-2.5 rounded-full"
              style={{ width: `${stockPercentage}%` }}
            />
          </div>
        </div>
        
        <div className="text-sm">
          <span className="text-muted-foreground">Location</span>
          <p className="font-medium text-foreground">{rfp.location}</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <StatusBadge status={rfp.stockStatus} />
          {rfp.readyToShip && <StatusBadge status="ready" />}
        </div>
      </div>
    </div>
  );
};

export default InventoryLogisticsCard;
