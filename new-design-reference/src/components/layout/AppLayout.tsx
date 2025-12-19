import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Home", path: "/home" },
  { name: "Dashboard", path: "/dashboard" },
  { name: "RFP Detail", path: "/rfp/1" },
  { name: "Run History", path: "/history" },
  { name: "Settings", path: "/settings" },
];

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Subtle decorative shapes */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-20 left-10 w-8 h-8 border-2 border-warning/30 rotate-12" />
        <div className="absolute top-40 right-20 w-6 h-6 border-2 border-warning/20 rounded-full" />
        <div className="absolute bottom-40 left-1/4 w-4 h-4 bg-warning/10 rotate-45" />
        <div className="absolute top-1/3 right-1/3 w-5 h-5 border-2 border-warning/20 rotate-45" />
      </div>

      <header className="sticky top-0 z-50 w-full bg-white border-b-2 border-foreground">
        <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
          {/* Left: Logo + App Name */}
          <Link to="/home" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-warning border-2 border-foreground flex items-center justify-center shadow-sketch-sm group-hover:bg-warning/90 transition-colors">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-black tracking-tight text-foreground">RFP AI</span>
          </Link>
          
          {/* Right: Nav Links + Avatar */}
          <div className="flex items-center space-x-6">
            <ul className="hidden md:flex items-center space-x-1 text-sm font-bold">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path || 
                  (item.path === "/rfp/1" && location.pathname.startsWith("/rfp/"));
                
                return (
                  <li key={item.name}>
                    <Link
                      to={item.path}
                      className={cn(
                        "px-3 py-1.5 transition-all border-2",
                        isActive 
                          ? "bg-warning border-foreground text-white shadow-sketch-sm" 
                          : "border-transparent text-muted-foreground hover:text-foreground hover:border-foreground/30"
                      )}
                    >
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
            
            <div className="w-10 h-10 border-2 border-foreground bg-muted overflow-hidden shadow-sketch-sm">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
                alt="User avatar"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </nav>
      </header>
      
      <main className="flex-grow relative z-10">{children}</main>
    </div>
  );
};

export default AppLayout;
