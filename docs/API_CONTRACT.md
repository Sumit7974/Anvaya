# Anvaya API Contract

Base URL: `http://localhost:5000` (local) / your Render URL (prod)
All protected routes require `Authorization: Bearer <token>`.

## Auth (role = customer | worker | admin | contractor)
POST `/api/auth/:role/register` `{ name, email, phone*, password }` → 201 `{ _id, name, email, role, token }`
POST `/api/auth/:role/login` `{ email, password }` → 200 `{ _id, name, email, role, token }`

## Workers
GET `/api/workers` (protected) → verified + active workers; optional `skill`, `isAvailable`
GET `/api/workers/nearby?longitude&latitude&radius&skill` (protected) → nearby verified available workers
GET `/api/workers/profile` (worker) → own profile
PATCH `/api/workers/profile` `{ skills, location }` (worker)
PATCH `/api/workers/availability` (worker)
POST `/api/workers/verification/upload` multipart `document` (worker)
POST `/api/workers/match-service` `{ problem }` → `{ matched, serviceTag }`

## AI/service analysis
POST `/api/services/analyze` (protected) `{ text }` → service classification, confidence and suggested price range when available.

## Bookings — trust-first lifecycle
POST `/api/bookings` (customer) `{ problemDescription, serviceTag?, location?, workerId? }`

When `workerId` is supplied, the selected worker is validated as active, verified and available, but **is not considered to have accepted the job**. The booking remains `requested` until that worker accepts.

GET `/api/bookings/available` (worker) → unassigned open requests
GET `/api/bookings/worker` (worker) → that worker's assigned bookings
GET `/api/bookings/my` (customer) → customer's bookings
PATCH `/api/bookings/:bookingId/accept` (worker) → worker accepts request
PATCH `/api/bookings/:bookingId/reject` (worker) → worker rejects request
PATCH `/api/bookings/:bookingId/start` (worker) → starts after customer accepts quote
PATCH `/api/bookings/:bookingId/request-completion` (worker) → asks customer to verify work
PATCH `/api/bookings/:bookingId/confirm-completion` (customer) → customer satisfaction gate; unlocks payment
PATCH `/api/bookings/:bookingId/dispute-completion` (customer) → marks work disputed and keeps payment locked
PATCH `/api/bookings/:bookingId/cancel` (customer) → cancels before work starts
POST `/api/bookings/:bookingId/rating` (customer) `{ score: 1-5, review? }`

## Quotes
PATCH `/api/quotes/:bookingId/send` (worker) `{ amount, note? }` → sends worker price proposal; booking becomes `quote-pending`
PATCH `/api/quotes/:bookingId/accept` (customer) → accepts worker proposal and price
PATCH `/api/quotes/:bookingId/reject` (customer) `{ reason? }` → rejects proposal

The price is finalized from the worker's accepted quote. The frontend must never be trusted to choose the payment amount.

## Payments (Razorpay test mode)
POST `/api/payments/order` (customer) `{ bookingId }` → `{ orderId, amount, currency, keyId }`
- Requires booking status `completed` and customer confirmation timestamp.
- Uses the stored worker-approved booking price on the backend.
- Rejects duplicate paid bookings.

POST `/api/payments/verify` (customer) `{ bookingId, razorpay_order_id, razorpay_payment_id, razorpay_signature }`
- Requires the Razorpay order to belong to the booking.
- Verifies the HMAC signature server-side.

## Complaints
POST `/api/complaints` (customer) `{ bookingId, category, description }`
Complaints are linked to the booking and are intended for disputed/quality/safety review.

## Admin
GET `/api/admin/workers/pending` (admin)
PATCH `/api/admin/workers/:id/verify` (admin) `{ status: 'verified' | 'rejected' }`

## Projects (contractor)
POST `/api/projects`
GET `/api/projects/my`
GET `/api/projects/:projectId`
GET `/api/projects/workers/find?skill&longitude&latitude&radius`
POST `/api/projects/:projectId/workers` `{ workerId }`
PATCH `/api/projects/:projectId/workers/:workerId` `{ status }`
PATCH `/api/projects/:projectId/status` `{ status }`
