import SettingsPage from "@/components/pages/SettingsPage";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function Settings() {
  return (
    <ProtectedRoute>
      <SettingsPage />
    </ProtectedRoute>
  );
}





