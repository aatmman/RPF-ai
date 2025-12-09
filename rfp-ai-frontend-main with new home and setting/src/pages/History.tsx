import { useState } from "react";
import { Calendar, ChevronDown } from "lucide-react";
import AppLayout from "@/components/layout/AppLayout";
import KPICard from "@/components/shared/KPICard";
import FilterChip from "@/components/shared/FilterChip";
import HistoryTable from "@/components/history/HistoryTable";
import { historyItems, kpiData } from "@/data/mockData";

const History = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredItems = historyItems.filter((item) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Win") return item.feedback === "win";
    if (activeFilter === "Loss") return item.feedback === "loss";
    return true;
  });

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* KPI Cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <KPICard title="Total RFPs" value={kpiData.totalRFPs.toLocaleString()} />
          <KPICard
            title="Win Rate"
            value={`${kpiData.historyWinRate}%`}
            valueClassName="gradient-text"
          />
          <KPICard
            title="Avg. Feedback Score"
            value={kpiData.historyFeedbackScore}
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
                  <option>Global Mart</option>
                  <option>Fresh Foods Inc.</option>
                  <option>MegaCorp Retail</option>
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

          <HistoryTable items={filteredItems} />
        </section>
      </div>
    </AppLayout>
  );
};

export default History;
