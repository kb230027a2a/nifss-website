# NIFSS Website

**Nür Institute of Forensic & Strategic Studies** — Pakistan's first forensic think tank.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS (dark navy/gold theme)
- **Auth**: NextAuth.js v4 with JWT + role-based access
- **Database**: Prisma ORM + SQLite (easy migration to PostgreSQL)
- **Payments**: Stripe (Visa/Mastercard) + PayPal
- **Animations**: Framer Motion

## Features

- Public website: Home, About, Services, Events, Blog, Gallery, Team, Contact
- Member registration with payment wall (Stripe + PayPal)
- Role-based auth: `admin` | `power_user` | `member`
- Admin panel: publish events, blog posts, gallery; view registrations & messages
- Responsive dark navy/gold professional design

## Setup

### 1. Install dependencies
```bash
npm install
```

### 2. Configure environment
```bash
cp .env.example .env.local
```
Edit `.env.local` with your:
- `NEXTAUTH_SECRET` (generate with `openssl rand -base64 32`)
- Stripe keys from https://dashboard.stripe.com
- PayPal credentials from https://developer.paypal.com

### 3. Set up database
```bash
npm run db:push
npm run db:seed
```

### 4. Run development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Default Credentials (after seed)

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@nifss.org | Admin@NIFSS2024 |
| Power User | editor@nifss.org | PowerUser@NIFSS2024 |

**Change these immediately in production!**

## Deployment (Vercel)

1. Push to GitHub
2. Import repo in Vercel
3. Add all env vars from `.env.example`
4. Change `DATABASE_URL` to a PostgreSQL connection string (e.g., Neon, Supabase)
5. Update `prisma/schema.prisma` provider from `sqlite` to `postgresql`
6. Deploy!

## Admin Panel

Access at `/admin` (requires admin or power_user role):
- **Events**: Create, publish, unpublish, delete events
- **Blog**: Write and publish articles/research
- **Gallery**: Upload and manage photos
- **Registrations**: View all registrations and payment status
- **Messages**: Read contact form submissions
- **Users** (admin only): View all registered members
