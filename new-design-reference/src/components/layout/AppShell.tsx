import { ReactNode } from "react";
import Navbar from "./Navbar";

interface AppShellProps {
  children: ReactNode;
}

const AppShell = ({ children }: AppShellProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">{children}</main>
    </div>
  );
};

export default AppShell;
