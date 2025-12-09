import AppLayout from "@/components/layout/AppLayout";
import KPICard from "@/components/shared/KPICard";
import { Clock, Search, TrendingUp, FileText, Package, FlaskConical } from "lucide-react";

// Mock data for live leads
const mockLeads = [
  {
    id: 1,
    source: "MESB Portal",
    title: "Supply of Electrical Cables - Phase 2",
    buyer: "TNB Berhad",
    deadline: "2025-12-20",
    status: "new" as const,
  },
  {
    id: 2,
    source: "MyProcurement",
    title: "Industrial Wiring Tender Q1 2026",
    buyer: "Petronas Chemicals",
    deadline: "2025-12-28",
    status: "in-progress" as const,
  },
  {
    id: 3,
    source: "ePerolehan",
    title: "Cable Supply for Infrastructure Project",
    buyer: "JKR Malaysia",
    deadline: "2026-01-05",
    status: "responded" as const,
  },
  {
    id: 4,
    source: "MESB Portal",
    title: "High Voltage Cable Installation",
    buyer: "Sarawak Energy",
    deadline: "2026-01-10",
    status: "new" as const,
  },
];

// Mock insights data
const mockInsights = [
  {
    icon: FileText,
    title: "Latest RFP Analyzed",
    details: "RFP-2024-0847 • TNB Berhad • Due Dec 20",
  },
  {
    icon: Package,
    title: "Top SKU in Recent Wins",
    details: "SKU-1124 • XLPE Cable 33kV • 8 wins",
  },
  {
    icon: FlaskConical,
    title: "Common Test Requirement",
    details: "IEC 60502-2 Compliance • 12 RFPs this week",
  },
];

const getStatusLabel = (status: string) => {
  switch (status) {
    case "new":
      return "New";
    case "in-progress":
      return "In Progress";
    case "responded":
      return "Responded";
    default:
      return status;
  }
};

const Home = () => {
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
              <div className="hidden lg:flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 px-4 py-2 rounded-full">
                <Search className="w-4 h-4" />
                <span>AI scanning active</span>
              </div>
            </div>
          </div>
        </section>

        {/* KPI Cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <KPICard
            title="Total Leads Found"
            value="127"
            suffix="last 30 days"
          />
          <KPICard
            title="Active RFPs in Pipeline"
            value="24"
          />
          <KPICard
            title="Win Rate"
            value="68%"
            valueClassName="text-green-600"
          />
          <KPICard
            title="Avg. Response Time"
            value="4.2"
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
                <span>Last scanned: 5 minutes ago</span>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Lead Source</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">RFP Title</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Buyer / Agency</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Submission Deadline</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {mockLeads.map((lead) => (
                    <tr key={lead.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="py-4 px-4 text-sm text-muted-foreground">{lead.source}</td>
                      <td className="py-4 px-4 text-sm font-medium text-foreground">{lead.title}</td>
                      <td className="py-4 px-4 text-sm text-muted-foreground">{lead.buyer}</td>
                      <td className="py-4 px-4 text-sm text-muted-foreground">{lead.deadline}</td>
                      <td className="py-4 px-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          lead.status === 'new' ? 'bg-success-light text-success' :
                          lead.status === 'in-progress' ? 'bg-warning-light text-warning' :
                          'bg-secondary-50 text-secondary-600'
                        }`}>
                          {getStatusLabel(lead.status)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Insights Section */}
        <section>
          <h2 className="text-xl font-bold text-foreground mb-6">Insights & Activity</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mockInsights.map((insight, index) => (
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
        </section>
      </div>
    </AppLayout>
  );
};

export default Home;
