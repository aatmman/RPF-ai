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
    const { rfp_id } = req.query;

    if (!rfp_id || typeof rfp_id !== 'string') {
      return res.status(400).json({ error: 'rfp_id is required' });
    }

    const { data, error } = await supabase
      .from('rfp_runs')
      .select('*')
      .eq('rfp_id', rfp_id)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({ error: 'RFP not found' });
      }
      console.error('Error fetching RFP:', error);
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({ data });
  } catch (e: any) {
    console.error('API error:', e);
    return res.status(500).json({ error: 'Internal server error' });
  }
}





