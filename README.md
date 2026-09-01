# Anvaya 🏠🛠️

> **Trusted work, closer to you.**

Anvaya is an AI-assisted local-services marketplace designed to connect customers with **verified, nearby skilled workers** while keeping the booking lifecycle transparent and customer-controlled.

The product is especially focused on practical use in **towns and villages**, where simple UX, multilingual access, local workers, voice-first problem descriptions, and trustworthy service completion matter.

## ✨ What Anvaya solves

A customer can describe a problem in their own words or by voice, choose **where the work actually needs to happen**, find suitable nearby workers, review a worker's profile, send a detailed work note, receive a worker quote, and only release payment after confirming that the work is satisfactory.

Anvaya also supports the important remote-booking case: a customer can be physically in one place while booking a worker for a **parent, relative, rental property, or another service address**.

## 🧭 Core user journey

```text
Role selection
     ↓
Login / Sign up
     ↓
Customer describes the problem (text / voice)
     ↓
AI-assisted service understanding
     ↓
Choose service location (GPS or address)
     ↓
Nearby verified workers within 15 km
     ↓
Worker receives the exact job note
     ↓
Worker accepts / rejects
     ↓
Worker sends a quote
     ↓
Customer accepts / rejects the quote
     ↓
Work starts
     ↓
Worker requests completion
     ↓
Customer confirms satisfaction OR raises a dispute
     ↓
Payment is unlocked only after confirmation
     ↓
Rating / review
```

## 🌟 Key capabilities

| Capability | What it does |
|---|---|
| 🎙️ Voice-first request | Lets customers explain real-world problems naturally |
| 🤖 AI service understanding | Helps classify a request and surface service/price guidance |
| 📍 Location-aware matching | Finds active, verified workers near the **service location** |
| 🏠 Remote service booking | Book for parents/relatives without being physically present |
| 👷 Worker choice | Customer can review and choose a specific professional |
| 📝 Exact work note | Worker receives the customer's detailed requirement |
| ✅ Worker accept/reject | Worker explicitly decides whether to take the job |
| 💰 Quote negotiation | Worker proposes the price; customer accepts or rejects |
| 🛡️ Satisfaction gate | Completion requires customer confirmation |
| ⚠️ Dispute path | Customer can dispute completion before payment |
| 💳 Razorpay payments | Payment order uses the server-approved booking price |
| ⭐ Ratings | Customer can rate a completed booking |
| 🌐 Multilingual UX | English / Hindi language switching is available |
| 🧑‍🔧 Contractor workflow | Project creation and worker coordination for larger jobs |
| 🔐 Role-based access | Customer, worker, contractor and admin flows are separated |

## 🏗️ Architecture

```text
┌───────────────────────────────┐
│        React + Vite UI        │
│  Customer / Worker / Admin    │
│        / Contractor           │
└───────────────┬───────────────┘
                │ REST + JWT
                ▼
┌───────────────────────────────┐
│       Express.js API          │
│ Auth · Workers · Bookings     │
│ Quotes · Payments · Complaints│
│ Services · Projects · Admin  │
└───────────────┬───────────────┘
                │
        ┌───────┴────────┐
        ▼                ▼
┌──────────────┐   ┌───────────────┐
│ MongoDB Atlas│   │ Razorpay      │
│ users/jobs/  │   │ payment       │
│ locations/   │   │ verification  │
│ ratings      │   └───────────────┘
└──────────────┘
```

The API applies authentication, role authorization, location validation, worker eligibility checks, lifecycle constraints, rate limiting, and server-side payment verification.

## 🛡️ Trust & safety model

Anvaya is intentionally **trust-first**, rather than treating a worker's “job done” action as sufficient.

- A worker must be active and verified to take a job.
- Selecting a worker does **not** automatically mean the worker accepted the job.
- A worker must explicitly accept or reject the request.
- The worker proposes a quote; the customer controls quote acceptance.
- Work cannot start through the protected lifecycle until the quote has been accepted.
- A worker requests completion; the customer confirms satisfaction.
- A customer can dispute completion, keeping payment locked.
- Payment amount is derived on the backend instead of trusting a browser-provided amount.
- Uploaded worker documents are constrained by server-side upload validation.

See the API contract for the authoritative endpoint and lifecycle definition: [`docs/API_CONTRACT.md`](docs/API_CONTRACT.md).

## 🌍 Service-location model

**The service location is where the worker needs to go.** It does not have to be the customer's current physical location.

Supported patterns:

