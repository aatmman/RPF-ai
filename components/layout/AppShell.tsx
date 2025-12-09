import { ReactNode } from "react";
import AppLayout from "./AppLayout";

interface AppShellProps {
  children: ReactNode;
}

const AppShell = ({ children }: AppShellProps) => {
  return <AppLayout>{children}</AppLayout>;
};

export default AppShell;

