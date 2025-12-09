import Head from 'next/head'
import LoginPage from '@/components/pages/LoginPage'

export default function Home() {
  return (
    <>
      <Head>
        <title>RFP AI - Login</title>
        <meta name="description" content="RFP Analysis Platform for FMCG Sales Managers" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <LoginPage />
    </>
  )
}
