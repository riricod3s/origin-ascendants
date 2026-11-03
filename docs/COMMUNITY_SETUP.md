# Origin Ascendants community setup

The community features use Supabase Auth, Postgres Row Level Security and Supabase Storage. The site intentionally stays in setup mode until a Supabase project is configured; no service-role key is used by the website. `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` must be available to the Next.js build and browser.

## 1. Configure the site

Copy `.env.example` to `.env.local` and set:

- `NEXT_PUBLIC_SITE_URL` to the canonical deployment URL.
- `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` from the Supabase project's API settings.
- `NEXT_PUBLIC_DISCORD_INVITE_URL` to the real community invite.
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY` to the public Cloudflare Turnstile site key.

Only public Supabase URL/anon-key values belong in this file. Never put a Supabase service-role key in a `NEXT_PUBLIC_*` variable or browser code.

## 2. Create the database and storage

Apply `supabase/migrations/20261103000000_community_platform.sql` to the Supabase project using the Supabase CLI or SQL editor. It creates the profile, forum, wiki, moderation, audit, message, notification and badge tables, enables Row Level Security, and creates the `community-images` storage bucket and policies.

After applying the migration, verify the migration completed without SQL errors and that the seeded forum/wiki categories are present.

## 3. Configure email authentication

In Supabase Authentication:

1. Enable email/password sign-in and require email confirmation.
2. Configure a production SMTP provider and sender identity. Supabase's default email service is for testing and has strict delivery limits.
3. Add the canonical site URL and the following redirect URLs to the allowed redirect list:
   - `<SITE_URL>/auth/callback`
   - `<SITE_URL>/auth/callback?next=/account`
   - `<SITE_URL>/auth/callback?next=/reset-password`
4. Set the email confirmation and password recovery templates to use the redirect URL supplied by the app.

Unverified email/password accounts should not be allowed to sign in. Email confirmation and password recovery are handled by Supabase Auth, not by application-managed tokens.

## 4. Configure Discord OAuth

Create a Discord application and OAuth2 client. In the Discord developer portal, add Supabase's Discord callback URL shown by the Supabase provider setup. In Supabase Authentication > Providers > Discord, enable the provider and set the Discord client ID and secret.

Add `<SITE_URL>/auth/callback` to Supabase's allowed redirect URLs. Keep the Discord client secret in Supabase's provider settings only. Discord's verified email should be enabled if the provider requires an email address.

## 5. Enable CAPTCHA

Create a Cloudflare Turnstile site and secret. Set the site key in `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, then enable Turnstile CAPTCHA in Supabase Authentication and enter the secret key there. Add the production hostname to the Turnstile widget configuration.

Registration is intentionally blocked in the UI when the public key or CAPTCHA response is missing. Supabase must also be configured with the matching secret so CAPTCHA validation happens server-side.

## 6. Bootstrap the first administrator

Register and verify the first owner account. In the Supabase SQL editor, promote that account using its profile ID:

```sql
begin;
alter table public.profiles disable trigger profiles_guard_sensitive_fields;
update public.profiles
set role = 'administrator'
where username = 'YOUR_OWNER_USERNAME';
alter table public.profiles enable trigger profiles_guard_sensitive_fields;
commit;
```

Run this manually in the trusted Supabase SQL editor, verify that exactly one row was updated, and never expose this operation through application code or a public endpoint. Thereafter, role changes are available in the administrator panel and are written to the audit log.

## 7. Operational notes

- Configure production backup/restore and database retention in Supabase.
- Review RLS policies and provider configuration before launch; the browser anon key is public by design, while RLS is the security boundary.
- Set up moderation staffing, community rules, abuse-report response and an account deletion/privacy request process.
- The site does not provide payment processing or pay-to-win benefits.
- Test email confirmation, password recovery, Discord sign-in, uploads, forum reports and role protections against the configured project before announcing the site.
