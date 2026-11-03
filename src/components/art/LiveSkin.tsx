"use client";

import { useState } from "react";

/** Real Minecraft skin face, shown on top of the generated pixel face when `liveAvatars` is on. Hides itself if the image fails. */
export function LiveSkin({ name }: { name: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) return null;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`https://mc-heads.net/avatar/${encodeURIComponent(name)}/96`}
      alt=""
      loading="lazy"
      decoding="async"
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className="pixelated absolute inset-0 size-full"
    />
  );
}
