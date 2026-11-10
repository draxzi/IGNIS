# Environment configuration

The app works with no environment variables. Copy `.env.example` to `.env.local` only when configuring an optional integration.

| Variable | Required | Purpose |
|---|---:|---|
| `AI_API_KEY` | No | Server-only key for an OpenAI-compatible chat endpoint. Blank means local fallback. |
| `AI_BASE_URL` | No | Base URL such as `https://api.openai.com/v1`; trailing slash is removed by the route. |
| `AI_MODEL` | No | Provider model name; defaults to `gpt-4o-mini`. |
| `DATABASE_URL` | No | Reserved for a future independently managed database layer; unused by the current demo. |

Never prefix these values with `NEXT_PUBLIC_`. Never commit `.env`, `.env.local` or provider credentials. Vercel environment variables should be added in the project settings and scoped to the environments that need them.
