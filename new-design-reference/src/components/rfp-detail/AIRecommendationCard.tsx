import { RFPDetail } from "@/data/mockData";
import WinProbabilityRing from "@/components/shared/WinProbabilityRing";

interface AIRecommendationCardProps {
  rfp: RFPDetail;
}

const AIRecommendationCard = ({ rfp }: AIRecommendationCardProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(price);
  };

  return (
    <div className="card-rfp">
      <h2 className="text-lg font-bold mb-6 text-center">AI Recommendation</h2>
      <div className="flex flex-col items-center">
        <div className="mb-6">
          <WinProbabilityRing percentage={rfp.winProbability} size="lg" />
        </div>
        
        <p className="font-bold text-lg text-center text-foreground">
          SKU: {rfp.recommendedSku} - {rfp.skuName}
        </p>
        <p className="text-muted-foreground text-sm mb-4 text-center">
          Recommended Scenario: {rfp.recommendedScenario}
        </p>
        
        <p className="text-3xl font-bold mb-2 text-foreground">
          {formatPrice(rfp.recommendedPrice)}
        </p>
        <p className="text-sm text-muted-foreground">
          {rfp.margin} Margin | {rfp.competitivePosition}
        </p>
      </div>
    </div>
  );
};

export default AIRecommendationCard;
