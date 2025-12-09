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
      const limit = parseInt(req.query.limit as string) || 100
      const thirtyDaysAgo = new Date()
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

      const { data, error } = await supabase
        .from('manual_leads')
        .select('*')
        .gte('created_at', thirtyDaysAgo.toISOString())
        .order('created_at', { ascending: false })
        .limit(limit)

      if (error) {
        return res.status(500).json({ error: error.message })
      }

      return res.status(200).json({ data: data || [] })
    } catch (error: any) {
      return res.status(500).json({ error: error.message })
    }
  }

  if (req.method === 'POST') {
    try {
      const { rfp_id, title, buyer, deadline, url, source_name } = req.body

      if (!rfp_id) {
        return res.status(400).json({ error: 'rfp_id is required' })
      }

      const { data, error } = await supabase
        .from('manual_leads')
        .insert({
          rfp_id,
          title: title || '',
          buyer: buyer || '',
          deadline: deadline || null,
          url: url || '',
          source_name: source_name || '',
          status: 'new',
        })
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





