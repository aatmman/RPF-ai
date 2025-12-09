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
        .from('lead_sources')
        .select('*')
        .order('id', { ascending: true })

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
      const { sources } = req.body

      if (!Array.isArray(sources)) {
        return res.status(400).json({ error: 'sources must be an array' })
      }

      // Delete all existing sources
      await supabase.from('lead_sources').delete().neq('id', 0)

      // Insert new sources
      const sourcesToInsert = sources.map((s: any, index: number) => ({
        id: index + 1,
        source_name: s.source_name || '',
        url: s.url || '',
        tags: s.tags || '',
        active: s.active !== undefined ? s.active : true,
      }))

      const { data, error } = await supabase
        .from('lead_sources')
        .insert(sourcesToInsert)
        .select()

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





