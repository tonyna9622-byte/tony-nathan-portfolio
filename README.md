# Tony Nathan Portfolio — Fresh Build

A clean Next.js foundation for a bilingual video editor and motion designer portfolio.

## Current implementation status

### Implemented in this starter
- Next.js App Router + TypeScript + Tailwind.
- Premium dark visual direction.
- Arabic/English language toggle and RTL/LTR page direction.
- Independent EGP/USD currency toggle.
- Five service options and twelve duration options.
- Initial responsive homepage and project estimate preview.
- Server-side deterministic pricing module.
- HMAC-SHA256 signed complexity token foundation.
- Server-side token verification bound to description, service and duration.
- Manual fallback complexity classifier (not an AI integration).

### Not implemented yet
- Supabase database, authentication, storage and production RLS.
- Admin dashboard.
- Real portfolio uploads and project records.
- AI provider integration and production rate limiting.
- Saved client requests and reference numbers.
- PDF quotation generation.
- WhatsApp configuration.
- Paymob payments and verified webhooks.
- Privacy policy and terms pages.

The current request form uses a `mailto:` handoff and is **not** a real request submission system. The visible estimate is a frontend preview; production estimates must be fetched from `/api/analysis` and `/api/estimate`.

## Requirements
- Node.js 20 LTS recommended.
- npm.

## Run on Windows
1. Install Node.js 20 LTS.
2. Extract this ZIP.
3. Open the extracted folder.
4. In File Explorer, click the address bar, type `cmd`, and press Enter.
5. Run:

```bash
npm install
copy .env.example .env.local
```

6. Open `.env.local` and set `COMPLEXITY_TOKEN_SECRET` to a random secret of at least 32 bytes.
7. Start the development server:

```bash
npm run dev
```

8. Open http://localhost:3000

## Security notes
- HMAC secret is read only by server code.
- Tokens expire after 10 minutes.
- The estimate API rejects token reuse with a different description, service or duration.
- This initial token is not single-use. Replay within its validity window is possible; production should add a server-side nonce/consumption store and rate limiting.
- The starter's fallback complexity classification is intentionally simple and must not be represented as AI.
- Do not connect real payments or customer data until Supabase RLS, authentication, rate limiting, request validation and payment verification are implemented and tested.

## Pricing note
Initial base prices for non-basic services and the duration curve are provisional defaults carried forward from the earlier prototype. They must be reviewed and approved before launch. EGP and USD tables are separate.


## Portfolio media and starting prices update
- Added four supplied MP4 portfolio projects with poster images under `public/projects/`.
- The Basic Video Editing starting base price is now EGP 150 and USD 10. Other EGP service base prices were adjusted to 200 / 320 / 460 / 650 to retain a stepped ladder; USD service base prices remain 10 / 16 / 26 / 40 / 60.
- The estimate preview includes a separate complexity allowance and duration multiplier, so the displayed estimated total can be higher than the base starting price.
