# IGNIS Known Limitations

IGNIS is a research-exploration layer, not a spacecraft fire-safety certification system, emergency predictor, calibrated simulator, or engineering sign-off tool. Its qualitative safety content must not be used as an operational threshold or procedure.

The local charts and sample CSV are synthetic demonstrations. The application does not embed NASA measurement tables and does not claim to reproduce flight data. Source records are descriptions, publications, or repository metadata unless the UI explicitly says otherwise.

The optional external AI mode is not enabled by default and was not integration-tested in this environment because no provider credentials were available. If enabled, the operator must test provider availability, timeout behavior, retention, rate limits, and data-processing terms.

Research links depend on external NASA, PSI, and NTRS availability. The NTRS citation page is publicly readable in the web interface but returned HTTP 403 to one command-line request during verification.

The privacy and terms documents describe the current source behavior but are project-level transparency documents, not jurisdiction-specific legal advice. A public operator must add its identity, contact route, retention policy, hosting-log details, and jurisdictional terms.

Performance numbers in the QA report are local smoke measurements, not a production load test or a Core Web Vitals assessment. Formal WCAG conformance testing and assistive-technology review remain future work.

Recharts 2.15.4 emits an npm deprecation notice because its 1.x and 2.x branches are no longer active. No vulnerability was reported, and it was intentionally left unchanged to avoid an unrelated chart migration.
