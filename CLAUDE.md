@AGENTS.md

# Portfolio - Claude Guidelines

## Architecture

This is a **Next.js 16 App Router** project using React 19, TypeScript, and Tailwind CSS v4.

### Folder Structure

```
src/
  app/
    page.tsx                          # Home page (server component)
    layout.tsx                        # Root layout
    <page>/
      page.tsx                        # Page entry (server component)
      components/
        <Feature>/
          index.tsx                   # Public export
          <Feature>.tsx               # Component logic
          <SubFeature>/
            index.tsx
            <SubFeature>.tsx
  components/
    ui/                               # Shared primitives (Button, Card, etc.)
    layout/                           # Header, Footer, Nav
  lib/                                # Utilities, data fetching, constants
  types/                              # Shared TypeScript interfaces
```

## Conventions

### Components

- Every component lives in its **own folder** named after it, with an `index.tsx` re-export — Java-style package structure.
- Default export from the component file; named re-export from `index.tsx`.
- Page `page.tsx` files are **Server Components** by default. Add `"use client"` only at the lowest possible leaf that needs interactivity.
- No barrel files at the `app/` level — import directly from component paths.

### Server vs Client

- Fetch data in Server Components and pass as props; never fetch in Client Components unless necessary (e.g., SWR for user-specific real-time data).
- Keep Client Components as leaves — never wrap a Server Component tree in `"use client"`.
- Use `async/await` directly in Server Components for data fetching.

### Code Quality

- **No comments.** Code must be self-documenting through clear naming.
- No `console.log` left in production code.
- Prefer explicit types over `any`; never use `as any`.
- Destructure props at the function signature.
- Keep components small and single-purpose — split when a component exceeds ~80 lines.

### Styling

- Tailwind CSS v4 utility classes only — no inline `style` props, no CSS modules.
- Responsive-first: mobile breakpoint is the default, scale up with `md:`, `lg:`.

### Naming

| Thing | Convention |
|---|---|
| Components | `kebab-case` |
| Files & folders | `kebab-case` for components, `camelCase` for lib/utils |
| TypeScript types | `PascalCase` with descriptive suffix (`Props`, `Data`, `Config`) |
| Server actions | `camelCase` verbs (`fetchProjects`, `submitContact`) |

### Imports

Order: React → Next.js → third-party → internal (`@/`) — separated by blank lines.

### What to Avoid

- `"use client"` on page or layout files.
- Mixing data fetching and UI in the same component.
- Deeply nested ternaries in JSX — extract to a variable or sub-component.
- Default exports for utility functions — use named exports.
- The `ignoreScripts` / `trustedDependencies` fields are Bun-specific config — do not remove them.