1. **Current location** — use browser GPS when the customer is at the job site.
2. **Search a place** — choose a town, village, landmark, PIN code, or address.
3. **Remote booking** — select the exact address of a parent, relative, tenant, or other property.

Worker distance is calculated from the **selected service location**. Area-level city/town selections are treated as approximate; full addresses or GPS provide more precise doorstep matching.

## 👥 Demo environment

The repository includes a repeatable demo-data seeder for judge/demo environments. It provisions:

- a demo customer
- a demo worker pool with 100 generated worker profiles
- a demo admin
- a demo contractor
- workers distributed across multiple Indian city regions with different skills, ratings, experience and coordinates

Run from `backend/`:

```bash
node src/scripts/seedDemoUsers.js
```

The script prints the demo password after seeding. **Do not use demo credentials in production.**

## 🚀 Local development

### Prerequisites

- Node.js 22+ recommended
- npm
- MongoDB / MongoDB Atlas
- Razorpay test credentials for payment testing

### 1. Clone

```bash
git clone https://github.com/Sumit7974/Anvaya.git
cd Anvaya
```

### 2. Install frontend dependencies

```bash
npm ci
```

### 3. Configure frontend environment

Create `.env` from `.env.example`:

```env
VITE_API_URL=http://localhost:5000
```

### 4. Configure backend environment

```bash
cd backend
npm ci
```

Create `backend/.env` from `backend/.env.example` and provide your own MongoDB, JWT and Razorpay values.

### 5. Start backend

```bash
npm run dev
```

The API runs on `http://localhost:5000` by default.

### 6. Start frontend

From the repository root in another terminal:

```bash
npm run dev
```

The Vite development server runs on `http://localhost:5173` by default.

## ✅ Validation commands

Frontend:

```bash
npm run lint
npm run build
```

Backend:

```bash
npm ci
node --check src/server.js
node --check src/controllers/authController.js
node --check src/controllers/bookingController.js
node --check src/controllers/paymentController.js
node --check src/controllers/workerController.js
```

GitHub Actions runs the frontend lint/build checks and backend syntax checks on pushes and pull requests. See [`.github/workflows/ci.yml`](.github/workflows/ci.yml).

## 🔐 Environment variables

Never commit real credentials. The repository intentionally keeps environment values in local `.env` files and provides examples instead.

Backend example variables:

| Variable | Purpose |
|---|---|
| `PORT` | API listening port |
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | JWT signing secret |
| `NODE_ENV` | Runtime environment |
| `CLIENT_URL` | Allowed frontend origin(s) |
| `RAZORPAY_KEY_ID` | Razorpay key ID |
| `RAZORPAY_KEY_SECRET` | Razorpay secret |
| `ADMIN_BOOTSTRAP_KEY` | Optional controlled admin bootstrap |

For production, use your hosting provider's encrypted environment-variable store.

## 📚 Documentation

- [`docs/API_CONTRACT.md`](docs/API_CONTRACT.md) — REST endpoints, roles and lifecycle rules
- [`docs/DEMO_GUIDE.md`](docs/DEMO_GUIDE.md) — repeatable SIH/judge demonstration path
- [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md) — production deployment checklist

## 🧪 SIH judge demo

The strongest end-to-end scenario is:

> A customer in one city needs an electrician at their parents' home in another city. They describe the problem by voice, choose the parents' service location, compare nearby verified electricians, send a detailed work note, let the worker accept/reject and quote, accept the quote, track work, confirm satisfaction, and pay only after completion.

This demonstrates Anvaya's main differentiators together: **AI assistance + local discovery + remote service location + worker choice + quote negotiation + customer satisfaction protection + secure payment lifecycle**.

## ⚠️ Production notes

The repository is prepared for deployment, but production readiness still requires environment-specific verification of:

- deployed frontend ↔ backend connectivity and CORS
- MongoDB Atlas production database/indexes
- Razorpay test/live configuration
- browser HTTPS requirements for geolocation and payment flows
- real-domain callback/origin configuration where applicable
- external geocoding availability and acceptable usage limits
- production secrets and log/monitoring setup

Do not copy local demo credentials or development secrets into a production environment.

## 🎨 Design

Anvaya's interface is designed around **high readability, clear actions, forgiving forms, large touch targets, simple language, multilingual access, and a warm visual system** suitable for users with varying levels of digital familiarity.

## 📄 License

This repository currently retains the existing project licensing configuration. Confirm the intended open-source/proprietary license before public redistribution.

---

**Anvaya — trusted workers, better connections, stronger communities.**