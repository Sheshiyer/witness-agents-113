/*
 * analytics.js — privacy-first analytics stub
 * Off by default. Enable by setting window.__TN_ANALYTICS__ = true before main.js loads,
 * or by injecting a Cloudflare Web Analytics beacon in index.html.
 */

export const track = (event, props = {}) => {
  if (!window.__TN_ANALYTICS__) return;
  // Cloudflare Web Analytics injects automatically via script tag — this is just for custom events.
  if (window.cfBeacon?.track) {
    window.cfBeacon.track(event, props);
  }
};
