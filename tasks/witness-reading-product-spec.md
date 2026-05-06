# Witness Reading Product Spec

Date: 2026-05-04  
Status: Working draft  
Scope: `witness-agents-intro-web` frontend plus the upstream `witness-agents` payload contract it depends on.

## Draft Intent

This document describes the next evolution of the Witness reading experience without proposing a breaking backend change.

The current live website flow remains the baseline. The current `witness-agents` payload remains the active contract. Any new report fields described here are intended to be additive so the product can evolve into a clearer reading object without forcing existing consumers to break.

This spec exists to do three things:
- clarify what the website already does today
- define a deterministic frontend rendering policy for the current payload
- define the next additive backend contract that would make the reading more legible, explainable, and shareable

## 1. Current Truth State

### 1.1 Live Frontend Behavior

The website has already crossed the first product boundary: it no longer treats Witness as a small homepage promo result. The homepage acts as intake, and the reading page acts as the canonical interpretation surface.

Today, the browser flow works like this:
- the homepage collects birth date, optional birth time, optional name, and city
- the city selector resolves timezone and geographic coordinates
- the frontend calls the interpreted workflow route rather than the legacy `/reading` route
- the latest reading is stored locally
- the user is redirected to a dedicated `reading.html` page
- the reading page renders workflow-level reading text, explicit dyad sections, and per-engine cards

That architecture is the correct baseline to keep. The next work is not to undo it. The next work is to make the contract and presentation semantics stronger.

### 1.2 Live Payload Semantics

The website currently depends on the workflow contract returned by `witness-agents`.

At the workflow level:
- `witness_layer.response` is the primary user-facing reading text
- `witness_layer.synthesis` may duplicate `response` or may serve as a nearby supporting variant
- `witness_layer.aletheios.perspective` is the pattern-reading voice
- `witness_layer.pichet.perspective` is the somatic-reading voice

At the engine level:
- `engine_results[*].witness_layer` supplies engine-specific reading text and voice data
- `engine_results[*].witness_prompt` may still matter when it is stronger than a generated engine summary
- structured `result` payloads support evidence rendering, but they are not the primary narrative layer

This means the product problem is no longer basic routing. The main product problem is how to present the current payload consistently and how to evolve it into a stronger report object.

### 1.3 Current Known Quality Gaps

The live flow is structurally sound, but the output quality still has visible gaps:
- workflow `response` can still read like polished summary copy rather than a true reading report
- some engines, especially somatic ones, benefit from one short practical-detail line in addition to the main reading text
- explainability is still mostly implicit rather than explicit
- the payload does not yet expose stable reading-object metadata such as `reading_id` or `reading_url`
- the system still needs product-level rules that prevent weak generated text from replacing stronger witness material

Those gaps are now the real product frontier.

## 2. Product Evolution Goal

The next phase of Witness should move the experience from an interpreted result block to an addressable reading object.

That does not mean the product needs a dramatic re-architecture. It means the current reading needs a clearer internal shape. A serious reading should have:
- an orienting title or summary
- a main reading body that feels like a report rather than generic copy
- visibly separate voices where those voices matter
- explicit evidence and tension, not just a merged tone
- a practical next move
- a path toward persistence, sharing, and comparison later

This evolution should happen incrementally. The website can stay on the current live contract while `witness-agents` adds stronger report fields over time.

## 3. Product Principles

The product should be governed by these principles:

1. The homepage initiates. The reading page interprets.
2. The reading must expose synthesis and evidence, not just a polished tone.
3. If the payload is weak, the UI must reveal that weakness rather than smoothing it over.
4. Frontend rendering policy must be deterministic.
5. Backend evolution should be additive until all consumers are migrated.
6. Every future reading object should become addressable, explainable, and comparable.

These principles are important because the product is now at a point where sloppy smoothing would hide the very quality issues the team needs to see.

## 4. User Flow

### 4.1 Intake Flow

The canonical intake path should remain simple:
- collect birth date
- collect optional birth time
- collect optional name
- collect city
- resolve timezone and coordinates
- submit to the workflow endpoint
- store the latest reading locally
- redirect to the reading page

