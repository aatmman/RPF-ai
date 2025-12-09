import type { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_SERVICE_ROLE_KEY as string
)

// Sample leads for simulation
const sampleLeads = [
  {
    rfp_id: `RFP-SCAN-${Date.now()}-1`,
    title: 'Supply of Electrical Cables - Phase 2',
    buyer: 'TNB Berhad',
    deadline: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    url: 'https://example.com/rfp/1',
    source_name: 'MESB Portal',
    status: 'new',
  },
  {
    rfp_id: `RFP-SCAN-${Date.now()}-2`,
    title: 'Industrial Wiring Tender Q1 2026',
    buyer: 'Petronas Chemicals',
    deadline: new Date(Date.now() + 28 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    url: 'https://example.com/rfp/2',
    source_name: 'MyProcurement',
    status: 'new',
  },
]

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // Get active lead sources
    const { data: sources } = await supabase
      .from('lead_sources')
      .select('*')
      .eq('active', true)

    // For now, insert sample leads
    // In production, this would scan the URLs from lead_sources
    const leadsToInsert = sampleLeads.map((lead) => ({
      ...lead,
      source_name: sources && sources.length > 0 ? sources[0].source_name : 'Auto Scan',
    }))

    const { data, error } = await supabase
      .from('manual_leads')
      .insert(leadsToInsert)
      .select()

    if (error) {
      return res.status(500).json({ error: error.message })
    }

    return res.status(200).json({
      message: 'Scan completed',
      data: data,
      count: data?.length || 0,
    })
  } catch (error: any) {
    return res.status(500).json({ error: error.message })
  }
}





