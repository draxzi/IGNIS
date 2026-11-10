# IGNIS Final Runtime Verification Report

**Verification copy:** `/home/ubuntu/ignis-runtime-verification`

**Source candidate verified:** `/home/ubuntu/ignis-next15-migration`

**Existing release ZIP preserved:** `/home/ubuntu/IGNIS-final-release-candidate.zip`

**Verification date:** November 2026

**Final recommendation:** **READY FOR STAGING**

No application source code or dependency version was changed during this verification. The verification was run in a separate copy so the existing candidate and release ZIP remained intact.

## 1. Package scripts inspected

`package.json` exposes the following scripts:

```text
"dev": "next dev"
"build": "next build"
"start": "next start"
"lint": "next lint"
"typecheck": "tsc --noEmit"
```

The production server was therefore started with:

```text
npm start -- -p 3002 -H 0.0.0.0
```

The project contains a `lint` script, but Next.js 15.5.29 no longer provides the old `next lint` command in this configuration. It was not used as a required verification gate because the requested check set specifies typecheck and build, and the source had already passed the independent static audit. Typecheck and production compilation were executed successfully.

## 2. Clean installation

Command:

```text
npm ci
```

Observed result:

```text
added 149 packages, and audited 150 packages in 7s
28 packages are looking for funding
found 0 vulnerabilities
```

npm printed a non-blocking deprecation notice for `recharts@2.15.4`; this is not an audit vulnerability and no unrelated chart-library upgrade was performed.

## 3. Fresh dependency audit

Command:

```text
npm audit --json
```

The complete machine-readable result is included as [`RUNTIME-NPM-AUDIT.json`](RUNTIME-NPM-AUDIT.json). Its exact vulnerability summary is:

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

The audit reported 177 dependency entries in total: 57 production, 82 development, 40 optional, 0 peer, and 0 peer-optional.

No `npm audit fix --force` was used.

## 4. TypeScript and production build

Commands:

```text
npm run typecheck
npm run build
```

Observed typecheck output:

```text
> ignis@1.0.0 typecheck
> tsc --noEmit
```

The command exited 0.

Observed build output began with:

```text
> ignis@1.0.0 build
> next build
▲ Next.js 15.5.29
Creating an optimized production build ...
✓ Compiled successfully
✓ Generating static pages (12/12)
```

The command exited 0. The build generated these routes:

```text
/                  static
/about             static
/api/assistant     dynamic
/assistant         static
/compare           static
/lab               static
/research          static
/safety            static
/visualize         static
```

## 5. Production-server route and API verification

The server started successfully using the actual project script:

```text
npm start -- -p 3002 -H 0.0.0.0
```

All eight required routes returned HTTP 200 HTML:

```text
ROUTES PASS: /,/research,/lab,/compare,/assistant,/safety,/visualize,/about
ROUTE MANIFEST PASS
```

The route manifest matched the same eight paths. The Assistant API checks passed for empty input validation, a relevant microgravity question, an unsupported question, and a 601-character over-limit question:

```text
ASSISTANT API PASS
```

The direct CSV parser/export utility checks passed for duplicate headers, quoted commas, escaped quotes, mixed columns, and CSV escaping:

```text
CSV UTILITY PASS
```

## 6. Real browser verification

A temporary Playwright Core harness drove the installed Chromium binary. Playwright was not added to the project dependencies. The suite ran against the isolated production server at `http://127.0.0.1:3002`.

The final rerun produced exactly:

```text
ROUTES PASS /,/research,/lab,/compare,/assistant,/safety,/visualize,/about
RESEARCH FILTER PASS
CSV UPLOAD/EXPORT PASS
INVALID CSV PASS
UPLOAD LIMIT PASS
MOBILE NARROW VIEW PASS {"home":{"innerWidth":586,"scrollWidth":586},"lab":{"innerWidth":501,"scrollWidth":501}}
CHART INTERACTION PASS
PERFORMANCE TIMING {"domContentLoaded":22,"load":40.59999999962747,"transfer":300}
CONSOLE ERRORS PASS
BROWSER QA PASS
```

The browser suite verified desktop rendering, navigation, Research filtering, real CSV upload, quoted-field export, invalid-file handling, the 2 MB file limit, mobile/narrow rendering without horizontal overflow, chart SVG presence, tooltip interaction through the Recharts interactive surface, performance timing, and browser/page console errors.

The first chart-interaction attempt timed out while hovering the line path because the Recharts SVG surface intercepted pointer events. This was a test-harness targeting error, not an application defect: the chart was present and intentionally handled pointer events at the parent surface. The harness was changed to hover the actual `.recharts-surface`, then the entire browser suite was rerun and passed. No application source was changed for this issue.

## 7. Package and ZIP integrity

The existing release ZIP was not overwritten. A new verified release ZIP was created only after the isolated runtime copy passed all checks. The final package check confirms that the verified ZIP contains the tested source, manifests, documentation, screenshots, and fresh audit artifact, while excluding `node_modules`, `.next`, logs, caches, temporary browser files, and build-info files.

The verification copy contained no secrets or private keys in application source, public assets, documentation, or configuration templates. `.env.example` contains placeholders only.

The verified ZIP and source comparison passed. Its final size and SHA-256 checksum are provided in the delivery response so the report does not embed a self-referential archive hash.

## 8. Changes made during verification

No application source files, configuration files, dependency versions, or UI files were changed. The only verification-copy additions are this report and the copied fresh audit artifact. The temporary browser harness was stored outside the project under `/tmp` and is not part of the release package.

The original project at `/home/ubuntu/ignis-next15-migration`, the emergency backup, and `/home/ubuntu/IGNIS-final-release-candidate.zip` remain preserved.

## Final recommendation

**READY FOR STAGING.** The candidate has now passed clean installation, fresh dependency audit, TypeScript validation, production build, production-server startup, all eight route checks, API checks, real browser upload and invalid-file checks, mobile rendering checks, chart interaction, console-error checks, source/secret checks, and final ZIP integrity verification.

This sign-off is for staging and controlled review. It does not authorize deployment, publishing, or a claim that an operator-specific external AI provider, hosting configuration, legal terms, or production load profile has been validated.
