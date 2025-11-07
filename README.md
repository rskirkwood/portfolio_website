# Riley Portfolio (Next.js + Tailwind)

## Quick start
```bash
npx create-next-app@latest portfolio \
  --typescript --eslint --src-dir --app --tailwind --import-alias @/*
cd portfolio
# Replace the generated files with the ones from this repo structure.
npm run dev
```

## Deploy (free)
- **Vercel**: connect your GitHub repo, import, and deploy. Auto-builds on push.
- **GitHub Pages**: possible with static export, but Vercel is easier for Next.js.
- **Raspberry Pi**: cool for learning, but not needed; free Vercel is simpler and reliable.

## Where to put resumes
Drop PDFs into `public/resume/` using these names:
- `general.pdf`, `embedded.pdf`, `software.pdf`, `it.pdf`

## Customize
- Update email + social links in `app/contact/page.tsx`.
- Edit skills and bio in `app/about/page.tsx`.
- Add projects in `data/projects.ts`.

## Future ideas
- Weekly job to refresh CFB data and update a JSON file this site reads.
- Admin-only route to trigger refresh manually.
- Optional blog/notes via MDX.
- AI resume tailor: server route that accepts a JD, picks the right resume template, and fills fields (later).
