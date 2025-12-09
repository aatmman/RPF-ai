import type { NextApiRequest, NextApiResponse } from 'next'
import { createServerClient } from '@/lib/supabaseClient'

type ResponseData = {
  data?: any[]
  error?: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const supabase = createServerClient()

    const { data, error } = await supabase
      .from('rfp_runs')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(100)

    if (error) {
      console.error('Supabase error:', error)
      return res.status(500).json({ error: error.message })
    }

    return res.status(200).json({ data: data || [] })
  } catch (error: any) {
    console.error('API error:', error)
    return res.status(500).json({ 
      error: error.message || 'Internal server error' 
    })
  }
}



