# Interactive 3D Narrative System Spec

## Intent

The next 3D layer for this landing page should not behave like a gallery of isolated models.

It should behave like a `narrative instrument system`:

- scroll advances the reading
- pointer input perturbs the active geometry
- copy and object state change together
- each object spatializes the specific engine logic of its section

The target is not “add 3D.” The target is:

`poster -> instrument -> narrative state machine`

## What The Current Site Already Gives Us

The current landing page already has the right motion foundation:

- `js/main.js`
  - central boot file
  - GSAP + ScrollTrigger orchestration
  - section-by-section initialization
- `js/effects/effect-1.js`
  - scroll-driven reveal logic for the engine poster system
- `js/sections-special/hero.js`
  - existing `model-viewer` lifecycle and reduced-motion gating
- `js/sections-special/why.js`
  - pointer-reactive localized gradients
- `js/sections-special/tapestry.js`
  - cursor-proximity field behavior and stateful ambient interaction
- `js/sections-special/magnetic.js`
  - lightweight pointer easing pattern

This means the 3D system should be added as a continuation of the current reveal architecture, not as a separate animation stack with unrelated interaction rules.

## Governing Rule

Each object must answer four questions before it is generated or embedded:

1. What computation or witness function does this object spatialize?
2. What section of the narrative does it belong to?
3. What changes when the user scrolls deeper into that section?
4. What small part of the object is allowed to respond to the pointer?

If those four answers are not clear, the model is still decorative.

## Experience Model

The 3D system should run on three interaction layers.

### 1. Scroll Layer

Scroll is the primary narrator.

It should control:

- object reveal
- object alignment
- internal ring rotation
- waveform activation
- emissive intensity
- section-to-section handoff

Scroll should never fully orbit the object. It should transition the object through a sequence of authored states.

### 2. Pointer Layer

Pointer is a secondary perturbation layer.

It should control:

- subtle orbit bias
- local highlight drift
- waveform phase offset
- near-field node activation
- depth/parallax cueing

Pointer should not be used as a freeform toy camera. That would break the reading cadence and make the landing page feel like a product configurator.

### 3. Copy-Coupling Layer

The text and object should change in lockstep.

Example:

- headline enters -> silhouette locks into the clearest canonical state
- body copy reaches focus zone -> hidden geometry or inner channels activate
- exit to next section -> current object de-energizes while the next one precharges

This is the core difference between “3D illustration” and “narrative engine.”

## Interaction Grammar

Every 3D section should use the same five-state narrative timeline.

### State 1: Dormant

- section below fold or not yet active
- object is dim, low-motion, partially unresolved
- only ambient drift is allowed

### State 2: Enter

- section crosses trigger threshold
- object assembles into recognizable silhouette
- one dominant motion comes online

### State 3: Lock

- headline is readable and central
- object settles into its clearest identity
- pointer interactivity becomes available

### State 4: Deepen

- body copy becomes the reading focus
- internal mechanisms activate
- emissive paths, rings, wavebands, or node-links reveal the actual engine logic

### State 5: Handoff

- object quiets or partially opens
- energy transfers toward the next section
- next section’s object can begin preloading or precharging

## Object Families

The witnessOS references point toward `2.5D living instruments`, not sculptural beings.

That means the active object classes should stay inside a small vocabulary:

- radial observatories
- toroidal coherence fields
- resonance discs
- breath chambers
- node-link plates
- ring-assembly forges

These are the correct poles for the phase-one sections.

## Phase-One Narrative Mapping

### Hero Sigil

Role:
- establishes that geometry is alive before the engine sequence begins

Scroll behavior:
- low-amplitude rotation and exposure shift
- subtle scale/field response during hero exit

Pointer behavior:
- limited orbit bias
- glow center follows pointer slightly

Copy sync:
- title reveal brightens the central aperture
- credibility/stats settle after the sigil stabilizes

### 02 Sigil Forge

Object class:
- ring assembly forge

Narrative job:
- spatialize the gap between signal and self

Scroll behavior:
- outer rings begin misregistered
- scroll progressively aligns offsets
- seams ignite as translation becomes possible

Pointer behavior:
- offsets one outer ring or highlight band
- never breaks overall alignment

Copy sync:
- `In the gap between` should correspond to incomplete alignment
- `signal and self` should land once the structure resolves

### 04 Aletheios

Object class:
- compass-mandala observatory instrument

Narrative job:
- spatialize naming, calibration, and witness precision

Scroll behavior:
- cardinal axes rotate into calibration
- inner dial resolves from blur to precise ringwork
- a central witness aperture sharpens during the body copy

