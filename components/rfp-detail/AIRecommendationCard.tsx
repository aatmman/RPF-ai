import WinProbabilityRing from "@/components/shared/WinProbabilityRing";

interface AIRecommendationCardProps {
  rfp: {
    winProbability?: number;
    estimated_win_probability?: number;
    recommendedSku?: string;
    primary_sku?: string;
    skuName?: string;
    primary_name?: string;
    recommendedScenario?: string;
    recommended_scenario?: string;
    recommendedPrice?: number;
    scenario_1_total?: number;
    scenario_2_total?: number;
    scenario_3_total?: number;
    margin?: string;
    competitivePosition?: string;
    competitor_range_min?: number;
    competitor_range_max?: number;
  };
}

const AIRecommendationCard = ({ rfp }: AIRecommendationCardProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(price);
  };

  const winProbability = rfp.winProbability || rfp.estimated_win_probability || 0;
  const recommendedSku = rfp.recommendedSku || rfp.primary_sku || "N/A";
  const skuName = rfp.skuName || rfp.primary_name || "N/A";
  const recommendedScenario = rfp.recommendedScenario || rfp.recommended_scenario || "N/A";
  
  // Get recommended price from scenario totals
  let recommendedPrice = rfp.recommendedPrice;
  if (!recommendedPrice) {
    const scenario = rfp.recommended_scenario;
    if (scenario === "scenario_1" || scenario === "1") {
      recommendedPrice = rfp.scenario_1_total;
    } else if (scenario === "scenario_2" || scenario === "2") {
      recommendedPrice = rfp.scenario_2_total;
    } else if (scenario === "scenario_3" || scenario === "3") {
      recommendedPrice = rfp.scenario_3_total;
    } else {
      recommendedPrice = rfp.scenario_1_total || rfp.scenario_2_total || rfp.scenario_3_total || 0;
    }
  }
  
  // Fallback to 80% if no win probability
  const winProb = winProbability || 80;

  return (
    <div className="card-rfp">
      <h2 className="text-lg font-bold mb-6 text-center">AI Recommendation</h2>
      <div className="flex flex-col items-center">
        <div className="mb-6">
          <WinProbabilityRing percentage={Math.round(winProb)} size="lg" />
        </div>
        
        <p className="font-bold text-lg text-center text-foreground">
          SKU: {recommendedSku} - {skuName}
        </p>
        <p className="text-muted-foreground text-sm mb-4 text-center">
          Recommended Scenario: {recommendedScenario}
        </p>
        
        {recommendedPrice && (
          <>
            <p className="text-3xl font-bold mb-2 text-foreground">
              {formatPrice(recommendedPrice)}
            </p>
            {rfp.competitor_range_min && rfp.competitor_range_max && (
              <p className="text-sm text-muted-foreground">
                Competitor Range: {formatPrice(rfp.competitor_range_min)} - {formatPrice(rfp.competitor_range_max)}
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AIRecommendationCard;

