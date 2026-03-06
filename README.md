# Voetbal-Ruil

A bilingual (Dutch/English) marketplace for trading second-hand children's football shoes across the Netherlands. Parents can list their kids' outgrown boots, browse listings by province, and contact sellers directly.

Live demo: [voetbal-ruil-frontend.up.railway.app](https://voetbal-ruil-frontend.up.railway.app) · Source: [github.com/freddy24-7/Voetbal-Ruil](https://github.com/freddy24-7/Voetbal-Ruil)

## Features

- Browse and filter shoe listings by Dutch province
- Upload a listing with photo, size, and location
- Edit and delete your own listings
- Contact sellers via an in-app message form (email notification sent via Resend)
- General contact form for platform enquiries
- Dark/light mode toggle
- Fully bilingual UI (Dutch & English)
- About, Privacy Policy, and Terms of Service pages

## Tech Stack

### Frontend

| Technology                                                                | Purpose                                |
| ------------------------------------------------------------------------- | -------------------------------------- |
| [React 19](https://react.dev)                                             | UI framework                           |
| [Vite 6](https://vitejs.dev)                                              | Build tool & dev server (SWC compiler) |
| [TypeScript 5.7](https://www.typescriptlang.org)                          | Type safety                            |
| [Tailwind CSS 4](https://tailwindcss.com)                                 | Utility-first styling                  |
| [shadcn/ui](https://ui.shadcn.com) + [Radix UI](https://www.radix-ui.com) | Accessible component primitives        |
| [Lucide React](https://lucide.dev)                                        | Icon library                           |
| [next-themes](https://github.com/pacocoursey/next-themes)                 | Dark/light mode                        |
| [Framer Motion](https://www.framer.com/motion/)                           | Animations                             |

### Backend

| Technology                                          | Purpose               |
| --------------------------------------------------- | --------------------- |
| [LoopBack 4](https://loopback.io)                   | REST API framework    |
| [Node.js ≥ 20](https://nodejs.org)                  | Runtime               |
| [MySQL 2](https://github.com/sidorares/node-mysql2) | Database driver       |
| [Multer](https://github.com/expressjs/multer)       | Multipart file upload |
| [Cloudinary](https://cloudinary.com)                | Image hosting         |
| [Resend](https://resend.com)                        | Transactional email   |

### Tooling & Testing

- **ESLint 8** with `@typescript-eslint`, `eslint-plugin-react`, `jsx-a11y`, `import`
- **Prettier 3** with `prettier-plugin-tailwindcss`
- **bun** as the package manager
- **Vitest 4** — unit & component test runner
- **React Testing Library** — component rendering and interaction tests
- **MSW 2** — API mocking via `msw/node` service worker in tests

### Infrastructure

- **Railway** — frontend (static bundle via `serve`) and backend (Node.js) as separate services
- **Railway MySQL** — managed relational database on the same private network as the backend
- **Cloudinary** — image hosting and CDN

## Project Structure

```
voetbal-ruil/
├── app/                    # Page component (entry point for the SPA)
├── components/             # React components
│   ├── ui/                 # shadcn/ui primitives (auto-generated, not linted)
│   ├── shoe-card.tsx       # Individual listing card
│   ├── shoe-grid.tsx       # Listings grid with loading/error states
│   ├── site-header.tsx     # Sticky nav with mobile sheet menu
│   ├── contact-modal.tsx   # Contact a seller
│   ├── upload-modal.tsx    # Create a new listing
│   ├── edit-shoe-modal.tsx # Edit an existing listing
│   └── ...
├── lib/
│   ├── api.ts              # Typed fetch wrappers for the backend API
│   ├── language-context.tsx      # i18n context provider
│   ├── owned-shoes.ts      # localStorage helper for tracking own listings
│   ├── translations.ts     # Dutch & English string tables + province list
│   └── types.ts            # Shared TypeScript types (Shoe, etc.)
├── src/
│   └── test/
│       ├── setup.ts        # Vitest setup: jest-dom, MSW server, browser stubs
│       ├── msw/
│       │   ├── handlers.ts # MSW request handlers with fixture data
│       │   └── server.ts   # MSW Node server instance
│       └── helpers/
│           └── render.tsx  # renderWithProviders() helper
├── backend/
│   └── src/
│       ├── controllers/    # REST endpoints: shoes, contact, upload
│       ├── models/         # LoopBack data models
│       ├── repositories/   # Database access layer
│       ├── datasources/    # MySQL connection config
│       ├── application.ts  # LoopBack app bootstrap
│       └── seed.ts         # Script to populate test data
├── .eslintrc.json
├── .prettierrc
└── vite.config.mts
```

## API Endpoints

| Method   | Path         | Description                                   |
| -------- | ------------ | --------------------------------------------- |
| `GET`    | `/shoes`     | List all shoes (optional `?province=` filter) |
| `GET`    | `/shoes/:id` | Get a single shoe                             |
| `POST`   | `/shoes`     | Create a new listing                          |
| `PUT`    | `/shoes/:id` | Update a listing                              |
| `DELETE` | `/shoes/:id` | Delete a listing                              |
| `POST`   | `/upload`    | Upload a shoe photo (returns Cloudinary URL)  |
| `POST`   | `/contacts`  | Send a message to a seller                    |
| `POST`   | `/contact`   | Send a general contact message                |

## Getting Started

### Prerequisites

- Node.js ≥ 20 (use `nvm use` with the included `.nvmrc`)
- bun (`npm install -g bun`)
- A MySQL database
- Cloudinary account
- Resend account

### Environment Variables

Create a `.env` file in the project root:

```env
DB_URL=mysql://user:password@host:port/database
RESEND_API_KEY=re_...
CONTACT_EMAIL=your@email.com
CLOUDINARY_URL=cloudinary://api_key:api_secret@cloud_name
CLOUDINARY_FOLDER=voetbalruil
```

### Install & Run

```bash
# Install dependencies
bun install

# Seed the database with sample data
bun run seed

# Start both frontend and backend
bun run dev          # Vite dev server on http://localhost:5173
bun run dev:backend  # LoopBack API on http://localhost:3001
```

### Scripts

```bash
bun run build          # Production build (backend + frontend)
bun run build:frontend # Build frontend only (Vite)
bun run build:backend  # Compile backend TypeScript
bun run test           # Run test suite (Vitest)
bun run test:coverage  # Run tests with coverage report
bun run lint           # Run ESLint
bun run lint:fix       # Auto-fix ESLint issues
bun run format         # Format with Prettier
bun run format:check   # Check formatting without writing
```

## Deployment (Railway)

The project is deployed as two Railway services from a single repository.

### Backend service

- **Build command:** `bun run build:backend`
- **Start command:** `node backend/dist/main.js`
- **Environment variables:** `DB_URL`, `PORT`, `CORS_ORIGIN`, `CLOUDINARY_URL`, `CLOUDINARY_FOLDER`, `RESEND_API_KEY`, `CONTACT_EMAIL`

### Frontend service

- **Build command:** `bun install && bun run build:frontend`
- **Start command:** `bun run start` (`serve dist -l ${PORT:-3000}`)
- **Environment variables:** `VITE_API_URL` (must be set before the build runs — Vite bakes it into the bundle)

`VITE_API_URL` should be set to the public URL of the backend Railway service (e.g. `https://voetbal-ruil-production.up.railway.app`).

To seed the Railway database from your local machine, use `MYSQL_PUBLIC_URL` from the Railway MySQL service:

```bash
DB_URL="<MYSQL_PUBLIC_URL>" bun run seed
```
