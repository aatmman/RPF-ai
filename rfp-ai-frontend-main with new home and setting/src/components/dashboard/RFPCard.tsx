import { Link } from "react-router-dom";
import { RFP } from "@/data/mockData";
import WinProbabilityRing from "@/components/shared/WinProbabilityRing";
import StatusBadge from "@/components/shared/StatusBadge";

interface RFPCardProps {
  rfp: RFP;
}

const RFPCard = ({ rfp }: RFPCardProps) => {
  return (
    <div className="card-rfp flex items-center justify-between space-x-4">
      <div className="flex-grow">
        <p className="font-bold text-lg text-foreground">RFP #{rfp.rfpNumber}</p>
        <p className="text-sm text-muted-foreground">
          {rfp.buyer} • Created {rfp.createdDate}
        </p>
      </div>
      
      <div className="flex items-center space-x-6">
        <WinProbabilityRing percentage={rfp.winProbability} size="md" />
        
        <div className="text-center">
          <p className="text-xs font-medium text-muted-foreground mb-1">Stock</p>
          <StatusBadge status={rfp.stockStatus} />
        </div>
        
        <Link
          to={`/rfp/${rfp.id}`}
          className="bg-primary text-primary-foreground font-medium py-2 px-4 rounded-lg text-sm hover:bg-primary-700 transition-colors"
        >
          View RFP
        </Link>
      </div>
    </div>
  );
};

export default RFPCard;
