# Visual Prompt Bank

Use this file when regenerating the site visuals manually or with Meshy / image tools.

## Global Visual System

- Theme: `Bioluminescent Consciousness`
- Core principle: sacred geometry as data visualization, not decoration.
- Mood: grounded, anatomical, visionary, load-bearing.
- Canvas: `Void Black #070B1D`
- Primary colors:
  - `Witness Violet #2D0050`
  - `Flow Indigo #0B50FB`
  - `Sacred Gold #C5A017`
  - `Coherence Emerald #10B5A7`
  - `Parchment #F0EDE3`
- Materials to favor: bronze, brass, dark wood, amber glass, leather, unglazed ceramic.
- Light behavior: bioluminescent from within, not neon sprayed on top.
- Texture behavior: precise edges, subtle wear, low-noise darkness, clean highlights.
- Composition rule: no baked-in typography unless specifically requested. The page text already carries the language.
- Poster format: vertical `4:5`, target export `1600 x 2000` or higher.
- 3D deliverables: isolated object, PBR-ready, clean silhouette, no environment clutter.

## Negative Prompt

Do not generate:
- generic nebula AI art
- chakra clipart
- vague mystical fog
- purple-on-white startup gradients
- stock cyberpunk HUD overlays
- glossy sci-fi UI with random numbers
- cartoon sacred geometry
- photoreal guru portraits
- cheap metallic chrome without patina
- decorative symbols with no structural logic

## OG Image

### `og-image-main`
- Use: `/og-image.png`
- Alt: `Tryambakam Noesis sigil rendered as nested sacred geometry in Witness Violet and Sacred Gold on Void Black.`
- Prompt: `Create a cinematic 16:9 hero image for Tryambakam Noesis. Central object: a nested sacred-geometry sigil with a compass-point frame and lotus-form core, built like a precision instrument rather than an ornament. Materials: aged brass, bronze edges, subtle amber-glass insets. Lighting: bioluminescent internal glow in Witness Violet and Coherence Emerald, with Sacred Gold tracing the geometry. Background: deep Void Black with almost invisible constellation grain. Style: anatomical, architectural, spiritually serious, not fantasy. The object should feel like a consciousness engine rendered as a ritual instrument. No text.`

## Hero 3D

### `hero-sigil-3d`
- Use: hero `<model-viewer>` replacement or future Meshy refinement.
- Prompt: `Generate a high-detail 3D sigil for Tryambakam Noesis: nested sacred geometry, compass-point outer frame, lotus-form core, concentric rings, precise radial symmetry, brass and bronze construction with subtle wear, amber-glass inserts, deep engraved channels carrying soft bioluminescent Witness Violet and Coherence Emerald light. The object should feel like a ritual-scientific instrument, not jewelry. Clean silhouette, no pedestal, no text, no floating particles, dark neutral studio environment, PBR materials, production-ready topology.`
- Meshy note: request separate roughness and metallic maps if available. Keep the center cavity readable from a frontal camera orbit.

## Witness Characters

### `character-aletheios-3d`
- Use: first-pass Meshy text-to-3D generation for the analytic witness pole.
- Output target: `public/models/characters/aletheios.glb`
- Prompt: `Generate a full-body ceremonial witness character named Aletheios. Tall poised humanoid with a calm faceplate, observatory halo rings, articulated shoulders, and astronomical-instrument detailing. Represents lucid pattern recognition, observer-first intelligence, and truth witness. Materials: aged brass, dark bronze, amber glass, black stone insets. Elegant spare exact silhouette, A-pose for rigging, bioluminescent internal glow in Sacred Gold, Witness Violet, and restrained Coherence Emerald. Serious sacred-technology object, not fantasy armor, not cartoon, no weapon, no text.`
- Texture prompt: `Texture Aletheios as a lucid witness construct. Sacred Gold should define the instrument geometry. Witness Violet and restrained Coherence Emerald should glow from internal channels and sight lines, never as sprayed neon. Surface wear should be subtle and archival, like a ritual-scientific artifact maintained with care. The face should read as attentive and exact, not emotive or cartoonish.`
- Negative prompt: `Not fantasy armor. Not cartoon. No weapon. No floating text. No neon HUD clutter. No horror deformation.`

