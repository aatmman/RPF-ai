import type { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@supabase/supabase-js'

type RFPRequestBody = Record<string, any>

type ErrorResponse = {
  error: string
  details?: any
}

const N8N_WEBHOOK_URL =
  process.env.N8N_ANALYZE_URL ||
  'https://n8n-production-f1c0.up.railway.app/webhook/fmcg-rfp-analyze'

const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_SERVICE_ROLE_KEY as string
)

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any | ErrorResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // Validate body presence
    if (!req.body || typeof req.body !== 'object') {
      return res.status(400).json({ error: 'Invalid JSON body' })
    }

    // Call n8n workflow
    const n8nResponse = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body as RFPRequestBody),
    })

    if (!n8nResponse.ok) {
      const details = await n8nResponse.text().catch(() => 'Unknown error')
      return res.status(502).json({ error: 'n8n workflow failed', details })
    }

    const analysis = await n8nResponse.json()

    // Insert into Supabase (best-effort; don't fail the response)
    // Each analysis creates a new history row
    try {
      const { error: dbError } = await supabase
        .from('rfp_runs')
        .insert(analysis)

      if (dbError) {
        console.error('Supabase insert error:', dbError)
      }
    } catch (dbErr) {
      console.error('Supabase insert exception:', dbErr)
    }

    return res.status(200).json(analysis)
  } catch (error: any) {
    console.error('API error:', error)
    return res.status(500).json({
      error: 'Internal server error',
      details: error?.message,
    })
  }
}
