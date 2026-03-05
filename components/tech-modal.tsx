"use client"

import { Code2 } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const frontendStack = [
  { name: "React 19", desc: "UI framework" },
  { name: "Vite 6 + SWC", desc: "Build tool & dev server" },
  { name: "TypeScript 5.7", desc: "Type safety across the stack" },
  { name: "Tailwind CSS 4", desc: "Utility-first styling" },
  { name: "shadcn/ui + Radix UI", desc: "Accessible component primitives" },
  { name: "next-themes", desc: "Dark / light mode" },
  { name: "Lucide React", desc: "Icon library" },
]

const backendStack = [
  { name: "LoopBack 4", desc: "Decorator-based REST API framework" },
  { name: "Node.js ≥ 20", desc: "Runtime" },
  { name: "MySQL 2", desc: "Relational database" },
  { name: "Cloudinary", desc: "Image hosting & CDN" },
  { name: "Resend", desc: "Transactional email delivery" },
  { name: "Multer", desc: "Multipart file upload" },
]

const tooling = [
  { name: "ESLint 8", desc: "Linting with TypeScript, React, a11y & import rules" },
  { name: "Prettier 3", desc: "Code formatting with Tailwind class sorting" },
  { name: "bun", desc: "Fast package manager" },
]

const productionGaps = [
  {
    title: "Authentication & authorisation",
    desc: "No user accounts exist. Listing ownership is tracked in localStorage only — any visitor can edit or delete any shoe. A real app would need sign-in (e.g. NextAuth, Clerk) and server-side ownership checks.",
  },
  {
    title: "Server-side validation & rate limiting",
    desc: "The backend accepts any input as-is. Production requires schema validation (e.g. Zod on the API layer) and server-side rate limiting (e.g. express-rate-limit) to prevent abuse.",
  },
  {
    title: "Image moderation",
    desc: "Uploaded images go straight to Cloudinary with no content moderation. A production app would run uploaded files through a moderation service before publishing.",
  },
  {
    title: "Pagination",
    desc: "All listings are fetched in a single query. With real traffic the API needs cursor- or offset-based pagination and the frontend needs infinite scroll or page controls.",
  },
  {
    title: "Testing",
    desc: "No automated tests exist. Production readiness requires unit tests (Vitest), component tests (Testing Library), and end-to-end tests (Playwright or Cypress).",
  },
  {
    title: "CI/CD pipeline",
    desc: "There is no build, lint, or test pipeline. A production project needs GitHub Actions (or similar) to run checks on every pull request and automate deployments.",
  },
  {
    title: "Error monitoring & observability",
    desc: "Errors are silently swallowed in catch blocks. Production requires a monitoring tool (e.g. Sentry) and structured server-side logging.",
  },
  {
    title: "GDPR tooling",
    desc: "The privacy policy and terms pages are present, but there is no cookie-consent banner, no data-deletion flow, and no mechanism for users to export or remove their data.",
  },
  {
    title: "Email verification",
    desc: "The contact form accepts any email address without verification. A real app would confirm email ownership before sending messages on a user's behalf.",
  },
  {
    title: "Production infrastructure",
    desc: "The backend runs on a local port with a hardcoded CORS wildcard. Production needs HTTPS, a reverse proxy (e.g. nginx), environment-specific CORS, database connection pooling, and a deployment target (e.g. Railway, Fly.io, AWS).",
  },
]

type StackItem = { name: string; desc: string }

function StackSection({ title, items }: { title: string; items: StackItem[] }) {
  return (
    <section>
      <h3 className="text-foreground mb-3 font-semibold">{title}</h3>
      <div className="flex flex-col gap-2">
        {items.map((item) => (
          <div key={item.name} className="flex items-baseline gap-3">
            <Badge variant="secondary" className="shrink-0 font-mono text-xs">
              {item.name}
            </Badge>
            <span className="text-muted-foreground">{item.desc}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

export function TechModal({ open, onOpenChange }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-mono">
            <Code2 className="size-5 text-orange-500" />
            Tech &amp; Demo
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-6 text-sm">
          <section className="bg-muted/50 rounded-lg border p-4">
            <h3 className="text-foreground mb-2 font-semibold">About this demo</h3>
            <p className="text-muted-foreground leading-relaxed">
              Voetbal-Ruil is a demo application showcasing a modern full-stack setup built with{" "}
              <strong className="text-foreground">React</strong>,{" "}
              <strong className="text-foreground">LoopBack 4</strong>, and{" "}
              <strong className="text-foreground">TypeScript</strong> — end to end. It demonstrates
              real-world patterns like bilingual UI, drag-and-drop image upload, accessibility, dark
              mode, and a REST API backed by a relational database.
            </p>
            <p className="text-muted-foreground mt-2 leading-relaxed">
              Feel free to try it out: add a shoe listing, browse by province, and send a contact
              message to a seller. Nothing is permanent — this is a sandbox.
            </p>
          </section>

          <StackSection title="Frontend" items={frontendStack} />
          <StackSection title="Backend" items={backendStack} />
          <StackSection title="Tooling" items={tooling} />

          <section>
            <h3 className="text-foreground mb-1 font-semibold">
              What would be needed for production
            </h3>
            <p className="text-muted-foreground mb-3">
              The following are intentionally left out of this demo:
            </p>
            <div className="flex flex-col gap-3">
              {productionGaps.map((item) => (
                <div key={item.title}>
                  <p className="text-foreground font-medium">{item.title}</p>
                  <p className="text-muted-foreground mt-0.5 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  )
}