Pointer behavior:
- slight azimuth drift
- local highlight follows pointer across etched brass ridges

Copy sync:
- `Names:` should coincide with axis lock
- `Aletheios` should appear once the object reaches maximal precision

### 05 Pichet

Object class:
- breath chamber dial / coherence gate

Narrative job:
- spatialize embodied carriage, rhythm, and soma-entry

Scroll behavior:
- waveform bands expand and contract in a breath cadence
- central chamber opens as the section deepens
- coherence rings stabilize near section exit

Pointer behavior:
- shifts phase or amplitude slightly
- nudges the visible pressure map instead of moving the whole form

Copy sync:
- `holds the form` should arrive when the waveform settles into containment

### 11 Nada Brahman

Object class:
- resonance mandala disc

Narrative job:
- spatialize attunement without dependency

Scroll behavior:
- harmonic rings oscillate, then reduce toward simplicity
- visual complexity decreases as the anti-dependency message lands

Pointer behavior:
- activates local resonance flares
- should feel like touching a tuned plate, not steering an object

Copy sync:
- `needing us less` should coincide with the object simplifying rather than intensifying

### 15 Biofield

Object class:
- coherence torus / field ring

Narrative job:
- spatialize field integrity and near-body coherence

Scroll behavior:
- torus begins noisy or weak
- scroll gradually stabilizes the field
- inner banding becomes more ordered as the copy deepens

Pointer behavior:
- creates local perturbation on the torus surface
- field returns to coherence when pointer leaves

Copy sync:
- the section should visually move from disturbance to coherence, not the reverse

## Content Coupling Rules

The object cannot just sit beside the text. It has to react to the text hierarchy.

Minimum coupling rules:

- heading reveal controls silhouette clarity
- body-copy midpoint controls inner-structure reveal
- meta label controls one low-level state cue such as ring count, scanline, or pulse frequency
- CTA proximity can precharge the next interactive state

This is especially important for sections using the existing `type__expand` image pattern. The replacement has to preserve the current drama of “word opens into form,” not flatten it.

## Recommended Technical Architecture

### Shared Controller

Create one shared interaction controller responsible for:

- tracking active section
- mapping scroll progress to object state
- normalizing pointer coordinates
- respecting reduced motion
- pausing inactive objects

This should be a single system, not one-off bespoke scripts per object.

### Section Presets

Each section should define a preset object state map:

- initial camera
- enter state
- lock state
- deepen state
- handoff state
- pointer response type

That keeps the motion logic shared while letting each engine express different geometry.

### Integration Points

Likely implementation touchpoints:

- `js/main.js`
  - boot the shared narrative-object controller
- `js/effects/effect-*.js`
  - expose section progress hooks or share ScrollTrigger progress
- `js/sections-special/hero.js`
  - extend current `model-viewer` handling pattern
- a new module, likely something like:
  - `js/sections-special/narrativeObjects.js`
  - or `js/lib/narrative-3d-controller.js`

## Delivery Strategy

Do not put all models live at once.

Rollout should be:

1. keep the current poster flow intact
2. swap one section at a time into the new interactive object pattern
3. validate performance and narrative fit
4. expand only after the interaction grammar feels coherent

Best first implementation order:

1. `02 Sigil Forge`
2. `04 Aletheios`
3. `05 Pichet`
4. `11 Nada Brahman`
5. `15 Biofield`

This sequence starts with the clearest geometry-language sections before the more subtle field behaviors.

## Performance Rules

- only one high-fidelity object should be truly active at a time
- inactive sections should degrade to poster, still frame, or paused model
- reduced motion must preserve meaning without motion dependence
- mobile should prefer constrained interaction over free orbit
- object motion should never make the page feel heavier than the current reveal system

If a model needs constant camera motion to feel alive, the model is not ready.

## Reduced-Motion Contract

When reduced motion is enabled:

- no continuous autorotation
- no pointer-reactive orbit
- no rapid emissive pulsing
- reveal through opacity, exposure, and simple state changes only

The page should still communicate the engine’s structural logic in a static or near-static way.

## What To Avoid

- humanoid figures
- free-orbit toy interactions
- generic floating holograms
- unrelated sci-fi UI garnish
- one motion style per section with no shared grammar
- replacing strong posters before the object is clearly better

## Product Standard

The final standard is simple:

The user should feel that the geometry is reading with them.

If the object only decorates the section, it failed.
If scroll, pointer, and copy together make the object behave like an instrument of that section’s meaning, it is working.
