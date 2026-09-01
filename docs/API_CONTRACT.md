# Anvaya API Contract

Base URL: `http://localhost:5000` (local) / your Render URL (prod)
All protected routes require header: `Authorization: Bearer <token>`

## Auth (role = customer | worker | admin | contractor)
POST /api/auth/:role/register   { name, email, phone*, password } → 201 { _id, name, email, role, token }
POST /api/auth/:role/login      { email, password }               → 200 { _id, name, email, role, token }
*phone not required for admin

## Workers
GET   /api/workers                                              (protect)   → list verified+active workers
GET   /api/workers/nearby?longitude&latitude&radius&skill        (protect)   → nearby available verified workers
GET   /api/workers/profile                                       (worker)    → own profile
PATCH /api/workers/profile            { skills, location }        (worker)
PATCH /api/workers/availability                                   (worker)
POST  /api/workers/verification/upload  (multipart 'document')    (worker)
POST  /api/workers/match-service      { problem } → { matched, serviceTag }  (any)

## Bookings
POST   /api/bookings                  (customer) { problemDescription, serviceTag?, location?, workerId? }
GET    /api/bookings/available        (worker)   → open, unassigned requests
GET    /api/bookings/my               (customer) → own bookings
PATCH  /api/bookings/:id/accept       (worker)   → 403 if worker suspended/unverified
PATCH  /api/bookings/:id/start        (worker)
PATCH  /api/bookings/:id/complete     (worker)
PATCH  /api/bookings/:id/cancel       (customer)
POST   /api/bookings/:id/rating       (customer) { score(1-5), review? }

Note: if `workerId` is included in POST /api/bookings, that worker is auto-validated
(active + verified + available) and the booking is created directly with
status "accepted" and that worker attached — no separate accept call needed.

## Payments (Razorpay test mode)
POST /api/payments/order   (customer) { bookingId, amount } → { orderId, amount, currency, keyId }
POST /api/payments/verify  (customer) { bookingId, razorpay_order_id, razorpay_payment_id, razorpay_signature }

Booking must be status "completed" before an order can be created against it.

## Admin
GET   /api/admin/workers/pending          (admin)
PATCH /api/admin/workers/:id/verify       (admin) { status: 'verified' | 'rejected' }

## Projects (contractor)
POST   /api/projects
GET    /api/projects/my
GET    /api/projects/:projectId
GET    /api/projects/workers/find?skill&longitude&latitude&radius
POST   /api/projects/:projectId/workers        { workerId }
PATCH  /api/projects/:projectId/workers/:workerId  { status }
PATCH  /api/projects/:projectId/status         { status }