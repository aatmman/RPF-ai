import type { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_SERVICE_ROLE_KEY as string
)

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const { data, error } = await supabase
        .from('company_profile')
        .select('*')
        .limit(1)
        .single()

      if (error && error.code !== 'PGRST116') {
        return res.status(500).json({ error: error.message })
      }

      return res.status(200).json({ data: data || null })
    } catch (error: any) {
      return res.status(500).json({ error: error.message })
    }
  }

  if (req.method === 'POST') {
    try {
      const { company_name, segment, region, contact_email } = req.body

      const { data, error } = await supabase
        .from('company_profile')
        .upsert(
          {
            id: 1,
            company_name,
            segment,
            region,
            contact_email,
          },
          { onConflict: 'id' }
        )
        .select()
        .single()

      if (error) {
        return res.status(500).json({ error: error.message })
      }

      return res.status(200).json({ data })
    } catch (error: any) {
      return res.status(500).json({ error: error.message })
    }
  }

  return res.status(405).json({ error: 'Method not allowed' })
}





