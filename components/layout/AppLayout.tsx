import { ReactNode, useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { logout } from "@/lib/demoAuth";

const navItems = [
  { name: "Home", path: "/home" },
  { name: "Dashboard", path: "/dashboard" },
  { name: "RFP Detail", path: "/rfp-detail" },
  { name: "Run History", path: "/history" },
  { name: "Settings", path: "/settings" },
];

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  const handleLogout = () => {
    // Clear auth state using helper
    logout();
    
    // Close dropdown
    setIsDropdownOpen(false);
    
    // Redirect to login page
    router.push('/');
  };

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
          <Link href="/home" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-warning border-2 border-foreground flex items-center justify-center shadow-sketch-sm group-hover:bg-warning/90 transition-colors">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-black tracking-tight text-foreground">RFP AI</span>
          </Link>
          
          {/* Right: Nav Links + Avatar */}
          <div className="flex items-center space-x-6">
            <ul className="hidden md:flex items-center space-x-1 text-sm font-bold">
              {navItems.map((item) => {
                const isActive = router.pathname === item.path || 
                  (item.name === "RFP Detail" && (router.pathname === "/rfp-detail" || router.pathname.startsWith("/rfp/")));
                
                return (
                  <li key={item.name}>
                    <Link
                      href={item.path}
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
            
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-10 h-10 border-2 border-foreground bg-muted overflow-hidden shadow-sketch-sm hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.9)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all cursor-pointer focus:outline-none"
              >
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
                  alt="User avatar"
                  className="w-full h-full object-cover"
                />
              </button>
              
              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border-2 border-foreground shadow-sketch-sm text-sm z-50">
                  <div className="py-1">
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-foreground hover:bg-warning/10 transition-colors"
                    >
                      Log out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </nav>
      </header>
      
      <main className="flex-grow relative z-10">{children}</main>
    </div>
  );
};

export default AppLayout;

