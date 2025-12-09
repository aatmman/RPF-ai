import { ReactNode } from "react";
import { Sparkles } from "lucide-react";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="relative w-full min-h-screen flex flex-col items-center bg-background-light overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-[-20%] left-[-10%] w-96 h-96 bg-red-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
      <div className="absolute bottom-[-10%] right-[5%] w-96 h-96 bg-orange-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" style={{ animationDelay: "4s" }} />
      
      {/* Header with logo only */}
      <header className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-4 z-10">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-8 h-8 text-primary" />
          <span className="font-bold text-xl text-foreground">RFP AI</span>
        </div>
      </header>
      
      {/* Main content */}
      <main className="flex-grow w-full max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-center z-10 py-12">
        {children}
      </main>
    </div>
  );
};

export default AuthLayout;
