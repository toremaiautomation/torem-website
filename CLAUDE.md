# Torem AI - Website & Automation Project

## Project Overview
B2B AI automation startup serving home service contractors (roofing, remodeling, siding, fencing, painting, windows).

## Stack
- Frontend: React + Vite deployed on Vercel
- Automation: n8n Cloud (toremai.app.n8n.cloud)
- Database: Supabase (qcqkkpivbqxoshfsgnah.supabase.co)
- AI: Claude API via n8n HTTP Request node
- Domain: toremai.com

## Key Files
- src/App.jsx — entire website + chat widget (all pages in one file)
- index.html — entry point
- vite.config.js — Vite config

## Git Workflow
Always: git add . → git commit -m "message" → git push origin main
Vercel auto-deploys on push.

## Chat Widget
- Connects to: https://toremai.app.n8n.cloud/webhook/torem-chat
- Response field: data.ai_response
- Session ID generated on mount with Date.now()

## Rules
- Never mention specific prices on the website
- No em dashes in any copy
- Target audience: small contractors 1-5 person crews
- Brand colors: #007AE3 (blue), #0B1F3A (navy)
- Logo: https://i.imgur.com/HXc7WQO.png
- Contact: toremaiautomation@gmail.com | (832) 683-8151

## Sub-agents available
- Researcher: use for market research, competitor analysis
- Code Reviewer: use before every major push
- N8N Builder: use for building new n8n workflows
