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
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background-light/80 backdrop-blur-md">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          {/* Left: Logo + App Name */}
          <Link href="/home" className="flex items-center space-x-2">
            <Sparkles className="w-8 h-8 text-primary" />
            <span className="text-2xl font-bold tracking-tight text-foreground">RFP AI</span>
          </Link>
          
          {/* Right: Nav Links + Avatar */}
          <div className="flex items-center space-x-8">
            <ul className="hidden md:flex items-center space-x-1 text-sm font-medium">
              {navItems.map((item) => {
                const isActive = router.pathname === item.path || 
                  (item.name === "RFP Detail" && router.pathname === "/rfp-detail");
                
                return (
                  <li key={item.name}>
                    <Link
                      href={item.path}
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
            
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-10 h-10 rounded-full border-2 border-foreground bg-muted overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
                  alt="User avatar"
                  className="w-full h-full object-cover"
                />
              </button>
              
              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-border shadow-md rounded-md text-sm z-50">
                  <div className="py-1">
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-foreground hover:bg-muted transition-colors"
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
      
      <main className="flex-grow">{children}</main>
    </div>
  );
};

export default AppLayout;

