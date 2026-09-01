# Anvaya — Deployment Checklist

Use this checklist immediately before and after deployment.

## 1. Repository gate

- [ ] Pull the latest `main` branch.
- [ ] Frontend `npm ci` succeeds.
- [ ] Frontend `npm run lint` succeeds.
- [ ] Frontend `npm run build` succeeds.
- [ ] Backend `npm ci` succeeds.
- [ ] Backend `npm run check` succeeds.
- [ ] GitHub Actions frontend and backend jobs are green.
- [ ] No real `.env` files, credentials, uploads or build output are committed.

## 2. Backend environment

Configure these variables in the hosting provider's encrypted environment settings:

```text
PORT
MONGO_URI
JWT_SECRET
NODE_ENV=production
CLIENT_URL=<deployed-frontend-origin>
RAZORPAY_KEY_ID
RAZORPAY_KEY_SECRET
ADMIN_BOOTSTRAP_KEY   # only if intentionally required
```

Use a long, unique production JWT secret. Do not reuse demo or development secrets.

## 3. MongoDB Atlas

- [ ] Production database is reachable from the backend host.
- [ ] Database user has only the permissions required by the application.
- [ ] Network/IP access is configured for the hosting environment.
- [ ] Geospatial indexes are present for worker/service-location queries.
- [ ] Automated backups and retention are configured according to the deployment requirement.

## 4. Frontend environment

Set:

```text
VITE_API_URL=<deployed-backend-api-origin>
```

Build the frontend after setting the production value because Vite environment values are embedded at build time.

## 5. CORS and HTTPS

The backend allows only configured frontend origins. Set `CLIENT_URL` to the exact production frontend origin.

Use HTTPS in production. Browser geolocation and payment experiences should be tested on the real deployed origin, not only on localhost.

## 6. Razorpay

For a judge/demo environment, Razorpay test mode is acceptable.

Before live payments:

- [ ] Replace test credentials with the correct live credentials.
- [ ] Verify the production origin and checkout flow.
- [ ] Confirm server-side signature verification works.
- [ ] Confirm duplicate-payment protection.
- [ ] Never expose `RAZORPAY_KEY_SECRET` to the frontend.

## 7. Health check

After deployment, verify:

```text
GET /api/health
```

Expected response:

```json
{
  "status": "ok",
  "service": "anvaya-api"
}
```

## 8. Smoke test

Run one complete journey:

```text
Customer login
→ describe problem
→ select service location
→ find nearby worker
→ choose worker
→ worker accepts
→ worker sends quote
→ customer accepts quote
→ worker starts
→ worker requests completion
→ customer confirms
→ payment order
→ payment verification
→ rating
```

Also test the remote-location scenario where the customer's current location differs from the selected service address.

## 9. Production observability

At minimum, confirm the hosting platform provides access to application logs and deployment status. Review failed requests without logging secrets, passwords, authorization tokens or payment secrets.

## 10. Demo-data warning

`backend/src/scripts/seedDemoUsers.js` is useful for staging/demo environments. Do not run it against a production database unless intentionally creating isolated demo data.
