/**
 * The gtag function GA4 installs on window.
 *
 * Declared rather than imported: @next/third-parties injects gtag at runtime
 * and ships no ambient type for it, so a call site has nothing to check
 * against. Optional on purpose — it is genuinely absent whenever
 * NEXT_PUBLIC_GA_ID is unset, which is every local run, so call it as
 * `window.gtag?.(...)` and let the optional chain handle it.
 */
export {};

declare global {
  interface Window {
    gtag?: (
      command: "event" | "config" | "set",
      targetOrName: string,
      params?: Record<string, unknown>,
    ) => void;
  }
}
