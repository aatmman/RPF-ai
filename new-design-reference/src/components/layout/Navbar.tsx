import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "RFP Detail", path: "/rfp/1" },
  { name: "Run History", path: "/history" },
  { name: "Settings", path: "/settings" },
];

interface NavbarProps {
  showLogo?: boolean;
}

const Navbar = ({ showLogo = true }: NavbarProps) => {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background-light/80 backdrop-blur-md">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        {showLogo && (
          <Link to="/dashboard" className="flex items-center space-x-2">
            <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-orange-400" />
            <span className="text-2xl font-bold tracking-tight text-foreground">RFP AI</span>
          </Link>
        )}
        
        <div className="flex items-center space-x-8">
          <ul className="hidden md:flex items-center space-x-6 text-sm font-medium text-muted-foreground">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path || 
                (item.path === "/rfp/1" && location.pathname.startsWith("/rfp/"));
              
              return (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className={cn(
                      "transition-colors hover:text-foreground",
                      isActive && "text-primary font-semibold border-b-2 border-primary pb-1"
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
  );
};

export default Navbar;
