import { useEffect, useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import KPICard from "@/components/shared/KPICard";
import { Clock, Search, FileText, Package, FlaskConical } from "lucide-react";

interface Lead {
  id: string;
  source_name?: string;
  title?: string;
  buyer?: string;
  deadline?: string;
  status?: string;
  created_at?: string;
}

interface Insight {
  icon: typeof FileText;
  title: string;
  details: string;
}

const getStatusLabel = (status: string) => {
  switch (status) {
    case "new":
      return "New";
    case "in-progress":
      return "In Progress";
    case "responded":
      return "Responded";
    case "analyzed":
      return "Analyzed";
    default:
      return status || "New";
  }
};

const HomePage = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [kpis, setKpis] = useState({
    totalLeads: 0,
    activeRFPs: 0,
    winRate: "0%",
    avgResponseTime: "N/A",
  });
  const [insights, setInsights] = useState<Insight[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastScanned, setLastScanned] = useState<string>("Never");
  const [isAnalyzingId, setIsAnalyzingId] = useState<string | null>(null);

  useEffect(() => {
    fetchHomeData();
  }, []);

  const fetchHomeData = async () => {
    try {
      setLoading(true);
      
      // Fetch manual leads (last 30 days)
      const leadsRes = await fetch("/api/leads/manual");
      const leadsData = await leadsRes.json();
      if (leadsData.data) {
        setLeads(leadsData.data.slice(0, 10)); // Show latest 10
        setKpis((prev) => ({ ...prev, totalLeads: leadsData.data.length }));
      }

      // Fetch RFP runs for KPIs
      const rfpRes = await fetch("/api/rfp/history");
      const rfpData = await rfpRes.json();
      if (rfpData.data) {
        const rfpRuns = rfpData.data;
        setKpis((prev) => ({
          ...prev,
          activeRFPs: rfpRuns.length,
        }));

        // Calculate win rate
        const wins = rfpRuns.filter((r: any) => r.feedback_label === "win").length;
        const losses = rfpRuns.filter((r: any) => r.feedback_label === "loss").length;
        const total = wins + losses;
        if (total > 0) {
          setKpis((prev) => ({
            ...prev,
            winRate: `${Math.round((wins / total) * 100)}%`,
          }));
        }

        // Get latest RFP
        if (rfpRuns.length > 0) {
          const latest = rfpRuns[0];
          const latestInsight: Insight = {
            icon: FileText,
            title: "Latest RFP Analyzed",
            details: `${latest.rfp_id || "N/A"} • ${latest.buyer_name || "Unknown"} • ${latest.estimated_win_probability ? `${latest.estimated_win_probability}% win prob` : ""}`,
          };

          // Get top SKU in wins
          const winsOnly = rfpRuns.filter((r: any) => r.feedback_label === "win" && r.primary_sku);
          if (winsOnly.length > 0) {
            const skuCounts: Record<string, number> = {};
            winsOnly.forEach((r: any) => {
              if (r.primary_sku) {
                skuCounts[r.primary_sku] = (skuCounts[r.primary_sku] || 0) + 1;
              }
            });
            const topSku = Object.entries(skuCounts).sort((a, b) => b[1] - a[1])[0];
            if (topSku) {
              const skuInsight: Insight = {
                icon: Package,
                title: "Top SKU in Recent Wins",
                details: `${topSku[0]} • ${topSku[1]} wins`,
              };
              setInsights([latestInsight, skuInsight]);
            } else {
              setInsights([latestInsight]);
            }
          } else {
            setInsights([latestInsight]);
          }
        }
      }

      // Set last scanned time
      setLastScanned(new Date().toLocaleTimeString());
    } catch (error) {
      console.error("Error fetching home data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleScanNow = async () => {
    try {
      await fetch("/api/leads/scan", { method: "POST" });
      await fetchHomeData(); // Refresh data
    } catch (error) {
      console.error("Error scanning leads:", error);
    }
  };

  const refreshLeads = async () => {
    try {
      const leadsRes = await fetch("/api/leads/manual");
      const leadsData = await leadsRes.json();
      if (leadsData.data) {
        setLeads(leadsData.data.slice(0, 10)); // Show latest 10
        setKpis((prev) => ({ ...prev, totalLeads: leadsData.data.length }));
      }
    } catch (error) {
      console.error("Error refreshing leads:", error);
    }
  };

  async function handleAnalyzeLead(leadId: string) {
    try {
      setIsAnalyzingId(leadId);
      const resp = await fetch("/api/leads/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ leadId }),
      });

      if (!resp.ok) {
        const errorText = await resp.text();
        console.error("Analyze lead failed", errorText);
        alert("Failed to analyze lead. Please try again.");
        return;
      }

      // Optional: you can read analysis JSON here if you want
      await resp.json();

      // Refresh leads list so status becomes 'analyzed'
      await refreshLeads();
    } catch (error) {
      console.error("Error analyzing lead:", error);
      alert("Error analyzing lead. Please try again.");
    } finally {
      setIsAnalyzingId(null);
    }
  }

  return (
    <AppLayout>
      <div className="container mx-auto px-6 py-12">
        {/* Hero Section */}
        <section className="mb-12">
          <div className="card-rfp">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                  Live RFP Signals & Win Performance
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl">
                  Our Agentic AI continuously scans the web for new RFP opportunities, 
                  summarizes key requirements, and helps you prioritize high-win-probability leads.
                </p>
              </div>
              <div className="hidden lg:flex items-center gap-4">
                <button onClick={handleScanNow} className="btn-primary text-sm">
                  <Search className="w-4 h-4 mr-2" />
                  Scan Now
                </button>
                <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 px-4 py-2 rounded-full">
                  <Search className="w-4 h-4" />
                  <span>AI scanning active</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* KPI Cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <KPICard
            title="Total Leads Found"
            value={kpis.totalLeads.toString()}
            suffix="last 30 days"
          />
          <KPICard
            title="Active RFPs in Pipeline"
            value={kpis.activeRFPs.toString()}
          />
          <KPICard
            title="Win Rate"
            value={kpis.winRate}
            valueClassName="text-green-600"
          />
          <KPICard
            title="Avg. Response Time"
            value={kpis.avgResponseTime}
            suffix="hours"
          />
        </section>

        {/* Live Leads Panel */}
        <section className="mb-12">
          <div className="card-rfp">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-foreground">Live Leads</h2>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>Last scanned: {lastScanned}</span>
              </div>
            </div>
            
            {loading ? (
              <div className="text-center py-8 text-muted-foreground">Loading leads...</div>
            ) : leads.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">No leads found</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Lead Source</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">RFP Title</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Buyer / Agency</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Submission Deadline</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Status</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leads.map((lead) => (
                      <tr key={lead.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                        <td className="py-3 px-4 text-sm text-muted-foreground">{lead.source_name || "N/A"}</td>
                        <td className="py-3 px-4 text-sm font-medium text-foreground">{lead.title || "N/A"}</td>
                        <td className="py-3 px-4 text-sm text-muted-foreground">{lead.buyer || "N/A"}</td>
                        <td className="py-3 px-4 text-sm text-muted-foreground">{lead.deadline || "N/A"}</td>
                        <td className="py-3 px-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            lead.status === 'new' ? 'bg-success-light text-success' :
                            lead.status === 'in-progress' ? 'bg-warning-light text-warning' :
                            lead.status === 'analyzed' ? 'bg-primary/10 text-primary' :
                            'bg-secondary-50 text-secondary-600'
                          }`}>
                            {getStatusLabel(lead.status || "new")}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              className="text-xs px-2 py-1 rounded bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                              disabled={lead.status === 'analyzed' || isAnalyzingId === lead.id}
                              onClick={() => handleAnalyzeLead(lead.id)}
                            >
                              {isAnalyzingId === lead.id
                                ? 'Analyzing...'
                                : lead.status === 'analyzed'
                                ? 'Analyzed'
                                : 'Analyze with RFP AI'}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>

        {/* Insights Section */}
        <section>
          <h2 className="text-xl font-bold text-foreground mb-6">Insights & Activity</h2>
          {insights.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {insights.map((insight, index) => (
                <div key={index} className="card-rfp">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <insight.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-foreground mb-1">{insight.title}</h3>
                      <p className="text-sm text-muted-foreground">{insight.details}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">No insights available yet</div>
          )}
        </section>
      </div>
    </AppLayout>
  );
};

export default HomePage;

