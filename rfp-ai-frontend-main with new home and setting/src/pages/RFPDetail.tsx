import AppLayout from "@/components/layout/AppLayout";
import RFPSummaryCard from "@/components/rfp-detail/RFPSummaryCard";
import AIRecommendationCard from "@/components/rfp-detail/AIRecommendationCard";
import InventoryLogisticsCard from "@/components/rfp-detail/InventoryLogisticsCard";
import DecisionRationaleCard from "@/components/rfp-detail/DecisionRationaleCard";
import { rfpDetail } from "@/data/mockData";

const RFPDetail = () => {
  return (
    <AppLayout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <RFPSummaryCard rfp={rfpDetail} />
          <AIRecommendationCard rfp={rfpDetail} />
          <InventoryLogisticsCard rfp={rfpDetail} />
          <DecisionRationaleCard rfp={rfpDetail} />
        </div>
      </div>
    </AppLayout>
  );
};

export default RFPDetail;
