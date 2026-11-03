/** Attribute the loading screen sets on <html> once the intro has finished; CSS entrances (`.enter`) wait for it. */
export const SITE_READY_ATTR = "data-site-ready";

export function markSiteReady() {
  document.documentElement.setAttribute(SITE_READY_ATTR, "true");
}
