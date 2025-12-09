import { useState } from "react";
import { useRouter } from "next/router";
import { Users, Package, Target } from "lucide-react";
import AuthLayout from "@/components/layout/AuthLayout";
import { login, DEMO_EMAIL, DEMO_PASSWORD } from "@/lib/demoAuth";

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [emailCopied, setEmailCopied] = useState(false);
  const [passwordCopied, setPasswordCopied] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    const success = login(email, password);
    if (success) {
      router.push("/home");
    } else {
      setError("Invalid email or password. For demo, use the credentials shown above.");
    }
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(DEMO_EMAIL);
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    } catch (e) {
      console.error('Failed to copy email', e);
    }
  };

  const handleCopyPassword = async () => {
    try {
      await navigator.clipboard.writeText(DEMO_PASSWORD);
      setPasswordCopied(true);
      setTimeout(() => setPasswordCopied(false), 2000);
    } catch (e) {
      console.error('Failed to copy password', e);
    }
  };

  return (
    <AuthLayout>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full max-w-7xl">
        {/* Left side - Hero text */}
        <div className="space-y-8">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tighter text-foreground leading-tight">
            Win FMCG RFPs with <br />
            <span className="gradient-text">Agentic AI</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-lg">
            Our multi-agent system analyzes RFPs, optimizes pricing, and learns from your feedback to craft winning proposals, faster.
          </p>
          <ul className="space-y-4">
            <li className="flex items-center space-x-3">
              <Users className="w-5 h-5 text-secondary" />
              <span className="font-medium">Multi-agent analysis</span>
            </li>
            <li className="flex items-center space-x-3">
              <Package className="w-5 h-5 text-secondary" />
              <span className="font-medium">Stock-aware pricing</span>
            </li>
            <li className="flex items-center space-x-3">
              <Target className="w-5 h-5 text-secondary" />
              <span className="font-medium">Feedback-driven learning</span>
            </li>
          </ul>
        </div>
        
        {/* Right side - Login form */}
        <div className="flex justify-center lg:justify-end">
          <div className="w-full max-w-md bg-background-light border-[3px] border-foreground rounded-lg p-3 shadow-brutal dotted-bg">
            <div className="bg-background-light rounded-lg p-6 border border-border">
              <h2 className="text-2xl font-bold text-center text-foreground mb-2">
                Login / Sign up
              </h2>
              <p className="text-xs text-center text-muted-foreground mb-6">
                No real account needed; this is a demo login.
              </p>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground">
                    Email
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@company.com"
                      className="block w-full rounded-lg border border-border bg-background-light p-3 shadow-sm focus:border-secondary focus:ring-secondary text-sm placeholder:text-muted-foreground"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-foreground">
                    Password
                  </label>
                  <div className="mt-1">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="block w-full rounded-lg border border-border bg-background-light p-3 shadow-sm focus:border-secondary focus:ring-secondary text-sm placeholder:text-muted-foreground"
                    />
                  </div>
                </div>
                
                <button type="submit" className="btn-primary">
                  Login
                </button>
                
                {error && (
                  <p className="text-sm text-red-600 text-center">{error}</p>
                )}
                
                <div className="mt-4 rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-700 space-y-2">
                  <p className="font-semibold">Demo credentials for judging</p>
                  <div className="flex items-center justify-between gap-2">
                    <p>Email: {DEMO_EMAIL}</p>
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className="shrink-0 rounded px-3 py-1 text-xs font-medium bg-slate-800 text-white hover:bg-slate-900 transition-colors"
                    >
                      {emailCopied ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <p>Password: {DEMO_PASSWORD}</p>
                    <button
                      type="button"
                      onClick={handleCopyPassword}
                      className="shrink-0 rounded px-3 py-1 text-xs font-medium bg-slate-800 text-white hover:bg-slate-900 transition-colors"
                    >
                      {passwordCopied ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default LoginPage;
