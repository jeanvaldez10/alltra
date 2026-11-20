# Alltra Web

The Alltra web application provides the public website, trader dashboard, community chat, learning experiences, account settings, and trading interfaces.

It is built with Next.js 15, React 19, TypeScript, Tailwind CSS, Prisma, Redux Toolkit, WebSockets, and charting libraries.

## Setup

Create `.env.local` in this directory:

```dotenv
NEXT_PUBLIC_DATABASE_URL="mongodb://127.0.0.1:27017/alltra"
NEXT_PUBLIC_API_IP="localhost:3001"
```

Install dependencies and generate the Prisma client:

```powershell
npm install
npx prisma generate
```

Start the development server:

```powershell
npm run dev
```

The configured script runs Next.js on port `80`. If that port is unavailable or restricted, run:

```powershell
npx next dev --port 3000
```

Update `NEXT_PUBLIC_API_IP` to point to the Express server host and port.

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server on port 80 |
| `npm run build` | Create a production build |
| `npm start` | Serve the production build on port 80 |
| `npm run lint` | Run lint checks |

For complete repository setup, API configuration, and deployment notes, see the [root README](../README.md).
