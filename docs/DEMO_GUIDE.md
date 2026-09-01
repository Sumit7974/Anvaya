# Anvaya — SIH Demo Guide

This guide is designed for a short, reliable judge demonstration.

## Recommended story

**Remote service booking:** the customer is not at the repair site. A parent or relative needs an electrician, so the customer selects the parent's service address and books from a distance.

## Demo sequence

1. Open Anvaya and select **Customer**.
2. Sign in with a prepared demo customer account.
3. Describe a household problem using text or the voice-assisted flow.
4. Continue to **Find a trusted worker**.
5. Open **Service Location**.
6. Demonstrate both choices:
   - use current GPS when physically at the service address;
   - search/select another place when booking remotely.
7. Select a service such as **Electrician**.
8. Show nearby verified and available workers with rating, experience and distance from the **selected service location**.
9. Select a worker and submit the booking request.
10. Switch to the worker account and show the incoming request.
11. Worker accepts the request and sends a quote.
12. Customer reviews and accepts the quote.
13. Worker starts the job and later requests completion.
14. Customer confirms satisfactory completion.
15. Demonstrate that payment is available only after the satisfaction gate.
16. Complete the Razorpay test payment.
17. Submit a rating/review.

## What to point out to judges

### 1. Location is the service address

Distance is calculated from where the worker actually needs to go, not automatically from the customer's phone. This enables booking for parents, relatives, rental properties and other remote service addresses.

### 2. Verification before discovery

The nearby-worker experience is intended to surface active, verified and available professionals rather than an unfiltered directory.

### 3. Trust-first booking lifecycle

Choosing a worker does not equal acceptance. The worker accepts/rejects, proposes a quote, and the customer accepts/rejects the quote before work proceeds.

### 4. Customer-controlled completion

The worker requests completion, but the customer confirms satisfaction. A dispute path keeps payment locked when the customer reports a problem.

### 5. Backend-controlled payment amount

The payment order is created from the stored booking price on the server. The browser is not trusted to choose the amount.

## Demo data

The backend includes a seed script that creates a large pool of demo workers with different names, skills, ratings, experience and locations across multiple Indian city regions.

```bash
cd backend
node src/scripts/seedDemoUsers.js
```

The script prints the demo password. Use demo credentials only for demonstrations; never deploy them as production credentials.

## Backup plan

If browser GPS is unavailable or permission is denied, use the manual service-location search. If live payment credentials are unavailable, explain the Razorpay test-mode flow rather than using real customer payment data.

## Judge questions worth preparing for

- **How is the worker selected?** — By service skill, verification/availability and distance from the selected service location.
- **Can I book for someone else?** — Yes. The service location can be different from the customer's current location.
- **Who sets the price?** — The worker proposes a quote; the customer accepts or rejects it.
- **What stops premature payment?** — Payment-order creation requires a completed booking and customer confirmation.
- **What if the work is poor?** — The customer can dispute completion before payment is unlocked.
- **What happens if a worker rejects?** — The request remains available for another eligible worker according to the booking flow.
- **How are credentials protected?** — Secrets belong in environment variables; authentication uses signed tokens and protected API routes.
