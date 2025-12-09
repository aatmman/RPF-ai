import Head from 'next/head'
import DashboardPage from '@/components/pages/DashboardPage'
import ProtectedRoute from '@/components/auth/ProtectedRoute'

export default function Dashboard() {
  return (
    <ProtectedRoute>
      <Head>
        <title>Dashboard - RFP AI</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <DashboardPage />
    </ProtectedRoute>
  )
}
