import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import AppShell from "@/components/layout/AppShell";
import RFPSummaryCard from "@/components/rfp-detail/RFPSummaryCard";
import AIRecommendationCard from "@/components/rfp-detail/AIRecommendationCard";
import InventoryLogisticsCard from "@/components/rfp-detail/InventoryLogisticsCard";
import DecisionRationaleCard from "@/components/rfp-detail/DecisionRationaleCard";

interface RfpRun {
  id: string;
  rfp_id: string;
  created_at: string;
  buyer_name?: string;
  quantity?: number;
  base_price?: number;
  requirements?: string;
  primary_sku?: string;
  primary_name?: string;
  primary_match_percent?: number;
  primary_confidence?: string;
  recommended_scenario?: string;
  scenario_1_total?: number;
  scenario_2_total?: number;
  scenario_3_total?: number;
  recommended_total?: number;
  unit_price?: number;
  material_total?: number;
  tests_total?: number;
  test_breakdown?: Array<{ test_name: string; price: number }> | string;
  competitor_range_min?: number;
  competitor_range_max?: number;
  stock_available?: boolean | number;
  stock_status?: string;
  rack_id?: string;
  stock_location?: string;
  estimated_win_probability?: number;
  ai_summary?: string;
  decision_reason?: string;
  decision_rationale?: string;
  feedback_label?: string;
  feedback_notes?: string;
  feedback_rating?: number;
  feedback_score?: number; // backward compatibility
}