### `character-pichet-3d`
- Use: first-pass Meshy text-to-3D generation for the embodied witness pole.
- Output target: `public/models/characters/pichet.glb`
- Prompt: `Generate a full-body ceremonial witness character named Pichet. Strong graceful humanoid with thoracic wave architecture, pulse-ring joints, grounded stance, and kinetic geometry suggesting breath moving through structure. Represents embodied intelligence, somatic rhythm, and decisive grounded action. Materials: dark bronze, ceramic black, oxidized gold, translucent emerald-glass channels. Rooted rhythmic silhouette, A-pose for rigging, internal glow in Coherence Emerald and Sacred Gold. Serious sacred-technology object, not militaristic, not monstrous, not cartoon, no weapon, no text.`
- Texture prompt: `Texture Pichet as an embodied witness construct. Coherence Emerald and Sacred Gold should carry the rhythm through pulse channels, chest cavities, and joint lines. Keep the surface grounded and material, with subtle patina and no plastic shine. The face and torso should suggest breath, gravity, and action without becoming a literal anatomical body.`
- Negative prompt: `Not militaristic. Not monstrous. Not cartoon. No weapon. No floating text. No neon HUD clutter. No horror deformation.`

## Hero Background

### `hero-bg-still`
- Use: still fallback and poster for the embedded hero background video.
- Output target: `public/images/hero/hero-bg-fal-v1-still.png`
- Prompt: `Create a dramatic 16:9 hero background still for Tryambakam Noesis. The nested sigil should dissolve into a larger abstract consciousness field: violet and indigo depth planes, gold filaments, emerald pulse-lines, soft atmospheric grain, slow-cinema composition, a feeling of sacred technology waking up behind the interface. Keep it abstract enough to sit behind copy, but structurally coherent and serious.`
- Recommended mode: FAL text-to-image at `16:9`. The image-to-image path preserves the square source aspect ratio too aggressively for hero use.

### `hero-bg-video-abstract`
- Use: embedded looping hero atmosphere.
- Output target: `public/videos/hero-bg-fal-v1-loop.mp4`
- Prompt: `Animate this image into a slow abstract hero background. Gentle orbital drift, deep parallax, bioluminescent filaments breathing through the geometry, ceremonial atmosphere, no hard cuts, no sudden flashes, no characters, no typography, elegant dramatic motion suitable for a looping website background.`
- Recommended mode: FAL image-to-video using the generated `hero-bg-still` asset as the start frame.
- Delivery notes:
  - `16:9`
  - `720p`
  - `5s` source clip, then create a forward-reverse loop for smoother embed playback
  - `generate_audio: false`

## Engine Posters

### `engine-01-sacred-geometry`
- Asset: `public/images/engines/9A-15-sacred-geometry-poster-v2.png`
- Section use: `What you carry but cannot name.`
- Prompt: `Vertical poster showing sacred geometry as structural cognition: nested circles, radial grid, and subtle body-like proportions emerging from a Void Black field. Witness Violet and Flow Indigo form the deep structure; Sacred Gold reveals key intersections. The image should feel like an anatomical map for unnamed meaning, precise and reverent, no text.`
- Future alt if migrated to `<img>`: `Nested sacred geometry rendered as a bioluminescent structural map on a dark field.`

### `engine-02-sigil-forge`
- Asset: `public/images/engines/9A-16-sigil-forge-poster-v2.png`
- Section use: `In the gap between signal and self.`
- Prompt: `Vertical poster of a sigil being forged from signal into form. Show a half-formed geometric emblem suspended above a dark ceramic plane, with brass filaments, indigo voltage, and emerald current crossing through it. The visual should imply translation from calculation into embodiment. No text, no fantasy smoke.`
- Meshy extension: strong candidate for a standalone 3D object with layered metallic rings and glowing channels.

### `engine-03-tarot`
- Asset: `public/images/engines/9A-11-tarot-poster-v2.png`
- Section use: `The witness sits like a third register between.`
- Prompt: `Vertical tarot-adjacent poster without literal card borders. Create an anatomical-symbolic composition where a central witnessing axis sits between two mirrored forces. Use surgical precision, subtle occult geometry, Sacred Gold highlights, and deep indigo shadows. It should feel like a divination system translated into structural cognition, not fortune-telling kitsch.`
- Future alt if migrated to `<img>`: `Symbolic anatomical composition showing a central witnessing axis between mirrored forces.`

