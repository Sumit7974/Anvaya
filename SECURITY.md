# Security Policy

## Scope

Anvaya handles authentication, service-location data, worker verification documents, booking state, complaints and payment verification. Security-sensitive configuration must remain outside source control.

## Reporting a vulnerability

If you discover a security issue, do not publish credentials, tokens, personal data or exploit details in a public issue. Contact the project maintainers privately with:

- a short description of the issue
- affected component/endpoint
- reproduction steps when safe to provide
- potential impact

## Deployment requirements

- Store secrets in the deployment platform's encrypted environment variables.
- Use a unique production `JWT_SECRET`.
- Restrict MongoDB access to the required application environment.
- Configure `CLIENT_URL` to trusted production origins only.
- Never expose Razorpay secret credentials to the frontend.
- Do not use demo credentials or seeded demo accounts for real users.
- Keep worker verification documents out of source control.
- Review application logs to ensure passwords, tokens and payment secrets are not recorded.

## Authentication

Protected API requests use bearer authentication. Authorization must be enforced by the backend; UI visibility alone is not a security boundary.

## Payments

Payment amounts are determined from server-side booking state and Razorpay signatures are verified server-side. Client-provided payment values must not be trusted.
