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
      <table className="w-full text-sm text-left table-sketch">
        <thead>
          <tr>
            <th className="px-4 py-3 font-bold text-foreground">Date</th>
            <th className="px-4 py-3 font-bold text-foreground">RFP ID</th>
            <th className="px-4 py-3 font-bold text-foreground">Buyer</th>
            <th className="px-4 py-3 font-bold text-foreground">Primary SKU</th>
            <th className="px-4 py-3 font-bold text-foreground">Win Probability</th>
            <th className="px-4 py-3 font-bold text-foreground">Stock Status</th>
            <th className="px-4 py-3 font-bold text-foreground">Feedback</th>
            <th className="px-4 py-3 font-bold text-foreground">Score</th>
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
                <Link to={`/rfp/${item.id}`} className="font-bold text-warning hover:underline">
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
