import Head from 'next/head'
import HistoryPage from '@/components/pages/HistoryPage'
import ProtectedRoute from '@/components/auth/ProtectedRoute'

export default function History() {
  return (
    <ProtectedRoute>
      <Head>
        <title>History - RFP AI</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <HistoryPage />
    </ProtectedRoute>
  )
}
