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
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background-light/80 backdrop-blur-md">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          {/* Left: Logo + App Name */}
          <Link to="/home" className="flex items-center space-x-2">
            <Sparkles className="w-8 h-8 text-primary" />
            <span className="text-2xl font-bold tracking-tight text-foreground">RFP AI</span>
          </Link>
          
          {/* Right: Nav Links + Avatar */}
          <div className="flex items-center space-x-8">
            <ul className="hidden md:flex items-center space-x-1 text-sm font-medium">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path || 
                  (item.path === "/rfp/1" && location.pathname.startsWith("/rfp/"));
                
                return (
                  <li key={item.name}>
                    <Link
                      to={item.path}
                      className={cn(
                        "px-4 py-2 rounded-full transition-all",
                        isActive 
                          ? "bg-primary/10 text-primary font-semibold" 
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                      )}
                    >
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
            
            <div className="w-10 h-10 rounded-full border-2 border-foreground bg-muted overflow-hidden shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
                alt="User avatar"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </nav>
      </header>
      
      <main className="flex-grow">{children}</main>
    </div>
  );
};

export default AppLayout;
