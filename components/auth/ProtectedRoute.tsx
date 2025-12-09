import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { isLoggedIn } from "@/lib/demoAuth";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const checkAuth = () => {
      const loggedIn = isLoggedIn();
      setIsAuthenticated(loggedIn);
      setIsLoading(false);
      
      if (!loggedIn) {
        router.replace('/');
      }
    };
    
    checkAuth();
  }, [router]);

  if (typeof window === 'undefined' || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;

