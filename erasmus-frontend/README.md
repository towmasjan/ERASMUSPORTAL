# 🇪🇺 Erasmus+ Youth Exchange Frontend

A modern Next.js 14 frontend for managing Erasmus+ Youth Exchange programs.

## ✨ Features

- 📊 **Dashboard** - Overview of events, participants, and statistics
- 👥 **Participants** - Manage youth exchange participants with travel costs, dietary needs, and health info
- 🏢 **Partner Organizations** - Track partner organizations with OID codes and budget allocation
- 📅 **Events** - Create and manage youth exchange events
- 📈 **Reports** - Generate PDF and Excel reports
- 📁 **Documents** - Store and organize project documents
- 🔐 **Authentication** - JWT-based login with eventyay-server

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui
- **Data Fetching**: TanStack Query
- **Forms**: React Hook Form + Zod
- **Icons**: Lucide React

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- eventyay-server running on `http://localhost:8080`

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8080
```

## 🐳 Docker

### Build and Run

```bash
# Build image
docker build -t erasmus-frontend .

# Run container
docker run -p 3000:3000 erasmus-frontend
```

### Full Stack with Docker Compose

```bash
# Start everything (frontend + backend + database)
docker-compose up -d

# View logs
docker-compose logs -f

# Stop
docker-compose down
```

## 📁 Project Structure

```
src/
├── app/
│   ├── (dashboard)/          # Protected pages with sidebar
│   │   ├── dashboard/
│   │   ├── events/
│   │   ├── participants/
│   │   ├── partners/
│   │   ├── reports/
│   │   ├── documents/
│   │   ├── countries/
│   │   └── settings/
│   ├── login/
│   └── page.tsx              # Landing page
├── components/
│   ├── ui/                   # shadcn/ui components
│   ├── app-sidebar.tsx
│   └── eu-stars.tsx
└── lib/
    ├── api.ts                # API client
    ├── hooks.ts              # React Query hooks
    ├── auth-context.tsx      # Auth context
    └── providers.tsx
```

## 🔗 API Endpoints

The frontend connects to eventyay-server API:

| Endpoint | Description |
|----------|-------------|
| `GET /v1/events` | List all events |
| `GET /v1/partner-organizations` | List partner organizations |
| `POST /v1/partner-organizations` | Create partner organization |
| `GET /v1/attendees` | List participants |
| `PATCH /v1/attendees/:id` | Update participant |
| `POST /v1/auth/login` | Authenticate user |

## 🎨 Theme

Custom Erasmus+ theme with EU colors:
- **Primary**: EU Blue (#003399)
- **Secondary**: EU Gold (#FFCC00)

## 📝 License

MIT

---

Co-funded by the European Union 🇪🇺