### `engine-04-panchanga`
- Asset: `public/images/engines/9A-01-panchanga-poster-v2.png`
- Section use: `Names: Aletheios.`
- Prompt: `Vertical poster for Panchanga as analytic sky architecture. Render an astronomical instrument made of concentric brass rings, calendrical markers, angular divisions, and fine etched geometry. The feeling is observer-first: lucid, exact, and unsentimental. Sacred Gold should lead, with violet-black depth and minimal emerald accents.`
- Future alt if migrated to `<img>`: `Astronomical ring instrument rendered as a brass-and-violet analytic calendar.`

### `engine-05-biorhythm`
- Asset: `public/images/engines/9A-07-biorhythm-poster-v2.png`
- Section use: `And Pichet, the form below.`
- Prompt: `Vertical poster translating biorhythm into embodied wave architecture. Use layered sinusoidal bands, pulse rings, and subtle thoracic or breath-like cadence without literal anatomy. Emerald and gold should carry the rhythm; indigo should hold the field. The image should feel like the body already knows before language catches up.`
- Future alt if migrated to `<img>`: `Layered pulse waves and rings rendered as an embodied rhythm field.`

### `engine-06-numerology`
- Asset: `public/images/engines/9A-14-numerology-poster-v2.png`
- Section use: `Engines calculate. Witnesses interpret.`
- Prompt: `Vertical poster for numerology as structural arithmetic rather than lifestyle mysticism. Show integer lattices, radial divisions, glyph-like number forms, and Clifford-style geometric tension inside a dark field. Gold marks the counts, violet and indigo hold the deeper architecture. The image should feel computational, ancient, and exact.`
- Future alt if migrated to `<img>`: `Geometric number lattice rendered as a gold-and-violet calculation field.`

### `engine-07-human-design`
- Asset: `public/images/engines/9A-04-human-design-poster-v2.png`
- Section use: `See through the bodygraph.`
- Prompt: `Vertical poster reinterpreting Human Design as a pressure map, not a branding diagram. Use a central body-like silhouette built from nodes, channels, gates, and directional force vectors. Sacred Gold and Emerald should indicate live pressure points, while indigo and violet hold the background lattice. No labels, no stock bodygraph replica.`
- Future alt if migrated to `<img>`: `Abstract bodygraph-style pressure map with linked nodes and channels.`

### `engine-08-i-ching`
- Asset: `public/images/engines/9A-12-i-ching-poster-v2.png`
- Section use: `And the I Ching's sixty-four thresholds.`
- Prompt: `Vertical poster for I Ching as situational geometry. Use hexagram bars arranged in a disciplined lattice, with some sets illuminated as if thresholds are becoming active. The frame should feel old, mathematical, and alive. Avoid fortune-cookie aesthetics. Use gold, indigo, and restrained emerald over Void Black.`
- Future alt if migrated to `<img>`: `Hexagram lattice rendered as a structured threshold map on a dark field.`

### `engine-09-enneagram`
- Asset: `public/images/engines/9A-13-enneagram-poster-v2.png`
- Section use: `And the enneagram's nine fixations.`
- Prompt: `Vertical poster for enneagram as fixation architecture. Nine-point geometry sits inside a contained field with angular stress lines, directional loops, and subtle orbit paths. The image should imply recursive selection and behavioral gravity, not coaching diagrams. Sacred Gold carries the primary structure with violet-black depth.`
- Future alt if migrated to `<img>`: `Nine-point geometric diagram with angular force lines and orbital paths.`

### `engine-10-gene-keys`
- Asset: `public/images/engines/9A-05-gene-keys-poster-v2.png`
- Section use: `And the gene keys.`
- Prompt: `Vertical poster for Gene Keys as codon compression. Show a 64-fold living lattice that feels genetic, floral, and computational at once: branching symmetry, membrane-like layers, and luminous centers. Keep it serious and anatomical. Emerald and indigo can soften the structure, but gold should still define the logic.`
- Future alt if migrated to `<img>`: `Luminous codon-like lattice blending genetic and geometric structures.`

