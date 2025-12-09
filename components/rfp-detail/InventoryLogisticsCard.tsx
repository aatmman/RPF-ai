import StatusBadge from "@/components/shared/StatusBadge";

interface InventoryLogisticsCardProps {
  rfp: {
    stockLevel?: { current: number; required: number };
    stock_available?: boolean | number;
    quantity?: number;
    location?: string;
    rack_id?: string;
    stockStatus?: "in-stock" | "out-of-stock";
    stock_status?: string;
    readyToShip?: boolean;
  };
}

const InventoryLogisticsCard = ({ rfp }: InventoryLogisticsCardProps) => {
  let stockPercentage = 0;
  let currentStock = 0;
  let requiredStock = 0;

  if (rfp.stockLevel) {
    currentStock = rfp.stockLevel.current;
    requiredStock = rfp.stockLevel.required;
    stockPercentage = Math.min((currentStock / requiredStock) * 100, 100);
  } else if (typeof rfp.stock_available === "number" && rfp.quantity) {
    currentStock = rfp.stock_available;
    requiredStock = rfp.quantity;
    stockPercentage = Math.min((currentStock / requiredStock) * 100, 100);
  }
  
  const formatNumber = (num: number) => {
    if (num >= 1000) return `${Math.round(num / 1000)}k`;
    return num.toString();
  };

  const location = rfp.location || rfp.rack_id || "N/A";
  
  // Map stock status with proper mapping
  let stockStatus: "in-stock" | "out-of-stock" = "in-stock";
  let statusLabel = "In Stock";
  let statusClass = "bg-success-light text-success";
  
  if (rfp.stockStatus) {
    stockStatus = rfp.stockStatus;
  } else if (rfp.stock_status) {
    const status = rfp.stock_status.toLowerCase();
    if (status === "healthy_stock" || status === "healthy" || status.includes("in")) {
      stockStatus = "in-stock";
      statusLabel = "In Stock";
      statusClass = "bg-success-light text-success";
    } else if (status === "low_stock" || status === "low") {
      stockStatus = "in-stock";
      statusLabel = "Low Stock";
      statusClass = "bg-warning-light text-warning";
    } else if (status === "out_of_stock" || status === "out" || status.includes("out") || status.includes("unavailable")) {
      stockStatus = "out-of-stock";
      statusLabel = "Out of Stock";
      statusClass = "bg-error-light text-error";
    }
  } else if (typeof rfp.stock_available === "boolean") {
    stockStatus = rfp.stock_available ? "in-stock" : "out-of-stock";
    statusLabel = rfp.stock_available ? "In Stock" : "Out of Stock";
    statusClass = rfp.stock_available ? "bg-success-light text-success" : "bg-error-light text-error";
  }

  return (
    <div className="card-rfp">
      <h2 className="text-lg font-bold mb-4">Inventory & Logistics</h2>
      
      <div className="space-y-4">
        {currentStock > 0 && requiredStock > 0 && (
          <div>
            <div className="flex justify-between items-baseline mb-1 text-sm">
              <span className="font-medium text-foreground">Stock Level</span>
              <span className="text-muted-foreground">
                {formatNumber(currentStock)} / {formatNumber(requiredStock)} units
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2.5">
              <div
                className="bg-primary h-2.5 rounded-full"
                style={{ width: `${stockPercentage}%` }}
              />
            </div>
          </div>
        )}
        
        <div className="text-sm">
          <span className="text-muted-foreground">Location</span>
          <p className="font-medium text-foreground">{location}</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusClass}`}>
            {statusLabel}
          </span>
          {rfp.readyToShip && <StatusBadge status="ready" />}
        </div>
      </div>
    </div>
  );
};

export default InventoryLogisticsCard;

