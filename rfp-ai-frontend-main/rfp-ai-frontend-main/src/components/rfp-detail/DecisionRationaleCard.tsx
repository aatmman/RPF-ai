import { RFPDetail } from "@/data/mockData";

interface DecisionRationaleCardProps {
  rfp: RFPDetail;
}

const DecisionRationaleCard = ({ rfp }: DecisionRationaleCardProps) => {
  return (
    <div className="card-rfp lg:col-span-3">
      <h2 className="text-lg font-bold mb-4">Decision Rationale</h2>
      
      <p className="text-muted-foreground mb-6 max-w-4xl text-sm leading-relaxed">
        {rfp.rationale}
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
        <div>
          <h3 className="font-semibold mb-2 text-foreground">Why this SKU</h3>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
            {rfp.whySku.map((reason, index) => (
              <li key={index}>{reason}</li>
            ))}
          </ul>
        </div>
        
        <div>
          <h3 className="font-semibold mb-2 text-foreground">Why this Scenario</h3>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
            {rfp.whyScenario.map((reason, index) => (
              <li key={index}>{reason}</li>
            ))}
          </ul>
        </div>
        
        <div>
          <h3 className="font-semibold mb-2 text-foreground">Risks</h3>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
            {rfp.risks.map((risk, index) => (
              <li key={index}>{risk}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DecisionRationaleCard;
