import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Cog, Box, Target } from "lucide-react";
import AuthLayout from "@/components/layout/AuthLayout";

// Sketchy box component for consistent styling
const SketchyBox = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-white border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${className}`}>
    {children}
  </div>
);

// Feature banner component
const FeatureBanner = ({ icon: Icon, text }: { icon: React.ElementType; text: string }) => (
  <SketchyBox className="flex items-center space-x-3 px-4 py-3">
    <div className="w-8 h-8 flex items-center justify-center">
      <Icon className="w-6 h-6 text-orange-500 stroke-[2.5]" />
    </div>
    <span className="font-bold text-black text-base">{text}</span>
  </SketchyBox>
);

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/home");
  };

  return (
    <AuthLayout>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start w-full max-w-6xl">
        {/* Left side - Hero content */}
        <div className="space-y-4">
          {/* Main headline box */}
          <SketchyBox className="p-5 lg:p-6">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-black leading-tight tracking-tight">
              Win FMCG RFPs
              <br />
              with{" "}
              <span className="relative inline-block">
                <span className="relative z-10 text-orange-600">Agentic AI</span>
                {/* Orange marker highlight effect */}
                <span className="absolute bottom-1 left-0 right-0 h-3 bg-orange-400/60 -z-0 -rotate-1" />
              </span>
            </h1>
          </SketchyBox>

          {/* Subtitle box */}
          <SketchyBox className="p-4">
            <p className="text-gray-700 text-sm lg:text-base leading-relaxed">
              Our multi-agent system analyzes RFPs, optimizes pricing, and learns from your feedback to craft winning proposals, faster.
            </p>
          </SketchyBox>

          {/* Feature banners */}
          <div className="space-y-2">
            <FeatureBanner icon={Cog} text="Multi-agent analysis" />
            <FeatureBanner icon={Box} text="Stock-aware pricing" />
            <FeatureBanner icon={Target} text="Feedback-driven learning" />
          </div>
        </div>

        {/* Right side - Login card */}
        <div className="flex justify-center lg:justify-end">
          <SketchyBox className="w-full max-w-sm p-5 lg:p-6">
            <h2 className="text-xl lg:text-2xl font-black text-center text-black mb-1">
              Login / Sign up
            </h2>
            <p className="text-gray-500 text-xs text-center mb-4">
              No real account needed, this is a demo login.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-bold text-black mb-1.5">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="block w-full border-[3px] border-black bg-white p-2.5 text-sm text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-1"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-bold text-black mb-1.5">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="block w-full border-[3px] border-black bg-white p-2.5 text-sm text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-1"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-150"
              >
                Login
              </button>
            </form>

            {/* Demo credentials box */}
            <SketchyBox className="mt-4 p-3">
              <h3 className="font-bold text-black text-sm mb-1">Demo credentials</h3>
              <p className="text-xs text-gray-700">
                Email: <span className="font-medium">judge@rfp ai-demo</span>
              </p>
              <p className="text-xs text-gray-700">
                Password: <span className="font-medium">FMCG-demo-2025</span>
              </p>
            </SketchyBox>
          </SketchyBox>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Login;
