import { useEffect, useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import KPICard from "@/components/shared/KPICard";
import Sparkline from "@/components/shared/Sparkline";
import StarRating from "@/components/shared/StarRating";
import FilterSidebar from "@/components/dashboard/FilterSidebar";
import RFPCard, { RFP } from "@/components/dashboard/RFPCard";

interface RfpRun {
  id: string;
  rfp_id: string;
  created_at: string;
  buyer_name?: string;
  quantity?: number;
  base_price?: number;
  primary_sku?: string;
  primary_name?: string;
  recommended_scenario?: string;
  scenario_1_total?: number;
  scenario_2_total?: number;
  scenario_3_total?: number;
  competitor_range_min?: number;
  competitor_range_max?: number;
  stock_available?: boolean | number;
  stock_status?: string;
  rack_id?: string;
  estimated_win_probability?: number;
  ai_summary?: string;
  decision_reason?: string;
  feedback_label?: string;
  feedback_score?: number;
}

const DashboardPage = () => {
  const [rfpRuns, setRfpRuns] = useState<RfpRun[]>([]);
  const [allRfpRuns, setAllRfpRuns] = useState<RfpRun[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedBuyer, setSelectedBuyer] = useState<string | null>(null);

  useEffect(() => {
    fetchRFPHistory();
  }, []);

  useEffect(() => {
    // Filter RFPs based on selected buyer
    if (selectedBuyer) {
      setRfpRuns(allRfpRuns.filter(rfp => rfp.buyer_name === selectedBuyer));
    } else {
      setRfpRuns(allRfpRuns);
    }
  }, [selectedBuyer, allRfpRuns]);

  const fetchRFPHistory = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/rfp/history');
      const result = await response.json();

      if (result.error) {
        setError(result.error);
      } else {
        const data = result.data || [];
        setAllRfpRuns(data);
        // Initial filter will be applied by the useEffect above
        setRfpRuns(data);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to fetch RFP history');
    } finally {
      setLoading(false);
    }
  };

  // Calculate KPIs from all data (not filtered)
  const totalRFPs = allRfpRuns.length;
  const avgWinProbability = allRfpRuns.length > 0
    ? Math.round(allRfpRuns.reduce((sum, rfp) => sum + (rfp.estimated_win_probability || 0), 0) / allRfpRuns.length)
    : 0;
  const winRate = allRfpRuns.length > 0
    ? Math.round((allRfpRuns.filter(rfp => rfp.feedback_label === "win").length / allRfpRuns.length) * 100)
    : 0;
  const avgFeedbackScore = allRfpRuns.length > 0
    ? (allRfpRuns.reduce((sum, rfp) => sum + (rfp.feedback_score || 0), 0) / allRfpRuns.length).toFixed(1)
    : "0.0";

  // Map RfpRun to RFP for RFPCard
  const mapToRFP = (run: RfpRun): RFP => {
    // Map stock_status to stockStatus
    let stockStatus: "healthy" | "low" | "out" = "healthy";
    if (run.stock_status) {
      const status = run.stock_status.toLowerCase();
      if (status.includes("healthy") || status.includes("stock") || status.includes("available")) {
        stockStatus = "healthy";
      } else if (status.includes("low")) {
        stockStatus = "low";
      } else {
        stockStatus = "out";
      }
    } else if (typeof run.stock_available === "boolean") {
      stockStatus = run.stock_available ? "healthy" : "out";
    }

    return {
      id: run.id,
      rfpNumber: run.rfp_id || `RFP-${run.id.slice(0, 8)}`,
      rfp_id: run.rfp_id,
      buyer: run.buyer_name || "Unknown Buyer",
      buyer_name: run.buyer_name,
      createdDate: new Date(run.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      created_at: run.created_at,
      winProbability: run.estimated_win_probability || 0,
      estimated_win_probability: run.estimated_win_probability,
      stockStatus,
      stock_status: run.stock_status,
      quantity: run.quantity || 0,
      basePrice: run.base_price || 0,
      base_price: run.base_price,
    };
  };

  return (
    <AppLayout>
      <div className="container mx-auto px-6 py-12">
        {/* Section Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-black text-foreground">Dashboard</h1>
        </div>

        {/* KPI Cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <KPICard
            title="Total RFPs"
            value={totalRFPs.toLocaleString()}
            sparkline={<Sparkline points="0,30 10,25 20,28 30,22 40,26 50,20 60,15 70,18 80,12 90,16 100,10" color="primary" />}
          />
          <KPICard
            title="Win Rate"
            value={`${winRate}%`}
            sparkline={<Sparkline points="0,15 10,18 20,12 30,16 40,10 50,14 60,8 70,12 80,5 90,8 100,3" color="secondary" />}
          />
          <KPICard
            title="Avg. Win Probability"
            value={`${avgWinProbability}%`}
            sparkline={<Sparkline points="0,5 10,8 20,4 30,10 40,8 50,12 60,10 70,15 80,12 90,18 100,15" color="primary" />}
          />
          <KPICard
            title="Feedback Score"
            value={avgFeedbackScore}
            suffix="/ 5"
          >
            <div className="mt-4">
              <StarRating rating={parseFloat(avgFeedbackScore)} />
            </div>
          </KPICard>
        </section>

        {/* Filters and RFP List */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="card-rfp lg:col-span-1 h-fit">
            <FilterSidebar 
              selectedBuyer={selectedBuyer}
              onBuyerChange={setSelectedBuyer}
            />
          </aside>
          
          <div className="lg:col-span-3">
            <h2 className="text-xl font-black text-foreground mb-4">Active RFPs</h2>
            {loading && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Loading RFPs...</p>
              </div>
            )}
            {error && (
              <div className="text-center py-12">
                <p className="text-error">Error: {error}</p>
              </div>
            )}
            {!loading && !error && rfpRuns.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No RFPs found. Create your first RFP to get started.</p>
              </div>
            )}
            {!loading && !error && rfpRuns.length > 0 && (
              <div className="space-y-4">
                {rfpRuns.map((run) => (
                  <RFPCard key={run.id} rfp={mapToRFP(run)} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default DashboardPage;

