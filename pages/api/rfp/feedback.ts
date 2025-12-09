// pages/api/rfp/feedback.ts
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
    const { rfp_id, feedback_label, feedback_notes, feedback_rating } = req.body;

    if (!rfp_id) {
      return res.status(400).json({ error: 'rfp_id is required' });
    }

    // Build update object (only include fields that are provided)
    const updateData: any = {};
    
    if (feedback_label !== undefined) {
      updateData.feedback_label = feedback_label || null;
    }
    
    // Try to include notes and rating, but if columns don't exist, Supabase will error
    // and we'll handle it gracefully
    if (feedback_notes !== undefined) {
      updateData.feedback_notes = feedback_notes || null;
    }
    
    if (feedback_rating !== undefined) {
      updateData.feedback_rating = feedback_rating || null;
    }
    
    // Also support feedback_score for backward compatibility
    if (req.body.feedback_score !== undefined) {
      updateData.feedback_score = req.body.feedback_score || null;
    }

    // If no fields to update, return early
    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ error: 'No feedback data provided' });
    }

    // Try to update with all fields first
    let { data, error } = await supabase
      .from('rfp_runs')
      .update(updateData)
      .eq('rfp_id', rfp_id)
      .select()
      .single();

    // If error suggests missing columns, try updating only known columns
    if (error && error.message?.includes('column') && error.message?.includes('does not exist')) {
      console.warn('Some columns may not exist, trying with basic columns only');
      
      // Fallback: only update feedback_label and feedback_score
      const fallbackData: any = {};
      if (updateData.feedback_label !== undefined) {
        fallbackData.feedback_label = updateData.feedback_label;
      }
      if (updateData.feedback_score !== undefined) {
        fallbackData.feedback_score = updateData.feedback_score;
      }
      
      if (Object.keys(fallbackData).length > 0) {
        const fallbackResult = await supabase
          .from('rfp_runs')
          .update(fallbackData)
          .eq('rfp_id', rfp_id)
          .select()
          .single();
        
        if (fallbackResult.error) {
          console.error('Feedback update error (fallback)', fallbackResult.error);
          return res.status(500).json({ 
            error: 'Failed to update feedback',
            details: fallbackResult.error.message,
            code: fallbackResult.error.code,
            hint: 'Make sure columns feedback_label, feedback_notes, and feedback_rating exist in rfp_runs table'
          });
        }
        
        return res.status(200).json({ 
          success: true, 
          data: fallbackResult.data,
          warning: 'Some columns may not exist in database'
        });
      }
    }

    if (error) {
      console.error('Feedback update error', error);
      return res.status(500).json({ 
        error: 'Failed to update feedback',
        details: error.message,
        code: error.code,
        hint: 'Make sure columns feedback_label, feedback_notes, and feedback_rating exist in rfp_runs table'
      });
    }

    if (!data) {
      return res.status(404).json({ error: 'RFP not found' });
    }

    return res.status(200).json({ success: true, data });
  } catch (e: any) {
    console.error('Feedback API error', e);
    return res.status(500).json({ 
      error: 'Internal server error',
      details: e.message 
    });
  }
}
