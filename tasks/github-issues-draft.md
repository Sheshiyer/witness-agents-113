# GitHub Issue Drafts

## 1. Replace inactive direct-contact affordances with a real correspondence channel

- Suggested title: `Wire a real direct-contact channel before reintroducing email CTAs`
- Problem:
  - The public site previously exposed `hello@tryambakam.space` as a live inbox.
  - That inbox is not currently active.
  - A polished `mailto:` flow creates a false trust signal and turns the contact surface into a dead end.
- Why it matters:
  - The page currently asks for reader trust through essays, code, and inspectable claims.
  - A dead contact path breaks that trust faster than imperfect copy.
- Acceptance criteria:
  - Decide the real correspondence channel: live inbox, form backend, or explicit no-contact state.
  - If using email, prove delivery and response path end to end.
  - Reintroduce a CTA only after the channel is verified in production.
  - Update footer, FAQ, and threshold surfaces together so they stay consistent.

## 2. Implement the subscription / signal mailer end to end

- Suggested title: `Implement the subscription intake pipeline instead of placeholder capture UX`
- Problem:
  - The site has implied recurring-contact / subscription language, but no working intake path.
  - Previous implementations used placeholder or mail-client behavior instead of a real pipeline.
- Why it matters:
  - Subscription is infrastructure, not decoration.
  - If there is no capture, consent, storage, and dispatch path, the UI should not imply one exists.
- Acceptance criteria:
  - Choose the system of record for subscribers.
  - Build validated capture, delivery, and failure handling.
  - Add explicit consent / expectation copy.
  - Verify the full path from form submit to stored record and outbound confirmation.
  - Re-audit the page copy so any subscription language matches the real implementation.
