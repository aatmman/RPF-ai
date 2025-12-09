import Head from 'next/head'
import RFPDetailPage from '@/components/pages/RFPDetailPage'
import ProtectedRoute from '@/components/auth/ProtectedRoute'

export default function RFPDetail() {
  return (
    <ProtectedRoute>
      <Head>
        <title>RFP Detail - RFP AI</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <RFPDetailPage />
    </ProtectedRoute>
  )
}