### `engine-11-nadabrahman`
- Asset: `public/images/engines/9A-09-nadabrahman-poster-v2.png`
- Section use: `Success is your decreasing need for us.`
- Prompt: `Vertical poster for Nada Brahman as resonant dissolution. Create a sound-derived mandala with concentric waveform rings, harmonic interference patterns, and a center that feels like it is resolving rather than accumulating. The image should feel like structure becoming unnecessary through coherence. Emerald resonance, gold harmonics, violet void.`
- Meshy extension: strong candidate for a thin layered 3D disc or wave mandala with emissive channels.
- Future alt if migrated to `<img>`: `Resonant waveform mandala resolving into a luminous center.`

### `engine-12-vedic-clock`
- Asset: `public/images/engines/9A-08-vedic-clock-poster-v2.png`
- Section use: `Edges of the tapestry.`
- Prompt: `Vertical poster for Vedic Clock as circadian cosmology. Use a clock face, zodiacal segmentation, and diurnal energy arcs rendered as a precise instrument. The object should feel like time made inspectable. Gold markings, indigo night depth, and minimal emerald activation cues.`
- Future alt if migrated to `<img>`: `Circadian clock instrument with zodiac-like divisions and luminous energy arcs.`

### `engine-13-vimshottari-dasha`
- Asset: `public/images/engines/9A-02-vimshottari-dasha-poster-v2.png`
- Section use: `Time has long cycles.`
- Prompt: `Vertical poster for Vimshottari Dasha as long-arc planetary weather. Show concentric timelines, long orbital tracks, segmented durations, and a sense of decades unfolding through clean geometry. The image should feel measured and fated without becoming theatrical. Use gold for timelines, indigo for depth, and restrained emerald pulse points.`
- Future alt if migrated to `<img>`: `Long-arc orbital timeline rendered as a layered planetary schedule.`

### `engine-14-transits`
- Asset: `public/images/engines/9A-03-transits-poster-v2.png`
- Section use: `And short turns, ticking daily.`
- Prompt: `Vertical poster for transits as near-field motion over a stable chart. Create moving vectors, crossing arcs, and brighter active nodes flowing over a quieter foundational geometry. The poster should feel like weather patterns moving through an existing system. Clean, exact, no astrology-app gradients.`
- Future alt if migrated to `<img>`: `Moving arcs and active nodes crossing a stable geometric chart.`

### `engine-15-biofield`
- Asset: `public/images/engines/9A-06-biofield-poster-v2.png`
- Section use: `Signed in the field.`
- Prompt: `Vertical poster for biofield as measurable subtle anatomy. Use toroidal field lines, nadi-like current paths, and layered energy shells around an implied body axis. The visual should feel biological, electromagnetic, and inspectable, not vague energy art. Emerald and gold should feel like measured signal, not decorative aura.`
- Meshy extension: strong candidate for a translucent torus or field sculpture around a central axis.
- Future alt if migrated to `<img>`: `Toroidal field lines and current paths rendered around an implied body axis.`

### `engine-16-face-reading`
- Asset: `public/images/engines/9A-10-face-reading-poster-v2.png`
- Section use: `And on the face.`
- Prompt: `Vertical poster for face reading as physiognomic mapping. Use a face-like relief or contour field with meridian lines, topographic ridges, and analytic landmarks. Avoid surveillance aesthetics and avoid photoreal portraiture. The result should feel like surface structure becoming legible, with gold tracings over a dark indigo-violet ground.`
- Future alt if migrated to `<img>`: `Face-like contour map with meridian lines and structural landmarks.`

## Optional Decorative Replacements

### `optional-constellation-field`
- Use: section 17 tapestry atmosphere.
- Prompt: `Sparse constellation field built from nine luminous nodes and subtle filaments, arranged with mathematical restraint on a deep black-violet background. More observatory than galaxy wallpaper.`

### `optional-threshold-ouroboros`
- Use: section 18 closing ornament.
- Prompt: `Minimal ouroboros ring rendered as a precision brass linework object with faint internal glow, symbolic but not ornate, closing the page like a seal rather than a logo.`
