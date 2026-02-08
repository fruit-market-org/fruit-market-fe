# Ahmedabad Fruit Connect (Fruit Market)

Next.js application with TypeScript and Tailwind CSS, migrated from the Lovable (React + Vite) project structure.

## Structure

- **`src/app/`** – Next.js App Router (routes: `/`, `/about`, `/committee`, `/contact`, `/gallery`, `/members`)
- **`src/views/`** – Page components (HomePage, AboutPage, CommitteePage, etc.) – kept separate from App Router
- **`src/components/layout/`** – Header, Footer, Layout
- **`src/components/ui/`** – UI components (shadcn-style: button, card, select, input, etc.)
- **`src/constants/`** – committee, content, members
- **`src/hooks/`** – use-mobile, use-toast
- **`src/lib/`** – utils (including `cn` for Tailwind)
- **`src/NavLink.tsx`** – Navigation link component using Next.js `Link`
- **`src/test/`** – Test setup and example
- **`public/`** – robots.txt and static assets

## Commands

```bash
npm install
npm run dev    # Development (Turbopack)
npm run build
npm run start
npm run lint
```

## Notes

- Page components from the original `pages` folder live in **`src/views/`** so Next.js does not treat them as Pages Router routes. App routes in **`src/app/`** import from `@/views/`.
- Vite-specific files (e.g. `vite.config`, `index.html`, `main.tsx`) were not migrated; routing and entry are handled by Next.js App Router.
