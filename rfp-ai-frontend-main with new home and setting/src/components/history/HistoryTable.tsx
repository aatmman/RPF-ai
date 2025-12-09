import { Link } from "react-router-dom";
import { HistoryItem } from "@/data/mockData";
import StatusBadge from "@/components/shared/StatusBadge";
import ProgressBar from "@/components/shared/ProgressBar";

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
          {items.map((item) => (
            <tr key={item.id}>
              <td className="px-4 py-4 whitespace-nowrap">{item.date}</td>
              <td className="px-4 py-4 font-mono text-xs text-muted-foreground">{item.rfpId}</td>
              <td className="px-4 py-4">{item.buyer}</td>
              <td className="px-4 py-4">{item.primarySku}</td>
              <td className="px-4 py-4">
                <ProgressBar percentage={item.winProbability} />
              </td>
              <td className="px-4 py-4">
                <StatusBadge status={item.stockStatus} />
              </td>
              <td className="px-4 py-4">
                <StatusBadge status={item.feedback} />
              </td>
              <td className="px-4 py-4">{item.score}/5</td>
              <td className="px-4 py-4 text-right">
                <Link to={`/rfp/${item.id}`} className="font-semibold text-primary hover:underline">
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HistoryTable;
