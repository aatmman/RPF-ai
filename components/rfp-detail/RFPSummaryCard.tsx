interface RFPSummaryCardProps {
  rfp: {
    buyerName?: string;
    buyer_name?: string;
    rfpId?: string;
    rfp_id?: string;
    quantity?: number | string;
    basePrice?: number | string;
    base_price?: number;
    createdDate?: string;
    created_at?: string;
    requirements?: string;
  };
}

const RFPSummaryCard = ({ rfp }: RFPSummaryCardProps) => {
  const buyerName = rfp.buyerName || rfp.buyer_name || "Unknown Buyer";
  const rfpId = rfp.rfpId || rfp.rfp_id || "N/A";
  const quantity = typeof rfp.quantity === "number" 
    ? `${rfp.quantity.toLocaleString()} units` 
    : rfp.quantity || "N/A";
  const basePrice = typeof rfp.base_price === "number"
    ? `$${rfp.base_price.toLocaleString()}`
    : rfp.basePrice || "N/A";
  const createdDate = rfp.createdDate || (rfp.created_at 
    ? new Date(rfp.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : "N/A");

  const items = [
    { label: "Buyer Name", value: buyerName },
    { label: "RFP ID", value: rfpId },
    { label: "Quantity", value: quantity },
    { label: "Base Price", value: basePrice },
    { label: "Created Date", value: createdDate },
  ];

  return (
    <div className="card-rfp">
      <h2 className="text-lg font-bold mb-4">RFP Summary</h2>
      <div className="space-y-3 text-sm">
        {items.map((item) => (
          <div key={item.label} className="flex justify-between">
            <span className="text-muted-foreground">{item.label}</span>
            <span className="font-medium text-foreground">{item.value}</span>
          </div>
        ))}
        {rfp.requirements && (
          <div className="mt-4 pt-4 border-t border-border">
            <span className="text-muted-foreground block mb-2">Requirements</span>
            <p className="text-foreground text-xs">{rfp.requirements}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RFPSummaryCard;





