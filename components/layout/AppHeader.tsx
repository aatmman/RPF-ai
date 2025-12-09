import Link from 'next/link'
import { useRouter } from 'next/router'
import {
  LayoutDashboard,
  FileText,
  History,
  Settings,
} from 'lucide-react'

interface AppHeaderProps {
  currentPath?: string
}

export default function AppHeader({ currentPath }: AppHeaderProps) {
  const router = useRouter()
  // Use router.pathname if available, otherwise fall back to currentPath or empty string
  const path = currentPath || (router?.pathname || '')

  const isDashboard = path === '/dashboard'
  const isRFPDetail = path.startsWith('/rfp/')
  const isHistory = path === '/history'

  return (
    <header className="sticky top-0 z-10 flex items-center justify-between whitespace-nowrap border-b border-gray-200 px-6 py-3 bg-white/80 backdrop-blur-sm">
      <div className="flex items-center gap-4 text-gray-900">
        <div className="size-6 text-blue-500">
          <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            <path clipRule="evenodd" d="M24 4H6V17.3333V30.6667H24V44H42V30.6667V17.3333H24V4Z" fill="currentColor" fillRule="evenodd"></path>
          </svg>
        </div>
        <h2 className="text-lg font-bold tracking-[-0.015em]">RFP AI</h2>
      </div>
      <nav className="hidden md:flex items-center gap-2">
        <Link
          href="/dashboard"
          className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
            isDashboard
              ? 'bg-blue-500/10 text-blue-500'
              : 'hover:bg-black/5 text-gray-500'
          }`}
        >
          <LayoutDashboard className="w-4 h-4" />
          Dashboard
        </Link>
        {isRFPDetail ? (
          <div className="flex items-center gap-2 rounded-full bg-blue-500/10 text-blue-500 px-4 py-2 text-sm font-medium">
            <FileText className="w-4 h-4" />
            RFP Detail
          </div>
        ) : (
          <div className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-gray-400 cursor-default">
            <FileText className="w-4 h-4" />
            RFP Detail
          </div>
        )}
        <Link
          href="/history"
          className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
            isHistory
              ? 'bg-blue-500/10 text-blue-500'
              : 'hover:bg-black/5 text-gray-500'
          }`}
        >
          <History className="w-4 h-4" />
          Run History
        </Link>
        <Link
          href="#"
          className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium hover:bg-black/5 transition-colors text-gray-500"
        >
          <Settings className="w-4 h-4" />
          Settings
        </Link>
      </nav>
      <div className="flex flex-1 justify-end items-center gap-8">
        <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 bg-gray-300"></div>
      </div>
    </header>
  )
}

