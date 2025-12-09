import { useState, useEffect } from "react";
import { Calendar, ChevronDown } from "lucide-react";
import AppShell from "@/components/layout/AppShell";
import KPICard from "@/components/shared/KPICard";
import FilterChip from "@/components/shared/FilterChip";
import HistoryTable, { HistoryItem } from "@/components/history/HistoryTable";

interface RfpRun {
  id: string;
  rfp_id: string;
  created_at: string;
  buyer_name?: string;
  primary_sku?: string;
  estimated_win_probability?: number;
  stock_status?: string;
  feedback_label?: string;
  feedback_score?: number;
}

const HistoryPage = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [rfpRuns, setRfpRuns] = useState<RfpRun[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchRFPHistory();
  }, []);

  const fetchRFPHistory = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/rfp/history');
      const result = await response.json();

      if (result.error) {
        setError(result.error);
      } else {
        setRfpRuns(result.data || []);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to fetch RFP history');
    } finally {
      setLoading(false);
    }
  };

  // Map RfpRun to HistoryItem
  const mapToHistoryItem = (run: RfpRun): HistoryItem => {
    // Map stock_status
    let stockStatus: "in-stock" | "out-of-stock" = "in-stock";
    if (run.stock_status) {
      const status = run.stock_status.toLowerCase();
      stockStatus = status.includes("out") || status.includes("unavailable") ? "out-of-stock" : "in-stock";
    }

    // Map feedback
    let feedback: "win" | "loss" = "win";
    if (run.feedback_label) {
      feedback = run.feedback_label.toLowerCase() === "win" ? "win" : "loss";
    }

    return {
      id: run.id,
      date: new Date(run.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      rfpId: run.rfp_id || `RFP-${run.id.slice(0, 8)}`,
      rfp_id: run.rfp_id,
      buyer: run.buyer_name || "Unknown Buyer",
      buyer_name: run.buyer_name,
      primarySku: run.primary_sku || "N/A",
      primary_sku: run.primary_sku,
      winProbability: run.estimated_win_probability || 0,
      estimated_win_probability: run.estimated_win_probability,
      stockStatus,
      stock_status: run.stock_status,
      feedback,
      feedback_label: run.feedback_label,
      score: run.feedback_score || 0,
      feedback_score: run.feedback_score,
    };
  };

  const historyItems = rfpRuns.map(mapToHistoryItem);

  const filteredItems = historyItems.filter((item) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Win") return item.feedback === "win";
    if (activeFilter === "Loss") return item.feedback === "loss";
    return true;
  });

  // Calculate KPIs
  const totalRFPs = historyItems.length;
  const winRate = historyItems.length > 0
    ? Math.round((historyItems.filter(item => item.feedback === "win").length / historyItems.length) * 100)
    : 0;
  const avgFeedbackScore = historyItems.length > 0
    ? (historyItems.reduce((sum, item) => sum + item.score, 0) / historyItems.length).toFixed(1)
    : "0.0";

  return (
    <AppShell>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* KPI Cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <KPICard title="Total RFPs" value={totalRFPs.toLocaleString()} />
          <KPICard
            title="Win Rate"
            value={`${winRate}%`}
            valueClassName="gradient-text"
          />
          <KPICard
            title="Avg. Feedback Score"
            value={avgFeedbackScore}
            suffix="/ 5"
          />
        </section>

        {/* History Table */}
        <section className="card-rfp">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex items-center space-x-4">
              {/* Date Range Input */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Select date range"
                  className="w-60 pl-10 pr-4 py-2 text-sm border border-border rounded-md bg-transparent focus:ring-primary focus:border-primary"
                />
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
              </div>

              {/* Buyer Select */}
              <div className="relative">
                <select className="w-48 appearance-none pl-4 pr-10 py-2 text-sm border border-border rounded-md bg-transparent focus:ring-primary focus:border-primary">
                  <option>All Buyers</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4 pointer-events-none" />
              </div>
            </div>

            {/* Filter Chips */}
            <div className="flex items-center space-x-2">
              {["All", "Win", "Loss"].map((filter) => (
                <FilterChip
                  key={filter}
                  label={filter}
                  active={activeFilter === filter}
                  onClick={() => setActiveFilter(filter)}
                />
              ))}
            </div>
          </div>

          {loading && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading history...</p>
            </div>
          )}
          {error && (
            <div className="text-center py-12">
              <p className="text-error">Error: {error}</p>
            </div>
          )}
          {!loading && !error && (
            <HistoryTable items={filteredItems} />
          )}
        </section>
      </div>
    </AppShell>
  );
};

export default HistoryPage;