The homepage should continue to behave as an initiation surface. It should explain what the reading is, collect the necessary human inputs, and hand off to the report surface. It should not attempt to become the full report itself.

### 4.2 Reading Flow

The reading page should remain the canonical report surface.

The page should present the reading in a clear order:
- identity and timing metadata
- workflow-level reading text
- pattern voice
- somatic voice
- engine chorus or evidence
- one practical next-step area

This keeps the reading coherent while still exposing enough structure for trust.

### 4.3 Future Persistence Flow

Persistence, sharing, and comparison should remain later phases, but the spec should make room for them now.

Future flows should support:
- permalink loading
- saved readings
- compare mode
- share surfaces

Those are product evolutions, not current requirements.

## 5. Reading Presentation Policy

This section is the frontend rendering contract for the current Witness surface.

### 5.1 Primary Reading Text

`witness_layer.response` should be treated as the default primary reading text for the workflow surface.

If a future `witness_layer.title` exists, it should be used as the report heading instead of forcing the frontend to infer one from body copy. If `response` and `synthesis` are materially identical, the frontend should not render both as separate full blocks. The UI should either collapse them or show a parity note.

The goal is not to maximize prose. The goal is to establish one clear primary reading channel.

### 5.2 Secondary Voices

The dyad should remain explicit.

The frontend should render:
- `witness_layer.aletheios.perspective` as the pattern-reading voice
- `witness_layer.pichet.perspective` as the somatic-reading voice

These voices should remain visibly distinct. Flattening them back into one generic paragraph would reduce explainability and remove one of the most useful parts of the system.

### 5.3 Practical Detail Surface

Some surfaces benefit from one short operational line in addition to the main reading text.

For those cases, the frontend may show a short practical-detail line derived from `pichet`, especially on:
- compact cards
- previews
- command surfaces
- engine summaries where the main `response` is emotionally strong but operationally sparse

This practical-detail line should support the main reading, not replace it. It should stay short enough that it reads as a cue, not a second full paragraph.

### 5.4 Per-Engine Cards

Each engine card should show the strongest available engine-level witness text, usually from the engine `witness_layer.response`.

Each card may also show one short practical-detail line if it materially improves usefulness. Structured `result` fields belong in the evidence layer. They should not become the primary user-facing voice unless the product explicitly enters an analytics or diagnostic mode.

### 5.5 Fallback Rules

The frontend should follow a strict fallback order:
1. `witness_layer.response`
2. `witness_layer.synthesis`
3. `witness_layer.pichet.perspective` or `witness_layer.aletheios.perspective` when one is clearly stronger for the surface
4. raw `witness_prompt` only as backend-owned rescue copy

This matters because the product should not silently drift back to raw engine narration or debug-like output.

## 6. Current Payload Contract

This section describes the live contract the website currently depends on.

### 6.1 Fields The Website Depends On Today

Current key fields:
- `workflow_id`
- `total_time_ms`
- `witness_layer.response`
- `witness_layer.synthesis`
- `witness_layer.aletheios.perspective`
- `witness_layer.pichet.perspective`
- `witness_layer.routing_mode`
- `witness_layer.response_cadence`
- `witness_layer.kosha_depth`
- `witness_layer.tier`
- `witness_layer.clifford_level`
- `engine_results[*].witness_layer`
- `engine_results[*].witness_prompt`

These fields are enough to render the current reading page, but they are not yet enough to make the reading feel like a complete report object.

### 6.2 Optional But Useful Current Fields

These fields are not required for the current page, but they help with evidence and progression display:
- `decoder_state`
- `max_layer_unlocked`
- `engine_role`
- engine-specific structured results that help evidence rendering

These should remain optional from the frontend point of view.

### 6.3 Fields Not To Treat As Primary Reading Copy

The frontend should not treat the following as the main reading voice:
- raw `result` payloads
- old `/reading`-style fields
- debug-oriented metadata

Those can support inspection, but they should not define the main tone of the product.

## 7. Proposed Additive Backend Contract

This section defines the next backend evolution as an additive proposal.

### 7.1 Additive Rule

