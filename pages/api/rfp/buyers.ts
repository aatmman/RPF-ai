import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_SERVICE_ROLE_KEY as string
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Fetch distinct buyer names from rfp_runs
    const { data: rfpBuyers, error: rfpError } = await supabase
      .from('rfp_runs')
      .select('buyer_name')
      .not('buyer_name', 'is', null);

    if (rfpError) {
      console.error('Error fetching buyers from rfp_runs:', rfpError);
    }

    // Fetch distinct buyer names from manual_leads
    const { data: leadBuyers, error: leadError } = await supabase
      .from('manual_leads')
      .select('buyer')
      .not('buyer', 'is', null);

    if (leadError) {
      console.error('Error fetching buyers from manual_leads:', leadError);
    }

    // Combine and get unique buyer names
    const buyers = new Set<string>();
    
    if (rfpBuyers) {
      rfpBuyers.forEach((row: any) => {
        if (row.buyer_name) {
          buyers.add(row.buyer_name);
        }
      });
    }
    
    if (leadBuyers) {
      leadBuyers.forEach((row: any) => {
        if (row.buyer) {
          buyers.add(row.buyer);
        }
      });
    }

    // Convert to sorted array
    const uniqueBuyers = Array.from(buyers).sort();

    return res.status(200).json({ data: uniqueBuyers });
  } catch (e: any) {
    console.error('API error:', e);
    return res.status(500).json({ error: 'Internal server error' });
  }
}





