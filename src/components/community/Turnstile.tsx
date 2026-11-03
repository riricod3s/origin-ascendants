"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    turnstile?: {
      render: (element: HTMLElement, options: { sitekey: string; callback: (token: string) => void; "expired-callback": () => void; "error-callback": () => void; theme: "dark" }) => string;
      remove: (widgetId: string) => void;
    };
  }
}

export function Turnstile({ onToken }: { onToken: (token: string) => void }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  useEffect(() => {
    if (!ready || !siteKey || !hostRef.current || !window.turnstile) return;
    const widget = window.turnstile.render(hostRef.current, {
      sitekey: siteKey,
      theme: "dark",
      callback: onToken,
      "expired-callback": () => onToken(""),
      "error-callback": () => onToken(""),
    });
    return () => window.turnstile?.remove(widget);
  }, [ready, siteKey, onToken]);

  if (!siteKey) {
    return <p role="status" className="rounded-xl border border-solar/20 bg-solar/5 p-3 text-sm text-solar">Registration CAPTCHA is not configured.</p>;
  }

  return (
    <>
      <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit" strategy="afterInteractive" onReady={() => setReady(true)} />
      <div ref={hostRef} className="min-h-[65px]" />
    </>
  );
}
