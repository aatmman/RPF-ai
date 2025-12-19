import { useEffect, useState } from "react";
import Link from "next/link";
import AppLayout from "@/components/layout/AppLayout";

interface RfpRun {
  id: string;
  rfp_id: string;
  created_at: string;
  buyer_name?: string;
  primary_sku?: string;
  primary_name?: string;
  estimated_win_probability?: number;
  primary_match_percent?: number;
  recommended_scenario?: string;
  feedback_label?: string;
}

const RFPRankingsPage = () => {
  const [rfps, setRfps] = useState<RfpRun[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'created_at' | 'estimated_win_probability'>('created_at');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  useEffect(() => {
    fetchRFPs();
  }, [sortBy, sortOrder]);

  const fetchRFPs = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/rfp/history');
      const result = await response.json();

      if (result.error) {
        setError(result.error);
        return;
      }

      let data = result.data || [];
      
      // Sort data
      data.sort((a: RfpRun, b: RfpRun) => {
        let aVal: any, bVal: any;
        
        if (sortBy === 'created_at') {
          aVal = new Date(a.created_at).getTime();
          bVal = new Date(b.created_at).getTime();
        } else {
          aVal = a.estimated_win_probability || 0;
          bVal = b.estimated_win_probability || 0;
        }
        
        return sortOrder === 'asc' ? aVal - bVal : bVal - aVal;
      });

      setRfps(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch RFPs');
    } finally {
      setLoading(false);
    }
  };

  const getOutcomeBadge = (label?: string) => {
    if (!label) return null;
    
    const badgeClass = label === 'win' 
      ? 'bg-success text-white'
      : label === 'loss'
      ? 'bg-error text-white'
      : 'bg-muted text-foreground';
    
    return (
      <span className={`inline-flex items-center px-2.5 py-1 text-xs font-bold border-2 border-foreground ${badgeClass}`}>
        {label.charAt(0).toUpperCase() + label.slice(1)}
      </span>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  if (loading) {
    return (
      <AppLayout>
        <div className="container mx-auto px-6 py-12">
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading RFPs...</p>
          </div>
        </div>
      </AppLayout>
    );
  }

  if (error) {
    return (
      <AppLayout>
        <div className="container mx-auto px-6 py-12">
          <div className="text-center py-12">
            <p className="text-error">{error}</p>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="container mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-foreground mb-2">RFP Rankings</h1>
          <p className="text-muted-foreground">View and analyze all RFP opportunities</p>
        </div>

        {/* Sort Controls */}
        <div className="mb-6 flex items-center gap-4">
          <label className="text-sm font-bold text-foreground">Sort by:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'created_at' | 'estimated_win_probability')}
            className="input-sketch px-3 py-2 text-sm"
          >
            <option value="created_at">Created Date</option>
            <option value="estimated_win_probability">Win Probability</option>
          </select>
          <button
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            className="btn-secondary text-sm"
          >
            {sortOrder === 'asc' ? '↑ Ascending' : '↓ Descending'}
          </button>
        </div>

        {/* Table */}
        <div className="card-rfp">
          <div className="overflow-x-auto">
            <table className="w-full table-sketch">
              <thead>
                <tr>
                  <th className="text-left py-3 px-4 text-sm font-bold text-foreground">RFP ID</th>
                  <th className="text-left py-3 px-4 text-sm font-bold text-foreground">Buyer</th>
                  <th className="text-left py-3 px-4 text-sm font-bold text-foreground">Primary SKU</th>
                  <th className="text-left py-3 px-4 text-sm font-bold text-foreground">Win Probability</th>
                  <th className="text-left py-3 px-4 text-sm font-bold text-foreground">Spec Match %</th>
                  <th className="text-left py-3 px-4 text-sm font-bold text-foreground">Recommended Scenario</th>
                  <th className="text-left py-3 px-4 text-sm font-bold text-foreground">Created Date</th>
                  <th className="text-left py-3 px-4 text-sm font-bold text-foreground">Outcome</th>
                  <th className="text-right py-3 px-4 text-sm font-bold text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {rfps.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="text-center py-8 text-muted-foreground">
                      No RFPs found
                    </td>
                  </tr>
                ) : (
                  rfps.map((rfp) => (
                    <tr key={rfp.id} className="hover:bg-warning/5 transition-colors">
                      <td className="py-3 px-4 text-sm font-medium text-foreground">{rfp.rfp_id || 'N/A'}</td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">{rfp.buyer_name || 'N/A'}</td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">
                        {rfp.primary_sku || 'N/A'}
                        {rfp.primary_name && (
                          <span className="block text-xs text-muted-foreground/70">{rfp.primary_name}</span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-sm text-foreground">
                        {rfp.estimated_win_probability !== undefined 
                          ? `${rfp.estimated_win_probability}%` 
                          : 'N/A'}
                      </td>
                      <td className="py-3 px-4 text-sm text-foreground">
                        {rfp.primary_match_percent !== undefined 
                          ? `${rfp.primary_match_percent}%` 
                          : 'N/A'}
                      </td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">
                        {rfp.recommended_scenario || 'N/A'}
                      </td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">
                        {formatDate(rfp.created_at)}
                      </td>
                      <td className="py-3 px-4">
                        {getOutcomeBadge(rfp.feedback_label)}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex justify-end">
                          <Link href={`/rfp/${rfp.rfp_id}`}>
                            <button className="px-3 py-1 text-sm border-2 border-foreground shadow-sketch-sm bg-warning text-white hover:bg-warning/90 hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.9)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all duration-150 font-bold">
                              View RFP
                            </button>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default RFPRankingsPage;





