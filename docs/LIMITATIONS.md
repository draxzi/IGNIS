# Known limitations

IGNIS is a research exploration interface, not a calibrated combustion solver, a fire-risk scoring system, a flight operations tool or a spacecraft safety certification product.

The current source index is curated and intentionally small. A NASA-linked record is not the same as the full publication, raw data, calibration record or uncertainty budget. Some source pages expose metadata but not downloadable rows. The UI therefore avoids inventing numerical values.

The default series is synthetic. Uploaded CSV analysis is local to the current browser session and is not persisted. The optional AI path depends on the user’s selected provider and is constrained by the context sent to it; it can still be wrong, so original links remain visible.

The assistant route has input validation and an upstream timeout but no persistent rate limiter. Add one before public high-volume use. Future persistence requires independent authentication, authorization, database migrations, privacy review and a documented data-retention policy.
