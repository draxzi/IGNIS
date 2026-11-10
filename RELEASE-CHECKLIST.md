# IGNIS Release Checklist

## Technical

- [x] Recovered from the Stage 6 emergency backup into a separate working copy.
- [x] Preserved the Next.js App Router structure, React 18, Tailwind CSS, Recharts, and Lucide icons.
- [x] Upgraded Next.js to patched `15.5.29` in a controlled migration copy.
- [x] `npm ci` passes.
- [x] `npm run typecheck` passes.
- [x] `npm run build` passes.
- [x] `npm audit` reports zero vulnerabilities.
- [x] No Manus runtime/CDN references remain in application source.
- [x] No credentials or private-key literals detected.
- [x] `.env.example` contains placeholders only.

## Routes and behavior

- [x] All eight page routes return HTTP 200.
- [x] Route manifest matches the page routes.
- [x] Research filtering and source metadata verified.
- [x] CSV upload, quoted fields, escaped quotes, duplicate headers, mixed columns, invalid CSV, 2 MB limit, charting, filtering, and export verified.
- [x] Comparison selection and four-record limit verified.
- [x] Local Assistant validation, fallback, citations, and unsupported-question behavior verified.
- [x] Visualization synthetic/source separation and empty state verified.
- [x] Fire Safety and About methodology/trust boundaries verified.

## Browser and accessibility

- [x] Desktop browser smoke testing completed.
- [x] Chromium real-upload test completed.
- [x] Narrow mobile viewport overflow checks completed.
- [x] Console and page-error checks completed with no observed errors.
- [x] Basic form labeling and unnamed-button checks completed.
- [x] Final browser screenshots captured under `qa-screenshots/`.
- [ ] Formal WCAG audit and assistive-technology review remain outside this lightweight QA pass.

## Trust and operations

- [x] Privacy/data-flow document added.
- [x] Terms/use-limitations document added.
- [x] Scientific disclaimer added.
- [x] Synthetic data remains labelled and bounded.
- [x] NASA/PSI/NTRS source links revalidated; NTRS command-line access may return 403 while the public record remains readable in the web interface.
- [ ] Operator-specific legal review remains required.
- [ ] Provider-backed AI integration remains untested because no credentials were available.
- [ ] Hosting-specific security headers, logging, rate limits, and monitoring must be configured by the operator.

## Publication decision

**Recommendation:** approve for controlled GitHub/Vercel review and staging. Before unrestricted public production use, complete the unchecked operational and legal items above.
