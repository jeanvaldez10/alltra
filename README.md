# Alltra

Alltra is a trading and trader-community platform built around three core experiences:

- **Trading performance** - trade imports, broker connections, analytics, charts, account performance, risk metrics, and goals.
- **Community** - real-time channel chat, direct messages, notifications, friend lists, and member presence.
- **Learning** - an academy experience for mentorship, lessons, assignments, notes, progress, and achievements.

The repository contains a Next.js web application and an Express API.

## Repository layout

```text
alltra/
├── web/        Next.js 15, React 19, Tailwind CSS, Prisma, and Redux
├── server/     Express, Socket.IO-compatible WebSocket services, and Prisma
├── TODO.md     Planned product areas
└── drafts/     Draft interface notes
```

## Technology

### Web application

- Next.js App Router
- React and TypeScript
- Tailwind CSS
- Prisma with MongoDB
- Redux Toolkit and React Hook Form
- TradingView-style and lightweight charts
- WebSockets

### API server

- Node.js and Express
- TypeScript
- MongoDB and Prisma
- JWT authentication
- WebSockets
- Tradovate API integration
- CSV and Excel trade imports

## Prerequisites

- Node.js 20 or newer
- npm
- A MongoDB database
- A Tradovate account for live broker integration
- SMTP credentials if contact-email delivery is used

## Environment variables

Create `web/.env.local`:

```dotenv
NEXT_PUBLIC_DATABASE_URL="mongodb://127.0.0.1:27017/alltra"
NEXT_PUBLIC_API_IP="localhost:3001"
```

Create `server/.env`:

```dotenv
DATABASE_URL="mongodb://127.0.0.1:27017/alltra"
JWT_SECRET_KEY="replace-with-a-long-random-secret"
PORT=3001
ORIGIN_IP="localhost:80"
TRADOVATE_API_URL="https://demo.tradovateapi.com/v1"
```

Notes:

- `NEXT_PUBLIC_API_IP` is a host and port, such as `localhost:3001`. The web app uses it to build HTTP and WebSocket URLs.
- `ORIGIN_IP` must refer to the web application's host. Include the host without `http://`; for a deployed host, set it to the deployed domain.
- Replace the Tradovate demo URL with the live endpoint only when using the live Tradovate API.
- Never commit real database credentials, JWT secrets, API secrets, or SMTP passwords.

## Installation

Install dependencies in both applications:

```powershell
cd web
npm install

cd ..\server
npm install
```

Generate the Prisma clients:

```powershell
cd ..\web
npx prisma generate

cd ..\server
npx prisma generate
```

If the MongoDB database needs the seed broker templates, run:

```powershell
cd server
npm run seed:brokers
```

## Running locally

Start the API server:

```powershell
cd server
npm start
```

The API listens on `PORT` from `server/.env` (`3001` is the example local port).

In a second terminal, start the web application:

```powershell
cd web
npm run dev
```

The web scripts serve Next.js on port `80`, so local URLs may be:

- Web: `http://localhost`
- API: `http://localhost:3001/api`
- WebSocket: `ws://localhost:3001`

On systems that restrict privileged ports, run Next.js on an unprivileged port by overriding the script or starting it directly:

```powershell
cd web
npx next dev --port 3000
```

When using a custom web port, update `ORIGIN_IP` and `NEXT_PUBLIC_API_IP` as appropriate.

## Available scripts

### Web

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Next.js development server on port 80 |
| `npm run build` | Create a production build |
| `npm start` | Serve the production build on port 80 |
| `npm run lint` | Run the Next.js lint configuration |

### Server

| Command | Purpose |
| --- | --- |
| `npm start` | Start the TypeScript server with Nodemon |
| `npm run seed:brokers` | Seed broker templates into MongoDB |

## Main features

- Landing, pricing, product, guide, blog, contact, privacy, login, and signup pages
- Authenticated dashboard with account and profile settings
- Trade review, trading charts, balance and profit/loss views
- Trading data imports and broker account synchronization
- Channel chat and direct messaging
- Notifications and online member status
- Contact form and community content

## API overview

The server exposes routes under `/api`, including:

- `/api` - API health check
- `/api/auth/*` - authentication
- `/api/users/*` - users and friends
- `/api/chat/*` - categories, channels, members, and messages
- `/api/direct/*` - direct conversations
- `/api/trade/*` - analytics, trades, imports, brokers, and synchronization

Detailed route information is available in [server/docs/routes.md](server/docs/routes.md). Tradovate integration notes are available in [server/docs/api.md](server/docs/api.md).

## Development notes

- API and WebSocket routes are loaded dynamically from the server's `api/` and `events/` folders.
- The web and server maintain separate Prisma schemas and generated clients; keep both aligned when changing shared models.
- Authentication uses a JWT stored in an HTTP cookie or bearer-token flow.
- The project has separate development and production origin assumptions. Review CORS and WebSocket origin settings before deployment.

## Contributing

1. Create a focused branch.
2. Keep web and API changes aligned with the existing TypeScript patterns.
3. Generate Prisma clients after schema changes.
4. Run `npm run build` in `web/` and verify the affected API routes before opening a pull request.
