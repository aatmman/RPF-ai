import Link from "next/link";
import WinProbabilityRing from "@/components/shared/WinProbabilityRing";
import StatusBadge from "@/components/shared/StatusBadge";

export interface RFP {
  id: string;
  rfpNumber: string;
  rfp_id: string;
  buyer: string;
  buyer_name?: string;
  createdDate: string;
  created_at: string;
  winProbability: number;
  estimated_win_probability?: number;
  stockStatus: "healthy" | "low" | "out";
  stock_status?: string;
  quantity: number;
  basePrice: number;
  base_price?: number;
  category?: string;
  status?: "draft" | "in-progress" | "submitted";
}

interface RFPCardProps {
  rfp: RFP;
}

const RFPCard = ({ rfp }: RFPCardProps) => {
  const rfpNumber = rfp.rfpNumber || rfp.rfp_id || `RFP-${rfp.id.slice(0, 8)}`;
  const buyer = rfp.buyer || rfp.buyer_name || "Unknown Buyer";
  const createdDate = rfp.createdDate || new Date(rfp.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  const winProbability = rfp.winProbability || rfp.estimated_win_probability || 0;
  
  // Map stock_status to stockStatus
  let stockStatus: "healthy" | "low" | "out" = "healthy";
  if (rfp.stockStatus) {
    stockStatus = rfp.stockStatus;
  } else if (rfp.stock_status) {
    const status = rfp.stock_status.toLowerCase();
    if (status.includes("healthy") || status.includes("stock") || status.includes("available")) {
      stockStatus = "healthy";
    } else if (status.includes("low")) {
      stockStatus = "low";
    } else {
      stockStatus = "out";
    }
  }

  return (
    <div className="card-rfp flex items-center justify-between space-x-4">
      <div className="flex-grow">
        <p className="font-bold text-lg text-foreground">RFP #{rfpNumber}</p>
        <p className="text-sm text-muted-foreground">
          {buyer} • Created {createdDate}
        </p>
      </div>
      
      <div className="flex items-center space-x-6">
        <WinProbabilityRing percentage={Math.round(winProbability)} size="md" />
        
        <div className="text-center">
          <p className="text-xs font-medium text-muted-foreground mb-1">Stock</p>
          <StatusBadge status={stockStatus} />
        </div>
        
        {rfp.rfp_id ? (
          <Link
            href={`/rfp/${rfp.rfp_id}`}
            className="bg-primary text-primary-foreground font-medium py-2 px-4 rounded-lg text-sm hover:bg-primary-700 transition-colors"
          >
            View RFP
          </Link>
        ) : (
          <button
            disabled
            className="bg-muted text-muted-foreground font-medium py-2 px-4 rounded-lg text-sm cursor-not-allowed"
          >
            View RFP
          </button>
        )}
      </div>
    </div>
  );
};

export default RFPCard;