No current field removals are required for this phase.

The existing contract remains valid:
- `response`
- `synthesis`
- `aletheios`
- `pichet`
- engine-level `witness_layer`

New report fields should be added without requiring existing consumers to immediately migrate.

### 7.2 Proposed Reading-Object Fields

The next intended report fields are:
- `reading_id`
- `reading_url`
- `created_at`
- `subject`
- `witness_layer.title`
- `witness_layer.summary`
- `witness_layer.convergences`
- `witness_layer.frictions`
- `witness_layer.practice`
- `witness_layer.question`
- `evidence.engines_used`
- `evidence.contributions`

### 7.3 Example Additive JSON Contract

The example below is a non-breaking proposal. It extends the current workflow response shape without removing the fields the website already uses.

```json
{
  "reading_id": "rdg_2026_05_04_daily_practice_01",
  "reading_url": "https://example.com/reading/rdg_2026_05_04_daily_practice_01",
  "workflow_id": "daily-practice",
  "created_at": "2026-05-04T06:30:00Z",
  "subject": {
    "name": "Optional User",
    "birth_date": "1991-08-15",
    "birth_time": "09:30",
    "location_label": "Bengaluru, India",
    "timezone": "Asia/Kolkata"
  },
  "witness_layer": {
    "title": "Body ready, regulation first",
    "summary": "Capacity is high, but pace matters more than force today.",
    "response": "Your body is ready to move, but regulation needs to set the pace. There is real capacity here, but it should be used cleanly rather than all at once. Start with one decisive action and let breath determine tempo.",
    "synthesis": "Capacity is high, emotional reserve is thinner, and breath is the bridge between readiness and steadiness.",
    "convergences": [
      "Body readiness and timing both favor movement.",
      "The reading repeatedly points toward regulation through breath."
    ],
    "frictions": [
      "Emotional reserve is lower than physical and mental readiness.",
      "Strong capacity could turn into overreach if pace is ignored."
    ],
    "practice": [
      "Take three slower breaths before the first major decision.",
      "Choose one meaningful action instead of spreading effort across many fronts."
    ],
    "question": "What part of you is already ready, and what part still needs steadiness?",
    "aletheios": {
      "perspective": "The pattern points toward capacity with tension: momentum is available, but coherence matters more than acceleration.",
      "confidence": 0.92
    },
    "pichet": {
      "perspective": "The body has charge, but the system wants pacing. Let breath lead before output does.",
      "confidence": 0.89
    },
    "routing_mode": "dyad-synthesis",
    "response_cadence": "immediate",
    "tier": "initiate",
    "kosha_depth": "anandamaya",
    "clifford_level": 7
  },
  "engine_results": {
    "biorhythm": {
      "engine_id": "biorhythm",
      "witness_prompt": "Your body is ready but your heart is catching up. What changes when you let readiness move at the speed of honesty?",
      "witness_layer": {
        "response": "Your body and mind are available for action, but emotional reserve is lower. Act cleanly, but do not spend yourself carelessly.",
        "synthesis": "Physical and intellectual readiness are high while emotional reserve is thinner.",
        "aletheios": {
          "perspective": "The pattern shows asymmetry: capacity is high, but emotional pacing matters.",
          "confidence": 0.88
        },
        "pichet": {
          "perspective": "Body ready. Inner space thinner. Choose effort that does not cost more than it returns.",
          "confidence": 0.84
        }
      }
    }
  },
  "evidence": {
    "engines_used": ["biorhythm", "vedic-clock", "panchanga"],
    "contributions": [
      {
        "engine_id": "biorhythm",
        "signal": "Physical and intellectual readiness are high while emotional reserve is low.",
        "impact": "This establishes the central action-versus-regulation tension."
      },
      {
        "engine_id": "vedic-clock",
        "signal": "Breath and chest regulation are foregrounded.",
        "impact": "This suggests the most reliable stabilizing lever for the day."
      },
      {
        "engine_id": "panchanga",
        "signal": "Timing supports intentional rather than forceful movement.",
        "impact": "This reframes action as ordered expression rather than raw push."
      }
    ]
  }
}
```

