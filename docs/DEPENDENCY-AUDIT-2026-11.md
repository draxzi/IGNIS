# IGNIS Dependency Audit — November 2026

## Result

The recovered Stage 6 project began with an audit state of one critical direct Next.js aggregate and one high PostCSS finding. The final migrated project uses `next@15.5.29`, React `18.3.1`, and PostCSS `8.5.32`. A clean `npm ci` followed by `npm audit --json` reports:

```json
{
  "info": 0,
  "low": 0,
  "moderate": 0,
  "high": 0,
  "critical": 0,
  "total": 0
}
```

## Before remediation

The recovered project declared `next: ^14.2.21`, which resolved to `next@14.2.35`. npm reported a critical aggregate covering multiple Next.js advisories, including Image Optimization API AVIF/SVG remote-code-execution ranges, Server Component and Server Action denial-of-service ranges, and SSRF/cache-related ranges. npm’s automatic recommendation was `next@16.4.5`, a breaking major upgrade.

The earlier PostCSS finding affected a vulnerable `postcss` copy in the Next.js toolchain. The Stage 6 override had already constrained PostCSS to `8.5.32`, removing the PostCSS advisory while leaving the direct Next.js finding.

## Remediation decision

The official November 2026 Next.js security release lists `15.5.29` as a patched Maintenance LTS release and `16.4.5` as the patched Active LTS release.[1] npm metadata for `next@15.5.29` accepts React `^18.2.0` and React DOM `^18.2.0`, so a controlled Next.js 14 to 15.5.29 migration preserved the existing React 18 architecture.[2]

The migration was tested in a separate copy before becoming the final working copy. No `npm audit fix --force` was used. The project does not use `next/image`, rewrites, middleware, Server Actions, or an Edge runtime, but those reduced exposure observations were not used to suppress or dismiss the audit finding.

## Exact versions

Recovered state:

- Next.js manifest range: `^14.2.21`; resolved version: `14.2.35`.
- React: `18.3.1`.
- React DOM: `18.3.1`.
- PostCSS: `8.5.32` after the existing Stage 6 override.

Final state:

- Next.js: `15.5.29` exact.
- React: `18.3.1`.
- React DOM: `18.3.1`.
- PostCSS: `8.5.32`, enforced by `^8.5.23` plus the existing override.

## Verification performed

The migration copy passed `npm ci`, `npm run typecheck`, and `npm run build`. The final production server passed all eight route checks, route manifest verification, Assistant API checks, CSV utility checks, real Chromium browser checks, mobile narrow-screen checks, console-error checks, and source/secret scans. The final npm audit returned zero findings.

## Remaining dependency note

The project continues to use Recharts `2.15.4`, for which npm prints a deprecation notice because the 1.x and 2.x branches are no longer active. This is not an npm audit vulnerability and was not upgraded because doing so would be an unrelated chart-library migration outside the requested security fix. It should be evaluated in a future maintenance task.

## References

[1]: https://nextjs.org/blog/november-2026-security-release "November 2026 Next.js Security Release"
[2]: https://nextjs.org/docs/app/guides/upgrading/version-15 "Next.js Version 15 Upgrade Guide"
