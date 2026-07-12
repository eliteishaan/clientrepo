# Vivaan — Premium Engineering Portfolio

This repository contains the source code for a high-end mechanical engineering and applied physics portfolio. Designed with precision, it blends the aesthetic of an Apple keynote, an engineering design review, and a premium editorial publication.

## 🏗 Architecture

- **Framework**: Next.js 14 (App Router, Turbopack)
- **Styling**: Tailwind CSS (Strictly token-based, Apple/Linear aesthetic)
- **Animation**: GSAP (GreenSock) for high-performance timeline and scroll animations
- **CMS**: Sanity (Embedded Studio)
- **3D / WebGL**: Three.js (via React Three Fiber)

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- `pnpm` (Preferred package manager)

### Local Development

1. **Install Dependencies**
   ```bash
   pnpm install
   ```

2. **Environment Variables**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
   NEXT_PUBLIC_SANITY_DATASET=production
   NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
   SANITY_API_READ_TOKEN=your_read_token
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

3. **Start Development Server**
   ```bash
   pnpm run dev
   ```
   - Frontend: `http://localhost:3000`
   - Sanity Studio: `http://localhost:3000/studio`

## 📝 Content Workflow (Sanity CMS)

The entire portfolio is driven by Sanity. Editors can safely manage content without writing code.

### Managing Projects
1. Navigate to `/studio`.
2. Click **Projects** -> **Add New Project**.
3. Fill out the **General** information (Title, Slug, Subtitle).
4. Upload a high-resolution **Cover Image** (Minimum 1920x1080 recommended).
5. In the **Content** tab, fill out Engineering Stages (Research, Design, Simulation, etc.).
   *Note: If an engineering stage is left empty, the entire section safely collapses on the frontend.*
6. Add CAD Models/Drawings in the **Media** tab. 

### Adding New Media (Images, Videos, GLB, SVG, PDF)
The `media` object acts as a universal adapter.
1. When adding a media item inside a project or stage, select the **Type** (Image, Video, GLB, etc.).
2. The UI will automatically reveal the correct upload field (e.g., File upload for GLB, URL for Video).
3. **Always add Alt Text** to images for accessibility and SEO.

### Updating the Resume
1. In the Studio, go to the **Resume** singleton.
2. Upload the new PDF and update the Version String (e.g., "Fall 2026").
3. Publish. The main download button will instantly route to the new file.

## 🛠 Project Structure

- `src/app`: Next.js App Router pages (`/` for home, `/projects/[slug]` for case studies, `/studio` for CMS).
- `src/components/ui`: Reusable, dumb UI elements (Buttons, Container, Divider).
- `src/components/features`: Complex, domain-specific components organized by feature (`home`, `projects`, `viewer`).
- `src/lib`: Utilities, store configuration, and type definitions.
- `src/sanity`: CMS configuration, schema definitions, and GROQ queries.

## 🚨 Common Maintenance Tasks

### Deploying
The project is optimized for Vercel. Connect the GitHub repository and ensure the environment variables are set in the Vercel dashboard. The build command is natively cached:
```bash
pnpm run build
```

### Invalidating Cache
Next.js uses Sanity webhooks to invalidate the data cache via tags. Ensure your webhook in Sanity is pointing to `/api/revalidate` to update the live site instantly upon publishing.

### Editing the Homepage
The homepage hero terminal sequence is fully editable via **Site Settings > Homepage Hero Sequence** in the CMS. No code deployment is needed to update the text.

---

*Designed and engineered with strict attention to detail, typography, and motion.*
