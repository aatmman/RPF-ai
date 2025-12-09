# Vercel Deployment Guide

## Pre-Deployment Checklist

- [x] Build passes successfully (`npm run build`)
- [x] TypeScript errors resolved
- [x] Environment variables documented in `.env.example`
- [x] `vercel.json` configuration file created
- [x] README updated with deployment instructions

## Deployment Steps

### 1. Push to Git Repository

```bash
git add .
git commit -m "Ready for Vercel deployment"
git push origin main
```

### 2. Import to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"Add New Project"**
3. Import your Git repository
4. Vercel will auto-detect Next.js framework

### 3. Configure Environment Variables

In Vercel project settings → **Environment Variables**, add:

| Variable | Value | Notes |
|----------|-------|-------|
| `SUPABASE_URL` | Your Supabase project URL | Get from Supabase dashboard |
| `SUPABASE_SERVICE_ROLE_KEY` | Your Supabase service role key | **Keep secret!** Server-side only |
| `N8N_ANALYZE_URL` | Your n8n webhook URL | e.g., `https://n8n-production-xxx.up.railway.app/webhook/...` |

**Important**: 
- Add these for **Production**, **Preview**, and **Development** environments
- Never commit these values to Git
- Service role key should never be exposed to client-side

### 4. Deploy

1. Click **"Deploy"** button
2. Wait for build to complete (usually 2-3 minutes)
3. Your app will be live at `https://your-project.vercel.app`

### 5. Post-Deployment Verification

- [ ] Visit the deployed URL
- [ ] Test login with demo credentials:
  - Email: `judge@rfp-ai.demo`
  - Password: `FMCG-demo-2025`
- [ ] Verify dashboard loads correctly
- [ ] Test API routes (check Vercel function logs)
- [ ] Test protected routes redirect to login when not authenticated

## Troubleshooting

### Build Fails

- Check Vercel build logs for errors
- Ensure all dependencies are in `package.json`
- Verify TypeScript compilation passes locally

### API Routes Not Working

- Check environment variables are set correctly
- Review Vercel function logs in dashboard
- Verify Supabase credentials are valid
- Test n8n webhook URL is accessible

### Authentication Issues

- Clear browser localStorage
- Check that `ProtectedRoute` component is working
- Verify redirects are functioning

### Environment Variables Not Loading

- Ensure variables are added in Vercel dashboard
- Check variable names match exactly (case-sensitive)
- Redeploy after adding new variables

## Vercel Configuration

The project includes `vercel.json` with:
- Framework: Next.js (auto-detected)
- Build command: `npm run build`
- Install command: `npm install`
- Region: US East (iad1)

## Custom Domain (Optional)

1. Go to Vercel project → Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions
4. SSL certificate is automatically provisioned

## Monitoring

- **Vercel Analytics**: Enable in project settings
- **Function Logs**: View in Vercel dashboard → Functions
- **Build Logs**: Available in deployment details

## Rollback

If deployment has issues:
1. Go to Vercel dashboard → Deployments
2. Find previous working deployment
3. Click "..." → "Promote to Production"