### 7.4 Why These Fields Exist

Each proposed field group exists for a clear reason:
- `title` provides a precise report heading
- `summary` supports previews, lists, and share surfaces
- `convergences` and `frictions` make the reading explainable
- `practice` and `question` make it actionable
- `reading_id` and `reading_url` make persistence and sharing possible
- `evidence` makes the report inspectable instead of opaque

The important design constraint is that these fields complement the current reading, not replace it by force.

## 8. Reading Quality Requirements

The reading contract should now be defined not just by data shape, but by explicit quality rules.

### 8.1 Must-Have Quality Rules

The reading should:
- lead with the dominant tension or pattern
- stay readable without exposing raw debug structure
- preserve the strongest symbolic or somatic line when the generated summary is weaker
- end with one actionable direction or one strong question rather than a stack of generic directives

### 8.2 Failure Modes To Ban

The system should explicitly reject these failure modes:
- broken interpolation like `undefined on undefined`
- precision-heavy numerics in user-facing prose unless they are truly necessary
- workflow openers based on engine counts or pattern counts
- generic convergence boilerplate with no specific claim
- flat symbolic recap that weakens a stronger mirror question
- frontend smoothing that hides backend weakness instead of surfacing it

These are not merely stylistic problems. They reduce trust and make it harder to tell whether the system is actually producing a meaningful reading.

## 9. Explainability And Evidence Model

A good reading should not only sound coherent. It should show why it exists.

### 9.1 Evidence Requirements

The reading page should show:
- which engines contributed
- what each engine contributed
- what converged across engines
- what remained in tension
- which routing mode produced the reading

This makes the reading inspectable without collapsing it into raw JSON.

### 9.2 Future Explainability Surfaces

Later versions of the product can deepen trust with:
- engine contribution summaries
- analytics sections
- trust annotations
- compare-over-time evidence

These are future explainability surfaces, not current launch blockers.

## 10. Roadmap

The roadmap should now be sequenced around contract quality first.

### Phase 1: Contract Hardening

Goal:
- make the current workflow payload consistently usable as a real reading

Deliverables:
- clearer workflow `response`
- stronger practical-detail policy
- additive report fields defined
- frontend rendering policy locked

Owner:
- mostly `witness-agents`, with frontend alignment

### Phase 2: Trust And Explainability

Goal:
- make the reading inspectable and trustworthy

Deliverables:
- evidence block
- engine contribution summaries
- reading navigation / TOC
- explicit convergences and frictions

### Phase 3: Reading As Object

Goal:
- make the reading persistent and shareable

Deliverables:
- `reading_id`
- `reading_url`
- permalink route
- share card
- compare mode

### Phase 4: Growth Surface

Goal:
- make Witness usable as an ongoing practice

Deliverables:
- saved reading history
- pattern evolution
- weekly or monthly synthesis
- relationship, work, and growth slices

## 11. Acceptance Criteria

Future implementation should be verified against explicit acceptance criteria rather than only tonal preference.

### 11.1 Frontend Acceptance Criteria

Verify that:
- the website uses workflow `response` as the primary reading text
- dyad voices render separately
- practical detail remains short and secondary
- engine cards show evidence without becoming JSON dumps
- the reading page remains legible when `response === synthesis`

### 11.2 Backend Acceptance Criteria

Verify that:
- new fields are additive and do not break current consumers
- workflow output leads with dominant tension, not system narration
- no user-facing placeholder interpolation survives
- no weak generated summary overwrites stronger witness material

### 11.3 Live Sample Review Criteria

Review at least:
- one biorhythm sample
- one symbolic sample such as panchanga
- one full workflow sample
- one negative-path sample where payload quality is visibly weak

This keeps the product grounded in real output rather than abstract contract optimism.

## 12. Decision Summary

The current decision is:
- keep the dedicated reading-page architecture
- preserve the current backend contract as the live baseline
- evolve the payload additively toward a real reading object
- codify deterministic presentation rules before expanding the feature surface
- treat trust and explainability as the next real product step

That is the correct evolution path because it improves the product without pretending the current backend must be replaced all at once.
