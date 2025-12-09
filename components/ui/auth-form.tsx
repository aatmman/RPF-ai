"use client"

import * as React from "react"

import { useRouter } from "next/router"

import { ChevronLeft, Github, Twitter } from "lucide-react"

import { motion } from "framer-motion"

// shadcn-style structure: components/ui separates primitive UI components
// from business logic components, enabling reusable, composable design system elements

const AuthForm: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-white py-20 text-zinc-800 selection:bg-zinc-300">
      <BackButton />

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.25, ease: "easeInOut" }}
        className="relative z-10 mx-auto w-full max-w-xl p-4"
      >
        <Logo />

        <Header />

        <SocialButtons />

        <Divider />

        <LoginForm />

        <TermsAndConditions />
      </motion.div>

      <BackgroundDecoration />
    </div>
  )
}

const BackButton: React.FC = () => (
  <SocialButton icon={<ChevronLeft size={16} />}>Go back</SocialButton>
)

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
}

const Button: React.FC<ButtonProps> = ({ children, className, ...props }) => (
  <button
    className={`rounded-md bg-gradient-to-br from-blue-400 to-blue-700 px-4 py-2 text-lg text-zinc-50 
    ring-2 ring-blue-500/50 ring-offset-2 ring-offset-white 
    transition-all hover:scale-[1.02] hover:ring-transparent active:scale-[0.98] active:ring-blue-500/70 ${className}`}
    {...props}
  >
    {children}
  </button>
)

const Logo: React.FC = () => (
  <div className="mb-6 flex justify-center">
    <img
      src="https://images.unsplash.com/photo-1529101091764-c3526daf38fe"
      alt="RFP AI"
      className="h-8 w-8 rounded"
    />
    <span className="ml-2 text-xl font-bold">RFP AI</span>
  </div>
)

const Header: React.FC = () => (
  <div className="mb-6 text-center">
    <h1 className="text-2xl font-semibold">Sign in to your account</h1>
    <p className="mt-2 text-zinc-500">
      Don't have an account?{" "}
      <a href="#" className="text-blue-600 hover:underline">
        Create one.
      </a>
    </p>
  </div>
)

const SocialButtons: React.FC = () => {
  const router = useRouter()
  
  return (
    <div className="mb-6 space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <SocialButton icon={<Twitter size={20} />} />
        <SocialButton icon={<Github size={20} />} />
        <SocialButton 
          fullWidth
          onClick={() => router.push("/dashboard")}
        >
          Sign in with SSO
        </SocialButton>
      </div>
    </div>
  )
}

const SocialButton: React.FC<{
  icon?: React.ReactNode
  fullWidth?: boolean
  children?: React.ReactNode
  onClick?: () => void
}> = ({ icon, fullWidth, children, onClick }) => (
  <button
    onClick={onClick}
    className={`relative z-0 flex items-center justify-center gap-2 overflow-hidden rounded-md 
    border border-zinc-300 bg-zinc-100 
    px-4 py-2 font-semibold text-zinc-800 transition-all duration-500
    before:absolute before:inset-0 before:-z-10 before:translate-x-[150%] before:translate-y-[150%] before:scale-[2.5]
    before:rounded-[100%] before:bg-zinc-800 before:transition-transform before:duration-1000 before:content-[""]
    hover:scale-105 hover:text-zinc-100 hover:before:translate-x-[0%] hover:before:translate-y-[0%] active:scale-95
    ${fullWidth ? "col-span-2" : ""}`}
  >
    {icon}
    <span>{children}</span>
  </button>
)

const Divider: React.FC = () => (
  <div className="my-6 flex items-center gap-3">
    <div className="h-[1px] w-full bg-zinc-300" />
    <span className="text-zinc-500">OR</span>
    <div className="h-[1px] w-full bg-zinc-300" />
  </div>
)

const LoginForm: React.FC = () => {
  const router = useRouter()
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push("/dashboard")
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label
          htmlFor="email-input"
          className="mb-1.5 block text-zinc-500"
        >
          Email
        </label>
        <input
          id="email-input"
          type="email"
          placeholder="your.email@provider.com"
          className="w-full rounded-md border border-zinc-300 
          bg-white px-3 py-2 text-zinc-800
          placeholder-zinc-400 
          ring-1 ring-transparent transition-shadow focus:outline-0 focus:ring-blue-700"
        />
      </div>
      <div className="mb-6">
        <div className="mb-1.5 flex items-end justify-between">
          <label
            htmlFor="password-input"
            className="block text-zinc-500"
          >
            Password
          </label>
          <a href="#" className="text-sm text-blue-600">
            Forgot?
          </a>
        </div>
        <input
          id="password-input"
          type="password"
          placeholder="••••••••••••"
          className="w-full rounded-md border border-zinc-300 
          bg-white px-3 py-2 text-zinc-800
          placeholder-zinc-400 
          ring-1 ring-transparent transition-shadow focus:outline-0 focus:ring-blue-700"
        />
      </div>
      <Button type="submit" className="w-full">
        Sign in
      </Button>
    </form>
  )
}

const TermsAndConditions: React.FC = () => (
  <p className="mt-9 text-xs text-zinc-500">
    By signing in, you agree to our{" "}
    <a href="#" className="text-blue-600">
      Terms & Conditions
    </a>{" "}
    and{" "}
    <a href="#" className="text-blue-600">
      Privacy Policy.
    </a>
  </p>
)

const BackgroundDecoration: React.FC = () => {
  return (
    <div
      className="absolute right-0 top-0 z-0 size-[50vw]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke-width='2' stroke='rgb(30 58 138 / 0.5)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`,
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(100% 100% at 100% 0%, rgba(255,255,255,0), rgba(255,255,255,1))",
        }}
      />
    </div>
  )
}

export default AuthForm

