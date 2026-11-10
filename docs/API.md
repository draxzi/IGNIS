# API documentation

## `POST /api/assistant`

Request body:

```json
{ "question": "Why does combustion behave differently in microgravity?" }
```

The question must be a non-empty string of at most 600 characters. The route returns HTTP 400 for invalid input. It returns a JSON object with `answer`, `sources`, `mode` (`local-fallback` or `configured-ai`) and `uncertainty`.

When `AI_API_KEY` is absent, the route returns the local fallback. When present, the route calls `${AI_BASE_URL}/chat/completions` with a low-temperature request and the curated research context. If the upstream provider fails, times out or returns an unusable response, the local fallback is returned. The browser never receives the secret.

## Error behavior

The page shows an answer even when the optional provider is unavailable. Provider errors are not surfaced as fabricated success. For production, add a platform-appropriate rate limiter before exposing the route broadly; the current route has input length validation and a 15-second upstream timeout but no persistent rate-limit store.
