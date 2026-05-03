# PixelResize Pro

PixelResize Pro is a premium web-based image resize tool built with React + TypeScript. It allows users to upload, resize, preview, and download optimized images with a polished responsive UI.

## Stack

- Frontend: React + TypeScript + Vite
- Styling: Custom CSS system aligned with premium SaaS UI direction
- Motion: Framer Motion
- Backend (serverless scaffold): Node.js API handlers for Vercel
- Image processing (backend scaffold): Sharp
- Storage (backend scaffold): Vercel Blob
- Database: Neon Postgres (optional, phase 2)

## Implemented MVP

- Drag-and-drop + click upload
- Original image preview
- Width and height inputs
- Aspect ratio lock toggle
- Preset dimensions for social platforms
- Output format selection (JPG, PNG, WEBP)
- Quality slider (JPG/WEBP)
- Resized preview and download
- Friendly error states and toast feedback
- Fully responsive layout

## Local Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Environment Variables (for API routes)

Copy `.env.example` to `.env` for local/server deployments:

```env
BLOB_READ_WRITE_TOKEN=
DATABASE_URL=
```

`DATABASE_URL` is optional unless history/user persistence is implemented.

## API Endpoints (Vercel serverless scaffold)

- `POST /api/upload`
- `POST /api/resize`

These handlers validate uploads, process image output (resize endpoint), and store files in Vercel Blob.

## Deployment (Vercel)

This project is configured for Vercel with:

- Vite static output from `dist`
- Serverless API functions in `api/*.ts`
- Runtime config in `vercel.json`

### Option 1: Vercel Dashboard

1. Push this repository to GitHub/GitLab/Bitbucket.
2. Import the project in Vercel.
3. In Project Settings → Environment Variables, add:
   - `BLOB_READ_WRITE_TOKEN` (required for `/api/upload` and `/api/resize`)
   - `DATABASE_URL` (optional)
4. Deploy.

### Option 2: Vercel CLI

```bash
npm i -g vercel
vercel
vercel env add BLOB_READ_WRITE_TOKEN
vercel --prod
```

If you add `DATABASE_URL`, run:

```bash
vercel env add DATABASE_URL
```

## Recommended Phase 2

- Add Neon Postgres for history
- Persist resize jobs and metadata
- Add user accounts and saved workflows

## SEO Prompt Template

Use this prompt when you want to generate optimized metadata for a new tool page:

```text
Act as an expert SEO strategist and SaaS growth specialist.

I have a web tool: [INSERT TOOL NAME + FUNCTION]

Generate complete on-page SEO including:

1. High-CTR SEO title (under 60 characters)
2. Conversion-focused meta description (under 160 characters)
3. 20+ keywords (mix of short-tail and long-tail)
4. H1 heading (keyword optimized)
5. Intro paragraph (SEO + user-friendly)
6. 3 SEO sections (with H2 headings)
7. FAQ section (5 questions + answers)
8. Internal linking suggestions
9. Image alt text examples
10. Structured data (Schema markup)

Target audience: [e.g., bloggers, ecommerce, developers]
Primary keyword: [INSERT]
Tone: clear, simple, conversion-focused, SEO optimized.

Avoid keyword stuffing but ensure strong keyword placement.
```
