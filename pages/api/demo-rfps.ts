// pages/api/demo-rfps.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json([
    {
      rfp_id: 'RFP-DEMO-001',
      title: 'Supply of LV Power Cables for Metro Line 3',
      buyer: 'Metro Rail Corp',
      deadline: '2026-02-15',
      url: 'https://example.com/rfp-demo-001'
    },
    {
      rfp_id: 'RFP-DEMO-002',
      title: 'HT Cables for 132 kV Substation',
      buyer: 'PowerGrid Corp',
      deadline: '2026-03-10',
      url: 'https://example.com/rfp-demo-002'
    }
  ]);
}





