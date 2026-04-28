/*
 * gsapSetup.js — register plugins + define CustomEases
 * DESIGN.md §6 motion vocabulary.
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';
import { CustomEase } from 'gsap/CustomEase';

gsap.registerPlugin(ScrollTrigger, Flip, CustomEase);

// Inhale-hold-exhale (4:7:8 ratio) — for breath-synced loops
CustomEase.create('breath478',
  'M0,0 C0.05,0 0.16,0.21 0.21,0.21 0.32,0.21 0.5,0.58 0.58,0.58 0.74,0.58 0.92,1 1,1');

// Slow start → mid acceleration → long settle. Replaces all linear/easeInOut.
CustomEase.create('growth',
  'M0,0 C0,0 0.2,0 0.6,0.5 0.85,0.95 1,1 1,1');

// Ouroboros — closes by reversing midpoint
CustomEase.create('ouroborosLoop',
  'M0,0 C0.4,0 0.5,0.5 0.5,0.5 0.5,0.5 0.6,1 1,1');

export { gsap, ScrollTrigger, Flip, CustomEase };
