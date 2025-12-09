import RFPRankingsPage from "@/components/pages/RFPRankingsPage";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function RFPRankings() {
  return (
    <ProtectedRoute>
      <RFPRankingsPage />
    </ProtectedRoute>
  );
}





