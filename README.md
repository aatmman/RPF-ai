<div align="center">

# 🚀 RFP AI

### Win FMCG RFPs with Agentic AI

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3-38bdf8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com)

**A powerful full-stack web application that revolutionizes how FMCG sales and pricing managers analyze RFPs using cutting-edge agentic AI technology.**

[Features](#-features) • [Quick Start](#-quick-start) • [Deployment](#-deployment) • [API Docs](#-api-documentation)

---

</div>

## ✨ Features

<div align="center">

| 🎯 **Multi-Agent Analysis** | 📦 **Stock-Aware Pricing** | 🎓 **Feedback-Driven Learning** |
|:---:|:---:|:---:|
| Intelligent multi-agent system analyzes RFPs | Real-time inventory and stock status | Continuous improvement from user feedback |
| | | |

| 📊 **Interactive Dashboard** | 🔒 **Secure Authentication** | ⚡ **Lightning Fast** |
|:---:|:---:|:---:|
| Beautiful, responsive dashboard with KPIs | Demo auth system for quick access | Optimized for performance |
| | | |

</div>

---

## 🛠️ Tech Stack

<div align="center">

### Frontend
![Next.js](https://img.shields.io/badge/Next.js-14.0-black?logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-18.2-61dafb?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2-3178c6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3-38bdf8?logo=tailwind-css&logoColor=white)

### Backend & Infrastructure
![Supabase](https://img.shields.io/badge/Supabase-Postgres-3ecf8e?logo=supabase&logoColor=white)
![n8n](https://img.shields.io/badge/n8n-Workflow-ff6d5a?logo=n8n&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-Deploy-black?logo=vercel&logoColor=white)

</div>

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ and **npm** (or yarn/pnpm)
- **Supabase** account (for database)
- **n8n** webhook URL (for AI analysis)

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd rfp-ai

# Install dependencies
npm install

# Copy environment variables template
cp .env.example .env.local
```

### Environment Setup

Edit `.env.local` and add your credentials:

```env
# Supabase Configuration
SUPABASE_URL=your_supabase_project_url_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here

# n8n Webhook URL
N8N_ANALYZE_URL=https://your-n8n-webhook-url-here
```

### Run Development Server

```bash
npm run dev
```

🎉 **Open [http://localhost:3000](http://localhost:3000)** and you're ready to go!

### Demo Login

For quick access, use these demo credentials:

```
📧 Email:    judge@rfp-ai.demo
🔑 Password: FMCG-demo-2025
```

> 💡 **Note**: This is a demo authentication system. No real OAuth or Supabase Auth is required.

---

## 📦 Deployment

### Deploy to Vercel (Recommended)

<details>
<summary><b>🚀 Click to expand deployment guide</b></summary>

#### Step 1: Push to Git
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

#### Step 2: Import to Vercel
1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"Add New Project"**
3. Import your Git repository
4. Vercel auto-detects Next.js ✨

#### Step 3: Configure Environment Variables

In **Vercel Dashboard → Settings → Environment Variables**, add:

| Variable | Description |
|:---------|:------------|
| `SUPABASE_URL` | Your Supabase project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (🔒 keep secret!) |
| `N8N_ANALYZE_URL` | Your n8n webhook URL |

#### Step 4: Deploy
- Click **"Deploy"** and wait ~2-3 minutes
- Your app will be live at `https://your-project.vercel.app` 🎊

#### Step 5: Verify
- ✅ Test login with demo credentials
- ✅ Verify dashboard loads
- ✅ Check API routes in Vercel function logs

</details>

---

## 📁 Project Structure

```
rfp-ai/
├── 🎨 components/
│   ├── auth/              # 🔐 Authentication components
│   ├── dashboard/         # 📊 Dashboard & RFP cards
│   ├── layout/            # 🏗️  Layout components (AppLayout, AuthLayout)
│   ├── pages/             # 📄 Page-level components
│   ├── rfp-detail/        # 📋 RFP detail view components
│   └── shared/            # 🧩 Shared UI components (KPIs, badges, etc.)
│
├── 📚 lib/
│   ├── demoAuth.ts        # 🔑 Demo authentication helper
│   ├── supabaseClient.ts  # 🗄️  Supabase client configuration
│   └── utils.ts           # 🛠️  Utility functions
│
├── 📄 pages/
│   ├── api/
│   │   └── rfp/
│   │       ├── analyze.ts      # 🤖 POST - AI analysis via n8n
│   │       ├── history.ts      # 📜 GET - RFP history
│   │       ├── feedback.ts     # 💬 POST - Submit feedback
│   │       └── buyers.ts       # 👥 GET - Fetch buyer names
│   │
│   ├── dashboard.tsx          # 📊 Main dashboard
│   ├── history.tsx             # 📜 Run history page
│   ├── home.tsx                # 🏠 Home page
│   ├── rfp/
│   │   └── [id].tsx            # 🔍 Single RFP detail page
│   ├── rfp-detail.tsx          # 📋 RFP rankings page
│   ├── settings.tsx            # ⚙️  Settings page
│   └── index.tsx               # 🚪 Landing/login page
│
└── 🎨 styles/
    └── globals.css             # 🌐 Global Tailwind styles
```

---

## 📡 API Documentation

### 🤖 POST `/api/rfp/analyze`

Proxies RFP input to n8n webhook and returns AI-powered analysis.

**Request:**
```json
{
  "rfp_id": "RFP-2024-001",
  "buyer_name": "Acme Corp",
  "quantity": 1000,
  "base_price": 50.00,
  "requirements": "Fast delivery, bulk discount"
}
```

**Response:**
```json
{
  "rfp_id": "RFP-2024-001",
  "primary_sku": "SKU-123",
  "primary_name": "Product Name",
  "scenario_1_total": 45000,
  "scenario_2_total": 48000,
  "scenario_3_total": 50000,
  "recommended_scenario": "scenario_2",
  "estimated_win_probability": 85,
  "stock_available": true,
  "ai_summary": "...",
  "decision_reason": "..."
}
```

---

### 📜 GET `/api/rfp/history`

Retrieves RFP run history from Supabase.

**Response:**
```json
{
  "data": [
    {
      "id": "...",
      "rfp_id": "RFP-2024-001",
      "created_at": "2024-01-15T10:30:00Z",
      "buyer_name": "Acme Corp",
      "estimated_win_probability": 85,
      ...
    }
  ]
}
```

---

### 💬 POST `/api/rfp/feedback`

Submits feedback for an RFP analysis.

**Request:**
```json
{
  "rfp_id": "RFP-2024-001",
  "feedback_label": "win",
  "feedback_notes": "Great pricing strategy!",
  "feedback_rating": 5,
  "feedback_score": 4.8
}
```

---

### 👥 GET `/api/rfp/buyers`

Fetches distinct buyer names from `rfp_runs` and `manual_leads` tables.

**Response:**
```json
{
  "data": ["Acme Corp", "Tech Solutions Inc", "Global Distributors"]
}
```

---

## 🔐 Authentication

The app uses a **lightweight demo authentication system** perfect for demonstrations and hackathons:

- ✅ **No OAuth complexity** - Simple localStorage-based auth
- ✅ **Quick access** - Demo credentials ready to use
- ✅ **Protected routes** - Automatic redirect to login
- ✅ **Client-side only** - No backend auth required

**Demo Credentials:**
```
Email:    judge@rfp-ai.demo
Password: FMCG-demo-2025
```

---

## ⚙️ Environment Variables

| Variable | Description | Required | Example |
|:---------|:------------|:---------|:--------|
| `SUPABASE_URL` | Supabase project URL | ✅ Yes | `https://xxx.supabase.co` |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role key (server-side) | ✅ Yes | `eyJhbGc...` |
| `N8N_ANALYZE_URL` | n8n webhook URL | ✅ Yes | `https://n8n-xxx.webhook.app/...` |

> ⚠️ **Security Note**: Never commit `.env.local` to Git. The service role key should only be used server-side.

---

## 🐛 Troubleshooting

<details>
<summary><b>🔧 Common Issues & Solutions</b></summary>

### Build Errors
```bash
# Ensure TypeScript compilation passes
npm run build

# Check for missing dependencies
npm install
```

### API Errors
- ✅ Verify Supabase credentials in Vercel dashboard
- ✅ Test n8n webhook URL is accessible
- ✅ Check Vercel function logs for detailed errors

### Authentication Issues
- ✅ Clear browser localStorage: `localStorage.clear()`
- ✅ Verify `ProtectedRoute` wraps protected pages
- ✅ Check browser console for errors

### Environment Variables Not Loading
- ✅ Ensure variables are set in Vercel dashboard
- ✅ Variable names must match exactly (case-sensitive)
- ✅ Redeploy after adding new variables

</details>

---

## 🎯 Key Features Explained

### 🧠 Multi-Agent AI Analysis
Our intelligent system uses multiple AI agents to analyze RFPs from different perspectives, ensuring comprehensive and accurate recommendations.

### 📊 Real-Time Dashboard
Beautiful, responsive dashboard with:
- **KPI Cards** - Total RFPs, Win Rate, Avg. Win Probability, Feedback Score
- **Interactive Filters** - Filter by buyer, category, status
- **RFP Cards** - Quick overview of each RFP with key metrics
- **Sparklines** - Visual trend indicators

### 🔄 Feedback Loop
Submit feedback on RFP decisions to continuously improve the AI's recommendations:
- Win/Loss/Pending labels
- Rating scores (1-5)
- Optional notes
- Historical tracking

---

## 📝 Scripts

```bash
# Development
npm run dev          # Start dev server on :3000

# Production
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
```

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. 🍴 Fork the repository
2. 🌿 Create a feature branch (`git checkout -b feature/amazing-feature`)
3. 💾 Commit your changes (`git commit -m 'Add amazing feature'`)
4. 📤 Push to the branch (`git push origin feature/amazing-feature`)
5. 🔀 Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Database powered by [Supabase](https://supabase.com/)
- AI workflows via [n8n](https://n8n.io/)
- Deployed on [Vercel](https://vercel.com)

---

<div align="center">

### Made with ❤️ for FMCG Sales Teams

**Star ⭐ this repo if you find it helpful!**

[⬆ Back to Top](#-rfp-ai)

</div>
