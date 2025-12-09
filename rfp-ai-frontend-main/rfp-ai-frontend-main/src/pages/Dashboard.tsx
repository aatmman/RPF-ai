import AppShell from "@/components/layout/AppShell";
import KPICard from "@/components/shared/KPICard";
import Sparkline from "@/components/shared/Sparkline";
import StarRating from "@/components/shared/StarRating";
import FilterSidebar from "@/components/dashboard/FilterSidebar";
import RFPCard from "@/components/dashboard/RFPCard";
import { activeRFPs, kpiData } from "@/data/mockData";

const Dashboard = () => {
  return (
    <AppShell>
      <div className="container mx-auto px-6 py-12">
        {/* KPI Cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <KPICard
            title="Total RFPs"
            value={kpiData.totalRFPs.toLocaleString()}
            sparkline={<Sparkline points="0,30 10,25 20,28 30,22 40,26 50,20 60,15 70,18 80,12 90,16 100,10" color="primary" />}
          />
          <KPICard
            title="Win Rate"
            value={`${kpiData.winRate}%`}
            sparkline={<Sparkline points="0,15 10,18 20,12 30,16 40,10 50,14 60,8 70,12 80,5 90,8 100,3" color="secondary" />}
          />
          <KPICard
            title="Avg. Win Probability"
            value={`${kpiData.avgWinProbability}%`}
            sparkline={<Sparkline points="0,5 10,8 20,4 30,10 40,8 50,12 60,10 70,15 80,12 90,18 100,15" color="primary" />}
          />
          <KPICard
            title="Feedback Score"
            value={`${kpiData.feedbackScore}/5`}
          >
            <div className="mt-4">
              <StarRating rating={kpiData.feedbackScore} />
            </div>
          </KPICard>
        </section>

        {/* Filters and RFP List */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <FilterSidebar />
          
          <div className="lg:col-span-3">
            <h2 className="text-xl font-bold text-foreground mb-4">Active RFPs</h2>
            <div className="space-y-4">
              {activeRFPs.map((rfp) => (
                <RFPCard key={rfp.id} rfp={rfp} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
};

export default Dashboard;
