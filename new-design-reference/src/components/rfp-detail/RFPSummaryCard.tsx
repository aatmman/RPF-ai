import { RFPDetail } from "@/data/mockData";

interface RFPSummaryCardProps {
  rfp: RFPDetail;
}

const RFPSummaryCard = ({ rfp }: RFPSummaryCardProps) => {
  const items = [
    { label: "Buyer Name", value: rfp.buyerName },
    { label: "RFP ID", value: rfp.rfpId },
    { label: "Quantity", value: rfp.quantity },
    { label: "Base Price", value: rfp.basePrice },
    { label: "Created Date", value: rfp.createdDate },
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
      </div>
    </div>
  );
};

export default RFPSummaryCard;
