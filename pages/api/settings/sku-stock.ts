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
        .from('sku_stock')
        .select('*')
        .order('sku', { ascending: true })

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
      const { skus } = req.body

      if (!Array.isArray(skus)) {
        return res.status(400).json({ error: 'skus must be an array' })
      }

      // Upsert all SKUs
      const { data, error } = await supabase
        .from('sku_stock')
        .upsert(
          skus.map((s: any) => ({
            sku: s.sku,
            description: s.description || '',
            stock_available: s.stock_available || 0,
            rack_id: s.rack_id || '',
          })),
          { onConflict: 'sku' }
        )
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