const RFPDetailPage = () => {
  const router = useRouter();
  const id = router.isReady ? (Array.isArray(router.query.id) ? router.query.id[0] : router.query.id) : null;
  
  const [rfp, setRfp] = useState<RfpRun | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [feedbackLabel, setFeedbackLabel] = useState('');
  const [feedbackNotes, setFeedbackNotes] = useState('');
  const [feedbackRating, setFeedbackRating] = useState<number | undefined>(undefined);
  const [saving, setSaving] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  useEffect(() => {
    if (router.isReady && id) {
      fetchRFPData();
    } else if (router.isReady && !id) {
      setError('Invalid RFP ID');
      setLoading(false);
    }
  }, [router.isReady, id]);

  const fetchRFPData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`/api/rfp/${id}`);
      const result = await response.json();

      if (result.error) {
        setError(result.error);
        return;
      }

      if (!result.data) {
        setError('RFP not found');
        return;
      }

      setRfp(result.data);
      // Initialize feedback form with existing values
      setFeedbackLabel(result.data.feedback_label || '');
      setFeedbackNotes(result.data.feedback_notes || '');
      setFeedbackRating(result.data.feedback_rating ?? result.data.feedback_score ?? undefined);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch RFP data');
    } finally {
      setLoading(false);
    }
  };

  async function handleSaveFeedback(e: React.FormEvent) {
    e.preventDefault();
    if (!rfp) return;

    try {
      setSaving(true);
      setFeedbackMessage(null);

      const resp = await fetch('/api/rfp/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rfp_id: rfp.rfp_id,
          feedback_label: feedbackLabel,
          feedback_notes: feedbackNotes,
          feedback_rating: feedbackRating,
        }),
      });

      if (!resp.ok) {
        const errorData = await resp.json().catch(() => ({ error: 'Unknown error' }));
        console.error('Save feedback failed', errorData);
        const errorMessage = errorData.details || errorData.error || 'Failed to save feedback. Please try again.';
        setFeedbackMessage({ type: 'error', text: errorMessage });
        return;
      }

      // Update local state
      setRfp({
        ...rfp,
        feedback_label: feedbackLabel,
        feedback_notes: feedbackNotes,
        feedback_rating: feedbackRating,
      });

      setFeedbackMessage({ type: 'success', text: 'Feedback saved successfully!' });
    } catch (err: any) {
      console.error('Error saving feedback:', err);
      setFeedbackMessage({ type: 'error', text: err.message || 'Failed to save feedback' });
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <AppShell>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading RFP...</p>
          </div>
        </div>
      </AppShell>
    );
  }

  if (error || !rfp) {
    return (
      <AppShell>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-foreground mb-4">RFP Not Found</h1>
            <p className="text-muted-foreground mb-6">{error || 'The requested RFP could not be found.'}</p>
            <button
              onClick={() => router.push('/dashboard')}
              className="bg-primary text-primary-foreground font-medium px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <RFPSummaryCard rfp={rfp} />
          <AIRecommendationCard rfp={rfp} />
          <InventoryLogisticsCard rfp={rfp} />
          <DecisionRationaleCard rfp={rfp} />
          
          {/* Spec Match Section */}
          <div className="lg:col-span-3">
            <div className="card-rfp">
              <h2 className="text-lg font-bold mb-4">Spec Match – Technical Agent</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Primary SKU</p>
                    <p className="font-medium text-foreground">{rfp.primary_sku || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Spec Match %</p>
                    <p className="font-medium text-foreground">
                      {rfp.primary_match_percent !== undefined 
                        ? `${rfp.primary_match_percent}%` 
                        : 'N/A'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Confidence</p>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      rfp.primary_confidence?.toUpperCase() === 'HIGH'
                        ? 'bg-success-light text-success'
                        : rfp.primary_confidence?.toUpperCase() === 'MEDIUM'
                        ? 'bg-warning-light text-warning'
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {rfp.primary_confidence?.toUpperCase() || 'N/A'}
                    </span>
                  </div>
                </div>
                {rfp.primary_name && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">SKU Name</p>
                    <p className="text-foreground">{rfp.primary_name}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Pricing Scenarios Section */}
          <div className="lg:col-span-3">
            <div className="card-rfp">
              <h2 className="text-lg font-bold mb-4">Pricing Scenarios – Pricing Agent</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className={`p-4 rounded-lg border-2 ${
                  rfp.recommended_scenario === 'scenario_1' || rfp.recommended_scenario === '1'
                    ? 'border-primary bg-primary/5'
                    : 'border-border'
                }`}>
                  <p className="text-sm font-semibold text-foreground mb-2">Scenario 1 – Margin Focus</p>
                  <p className="text-2xl font-bold text-foreground">
                    {rfp.scenario_1_total 
                      ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(rfp.scenario_1_total)
                      : 'N/A'}
                  </p>
                  {rfp.recommended_scenario === 'scenario_1' || rfp.recommended_scenario === '1' ? (
                    <span className="inline-block mt-2 px-2 py-1 text-xs bg-primary text-white rounded">Recommended</span>
                  ) : null}
                </div>
                <div className={`p-4 rounded-lg border-2 ${
                  rfp.recommended_scenario === 'scenario_2' || rfp.recommended_scenario === '2'
                    ? 'border-primary bg-primary/5'
                    : 'border-border'
                }`}>
                  <p className="text-sm font-semibold text-foreground mb-2">Scenario 2 – Competitive</p>
                  <p className="text-2xl font-bold text-foreground">
                    {rfp.scenario_2_total 
                      ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(rfp.scenario_2_total)
                      : 'N/A'}
                  </p>
                  {rfp.recommended_scenario === 'scenario_2' || rfp.recommended_scenario === '2' ? (
                    <span className="inline-block mt-2 px-2 py-1 text-xs bg-primary text-white rounded">Recommended</span>
                  ) : null}
                </div>
                <div className={`p-4 rounded-lg border-2 ${
                  rfp.recommended_scenario === 'scenario_3' || rfp.recommended_scenario === '3'
                    ? 'border-primary bg-primary/5'
                    : 'border-border'
                }`}>
                  <p className="text-sm font-semibold text-foreground mb-2">Scenario 3 – Aggressive Volume</p>
                  <p className="text-2xl font-bold text-foreground">
                    {rfp.scenario_3_total 
                      ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(rfp.scenario_3_total)
                      : 'N/A'}
                  </p>
                  {rfp.recommended_scenario === 'scenario_3' || rfp.recommended_scenario === '3' ? (
                    <span className="inline-block mt-2 px-2 py-1 text-xs bg-primary text-white rounded">Recommended</span>
                  ) : null}
                </div>
              </div>
              
              {/* Test Breakdown */}
              {rfp.test_breakdown && (
                <div className="mt-6 pt-6 border-t border-border">
                  <h3 className="text-sm font-semibold text-foreground mb-3">Test Breakdown</h3>
                  <div className="space-y-2">
                    {(() => {
                      try {
                        const breakdown = typeof rfp.test_breakdown === 'string' 
                          ? JSON.parse(rfp.test_breakdown) 
                          : rfp.test_breakdown;
                        if (Array.isArray(breakdown)) {
                          return breakdown.map((test: any, index: number) => (
                            <div key={index} className="flex justify-between items-center text-sm">
                              <span className="text-muted-foreground">{test.test_name || test.name || `Test ${index + 1}`}</span>
                              <span className="font-medium text-foreground">
                                {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(test.price || 0)}
                              </span>
                            </div>
                          ));
                        }
                      } catch (e) {
                        return <p className="text-sm text-muted-foreground">Unable to parse test breakdown</p>;
                      }
                      return null;
                    })()}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Feedback Section */}
          <div className="lg:col-span-3">
            <div className="card-rfp">
              <h2 className="text-lg font-bold mb-4">Feedback</h2>
              
              {rfp.feedback_label && (
                <div className="mb-4">
                  <p className="text-sm text-muted-foreground mb-2">Current Feedback:</p>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                    rfp.feedback_label === 'win' 
                      ? 'bg-success-light text-success' 
                      : rfp.feedback_label === 'loss'
                      ? 'bg-error-light text-error'
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    {rfp.feedback_label.charAt(0).toUpperCase() + rfp.feedback_label.slice(1)}
                    {rfp.feedback_rating && ` (${rfp.feedback_rating}/5)`}
                  </span>
                </div>
              )}

              <form onSubmit={handleSaveFeedback} className="space-y-4">
                <div>
                  <label htmlFor="feedback-label" className="block text-sm font-medium text-foreground mb-2">
                    Outcome
                  </label>
                  <select
                    id="feedback-label"
                    value={feedbackLabel}
                    onChange={(e) => setFeedbackLabel(e.target.value)}
                    className="w-full rounded-lg border border-border bg-background-light px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Select outcome</option>
                    <option value="win">Win</option>
                    <option value="loss">Loss</option>
                    <option value="pending">Pending</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="feedback-notes" className="block text-sm font-medium text-foreground mb-2">
                    Internal Notes / Reasons
                  </label>
                  <textarea
                    id="feedback-notes"
                    value={feedbackNotes}
                    onChange={(e) => setFeedbackNotes(e.target.value)}
                    rows={4}
                    className="w-full rounded-lg border border-border bg-background-light px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-muted-foreground"
                    placeholder="Add internal notes or reasons for this outcome..."
                  />
                </div>

                <div>
                  <label htmlFor="feedback-rating" className="block text-sm font-medium text-foreground mb-2">
                    Rating (Optional, 1-5)
                  </label>
                  <input
                    id="feedback-rating"
                    type="number"
                    min={1}
                    max={5}
                    value={feedbackRating ?? ''}
                    onChange={(e) => setFeedbackRating(e.target.value ? Number(e.target.value) : undefined)}
                    className="w-full rounded-lg border border-border bg-background-light px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Enter rating 1-5"
                  />
                </div>

                <button
                  type="submit"
                  disabled={saving}
                  className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                >
                  {saving ? 'Saving...' : 'Save Feedback'}
                </button>

                {feedbackMessage && (
                  <div className={`text-sm ${feedbackMessage.type === 'success' ? 'text-success' : 'text-error'}`}>
                    {feedbackMessage.text}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
};

export default RFPDetailPage;

