# IGNIS Fresh Runtime Dependency Audit

**Project:** IGNIS Next.js 15.5.29

**Verification copy:** `/home/ubuntu/ignis-runtime-verification`

**Command executed:**

```text
npm audit --json
```

**Fresh result:**

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

npm reported 177 dependency entries: 57 production, 82 development, 40 optional, 0 peer, and 0 peer-optional. `npm ci` also completed successfully and reported `found 0 vulnerabilities`.

npm printed a non-blocking deprecation notice for `recharts@2.15.4`. No vulnerability was associated with that notice, and no unrelated dependency upgrade was performed.

No `npm audit fix --force` was used. The complete raw JSON result is preserved in [`RUNTIME-NPM-AUDIT.json`](RUNTIME-NPM-AUDIT.json).
