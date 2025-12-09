import Link from "next/link";
import StatusBadge from "@/components/shared/StatusBadge";
import ProgressBar from "@/components/shared/ProgressBar";

export interface HistoryItem {
  id: string;
  date: string;
  rfpId: string;
  rfp_id?: string;
  buyer: string;
  buyer_name?: string;
  primarySku: string;
  primary_sku?: string;
  winProbability: number;
  estimated_win_probability?: number;
  stockStatus: "in-stock" | "out-of-stock";
  stock_status?: string;
  feedback: "win" | "loss";
  feedback_label?: string;
  score: number;
  feedback_score?: number;
}

interface HistoryTableProps {
  items: HistoryItem[];
}

const HistoryTable = ({ items }: HistoryTableProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead className="border-b border-border">
          <tr>
            <th className="px-4 py-3 font-semibold text-muted-foreground">Date</th>
            <th className="px-4 py-3 font-semibold text-muted-foreground">RFP ID</th>
            <th className="px-4 py-3 font-semibold text-muted-foreground">Buyer</th>
            <th className="px-4 py-3 font-semibold text-muted-foreground">Primary SKU</th>
            <th className="px-4 py-3 font-semibold text-muted-foreground">Win Probability</th>
            <th className="px-4 py-3 font-semibold text-muted-foreground">Stock Status</th>
            <th className="px-4 py-3 font-semibold text-muted-foreground">Feedback</th>
            <th className="px-4 py-3 font-semibold text-muted-foreground">Score</th>
            <th className="px-4 py-3"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {items.map((item) => {
            const rfpId = item.rfpId || item.rfp_id || item.id;
            const buyer = item.buyer || item.buyer_name || "Unknown";
            const primarySku = item.primarySku || item.primary_sku || "N/A";
            const winProbability = item.winProbability || item.estimated_win_probability || 0;
            
            // Map stock status
            let stockStatus: "in-stock" | "out-of-stock" = "in-stock";
            if (item.stockStatus) {
              stockStatus = item.stockStatus;
            } else if (item.stock_status) {
              const status = item.stock_status.toLowerCase();
              stockStatus = status.includes("out") || status.includes("unavailable") ? "out-of-stock" : "in-stock";
            }
            
            // Map feedback
            let feedback: "win" | "loss" = "win";
            if (item.feedback) {
              feedback = item.feedback;
            } else if (item.feedback_label) {
              feedback = item.feedback_label.toLowerCase() === "win" ? "win" : "loss";
            }
            
            const score = item.score || item.feedback_score || 0;
            
            return (
              <tr key={item.id}>
                <td className="px-4 py-4 whitespace-nowrap">{item.date}</td>
                <td className="px-4 py-4 font-mono text-xs text-muted-foreground">{rfpId}</td>
                <td className="px-4 py-4">{buyer}</td>
                <td className="px-4 py-4">{primarySku}</td>
                <td className="px-4 py-4">
                  <ProgressBar percentage={Math.round(winProbability)} />
                </td>
                <td className="px-4 py-4">
                  <StatusBadge status={stockStatus} />
                </td>
                <td className="px-4 py-4">
                  <StatusBadge status={feedback} />
                </td>
                <td className="px-4 py-4">{score}/5</td>
                <td className="px-4 py-4 text-right">
                  {item.rfp_id ? (
                    <Link href={`/rfp/${item.rfp_id}`} className="font-semibold text-primary hover:underline">
                      View
                    </Link>
                  ) : (
                    <span className="text-muted-foreground">-</span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default HistoryTable;





