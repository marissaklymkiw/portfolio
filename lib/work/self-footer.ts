/**
 * Routes that render their own footer, so the shared site footer stands down.
 *
 * This used to be a CSS hide in globals.css:
 *
 *   body:has(.no-media-radius) footer#contact { display: none !important }
 *
 * which left the shared <footer id="contact"> in the DOM, merely invisible. Two
 * consequences, both bugs:
 *
 *   1. The header's CONTACT button targets #contact. The anchor resolved to the
 *      hidden footer, so clicking the site's one persistent call to action did
 *      nothing at all. Measured: scrollY unchanged.
 *   2. A page rendering its own footer could not also claim id="contact"
 *      without putting a duplicate id in the document.
 *
 * Not rendering it fixes both, and drops an !important override on the way out.
 * Add a route here when it renders its own footer, and give that footer
 * id="contact" so the header CTA keeps working.
 */
export const SELF_FOOTER_ROUTES: ReadonlySet<string> = new Set([
  "/work/device-registration",
]);
