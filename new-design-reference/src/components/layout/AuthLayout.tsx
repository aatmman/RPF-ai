import { ReactNode } from "react";
import { Sparkles } from "lucide-react";

interface AuthLayoutProps {
  children: ReactNode;
}

// Scattered geometric shapes component
const ScatteredShapes = () => {
  return (
    <>
      {/* Orange triangles */}
      <div className="absolute top-[8%] left-[5%] w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-b-[35px] border-b-orange-500 rotate-[-20deg] opacity-90" />
      <div className="absolute top-[70%] left-[3%] w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-b-[26px] border-b-orange-500 rotate-[15deg] opacity-90" />
      <div className="absolute top-[85%] left-[8%] w-0 h-0 border-l-[18px] border-l-transparent border-r-[18px] border-r-transparent border-b-[31px] border-b-orange-500 rotate-[-10deg] opacity-90" />
      <div className="absolute top-[55%] left-[45%] w-0 h-0 border-l-[14px] border-l-transparent border-r-[14px] border-r-transparent border-b-[24px] border-b-orange-500 rotate-[30deg] opacity-90" />
      
      {/* Yellow triangles */}
      <div className="absolute top-[12%] right-[35%] w-0 h-0 border-l-[22px] border-l-transparent border-r-[22px] border-r-transparent border-b-[38px] border-b-yellow-400 rotate-[10deg] opacity-90" />
      <div className="absolute top-[25%] left-[48%] w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-b-[21px] border-b-yellow-400 rotate-[-25deg] opacity-80" />
      
      {/* Yellow squares */}
      <div className="absolute top-[15%] right-[8%] w-6 h-6 bg-yellow-400 rotate-[15deg] border-2 border-black" />
      <div className="absolute top-[5%] right-[15%] w-5 h-5 bg-yellow-400 rotate-[-10deg] border-2 border-black" />
      <div className="absolute top-[60%] left-[6%] w-5 h-5 bg-yellow-400 rotate-[20deg] border-2 border-black" />
      
      {/* Orange squares */}
      <div className="absolute top-[8%] right-[5%] w-7 h-7 bg-orange-500 rotate-[25deg] border-2 border-black" />
      <div className="absolute top-[75%] right-[10%] w-6 h-6 bg-orange-500 rotate-[-15deg] border-2 border-black" />
      
      {/* Orange circles */}
      <div className="absolute top-[35%] right-[8%] w-5 h-5 rounded-full bg-orange-500 border-2 border-black" />
      <div className="absolute top-[50%] left-[50%] w-4 h-4 rounded-full bg-orange-500 border-2 border-black" />
      <div className="absolute top-[85%] left-[45%] w-5 h-5 rounded-full bg-orange-500 border-2 border-black" />
      
      {/* Yellow circles */}
      <div className="absolute top-[45%] right-[3%] w-6 h-6 rounded-full bg-yellow-400 border-2 border-black" />
      <div className="absolute top-[65%] left-[52%] w-5 h-5 rounded-full bg-yellow-400 border-2 border-black" />
      <div className="absolute top-[80%] right-[5%] w-4 h-4 rounded-full bg-yellow-400 border-2 border-black" />
      <div className="absolute top-[90%] left-[55%] w-4 h-4 rounded-full bg-yellow-400 border-2 border-black" />
      
      {/* Black outlined circles */}
      <div className="absolute top-[55%] right-[15%] w-5 h-5 rounded-full border-2 border-black bg-transparent" />
      <div className="absolute top-[75%] left-[48%] w-4 h-4 rounded-full border-2 border-black bg-transparent" />
    </>
  );
};

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="relative w-full min-h-screen flex flex-col overflow-hidden">
      {/* Split background */}
      <div className="absolute inset-0">
        <div className="h-[38%] bg-yellow-300" />
        <div className="h-[62%] bg-white" />
      </div>
      
      {/* Scattered shapes */}
      <ScatteredShapes />
      
      {/* Header with logo */}
      <header className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 z-10">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-8 h-8 text-orange-500" />
          <span className="font-black text-xl text-black tracking-tight">RFP AI</span>
        </div>
      </header>
      
      {/* Main content */}
      <main className="relative flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center z-10 py-8">
        {children}
      </main>
    </div>
  );
};

export default AuthLayout;
