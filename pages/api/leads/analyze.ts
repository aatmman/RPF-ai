// pages/api/leads/analyze.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_SERVICE_ROLE_KEY as string
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { leadId } = req.body;

    if (!leadId) {
      return res.status(400).json({ error: 'leadId is required' });
    }

    // 1) Load the lead
    const { data: leads, error: leadError } = await supabase
      .from('manual_leads')
      .select('*')
      .eq('id', leadId)
      .limit(1);

    if (leadError || !leads || leads.length === 0) {
      return res.status(404).json({ error: 'Lead not found' });
    }

    const lead = leads[0];

    // 2) Build RFP body for analysis
    const rfpBody = {
      rfp_id: lead.rfp_id || `LEAD-${lead.id}`,
      buyer_name: lead.buyer || 'Unknown Buyer',
      quantity: lead.quantity ?? 1,          // add quantity column later if you want
      base_price: lead.base_price ?? 45,     // or derive from SKU/pricing table
      requirements:
        lead.requirements ||
        `${lead.title || ''} for ${lead.buyer || ''} due on ${lead.deadline || ''}`
    };

    // 3) Call existing analysis API
    // Use internal URL for server-to-server call
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 
                    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 
                    'http://localhost:3000');
    const analyzeResp = await fetch(`${baseUrl}/api/rfp/analyze`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(rfpBody)
    });

    if (!analyzeResp.ok) {
      const text = await analyzeResp.text();
      return res.status(502).json({ error: 'Analyze API failed', details: text });
    }

    const analysis = await analyzeResp.json();

    // 4) Optionally mark lead as analyzed
    await supabase
      .from('manual_leads')
      .update({ status: 'analyzed' })
      .eq('id', leadId);

    return res.status(200).json(analysis);
  } catch (e: any) {
    console.error('Analyze lead error', e);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

