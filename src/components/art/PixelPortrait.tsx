import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { mixHex } from "@/lib/svg";
import type { PortraitSpec } from "@/types/content";

const GOLD = "#FBBF24";
const INK = "#0b1020";

function Antlers() {
  return (
    <g fill="none" stroke="#d9bd8f" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M62 46L54 22M57 32L43 28M54 22L50 8M54 22L62 12" />
      <path d="M98 46L106 22M103 32L117 28M106 22L110 8M106 22L98 12" />
    </g>
  );
}

function Crown() {
  return (
    <g>
      <path d="M52 48L47 20L64 33L80 13L96 33L113 20L108 48Z" fill={GOLD} />
      <path d="M80 13L96 33L113 20L108 48H80Z" fill={INK} opacity="0.14" />
      <rect x="52" y="42" width="56" height="7" rx="2" fill="#f59e0b" />
      <circle cx="80" cy="33" r="3.6" fill="#38BDF8" />
      <circle cx="62" cy="45" r="2.2" fill="#fff" opacity="0.8" />
      <circle cx="98" cy="45" r="2.2" fill="#fff" opacity="0.8" />
    </g>
  );
}

function Circlet() {
  return (
    <g>
      <path d="M47 66Q80 52 113 66" fill="none" stroke={GOLD} strokeWidth="3.6" strokeLinecap="round" />
      <path d="M80 50L86 59L80 68L74 59Z" fill="#38BDF8" />
      <path d="M80 50L86 59L80 59Z" fill={INK} opacity="0.18" />
    </g>
  );
}

function Goggles() {
  return (
    <g>
      <rect x="43" y="58" width="74" height="7" rx="3.5" fill="#7c5a3c" />
      {[63, 97].map((x) => (
        <g key={x}>
          <circle cx={x} cy="54" r="12.5" fill={GOLD} />
          <circle cx={x} cy="54" r="9" fill="#38BDF8" />
          <circle cx={x} cy="54" r="9" fill={INK} opacity="0.12" />
          <path d={`M${x - 5} 50a6 6 0 0 1 6-3`} fill="none" stroke="#fff" strokeOpacity="0.75" strokeWidth="2" strokeLinecap="round" />
        </g>
      ))}
    </g>
  );
}

function Eyepatch() {
  return (
    <g>
      <path d="M46 62L114 92" stroke="#1e293b" strokeWidth="3.2" strokeLinecap="round" />
      <ellipse cx="65" cy="81" rx="10" ry="9" fill="#1e293b" />
    </g>
  );
}

export function PixelPortrait({ spec, className }: { spec: PortraitSpec; className?: string }) {
  const { skin, hair, eyes, outfit, hairStyle, accessory } = spec;
  const skinShade = mixHex(skin, "#000000", 0.14);
  const hairShade = mixHex(hair, "#000000", 0.2);
  const hairLight = mixHex(hair, "#ffffff", 0.22);
  const outfitDark = mixHex(outfit, "#000000", 0.28);
  const outfitLight = mixHex(outfit, "#ffffff", 0.3);
  const trim = mixHex(outfit, "#ffffff", 0.45);

  const fringe = "M44 74Q43 34 80 31Q117 34 116 74Q108 54 92 50Q80 62 68 50Q52 54 44 74Z";

  let backHair: ReactNode = null;
  let frontHair: ReactNode = null;
  let overShoulder: ReactNode = null;

  switch (hairStyle) {
    case "short":
      frontHair = <path d={fringe} fill={hair} />;
      break;
    case "long":
      backHair = <path d="M38 60Q36 28 80 26Q124 28 122 60V154Q122 160 114 160H46Q38 160 38 154Z" fill={hairShade} />;
      frontHair = (
        <>
          <path d={fringe} fill={hair} />
          <path d="M44 74V138Q44 148 52 148V84Z" fill={hair} />
          <path d="M116 74V138Q116 148 108 148V84Z" fill={hair} />
        </>
      );
      break;
    case "braided":
      backHair = <path d="M42 62Q40 30 80 28Q120 30 118 62V104H42Z" fill={hairShade} />;
      frontHair = <path d={fringe} fill={hair} />;
      overShoulder = (
        <g>
          {[116, 128, 140, 152, 164].map((y, i) => (
            <ellipse key={y} cx={i % 2 ? 123 : 119} cy={y} rx="8" ry="8" fill={i % 2 ? hairShade : hair} />
          ))}
          <rect x="114" y="170" width="16" height="6" rx="3" fill={GOLD} />
        </g>
      );
      break;
    case "bald":
      frontHair = <ellipse cx="68" cy="52" rx="14" ry="6" fill="#fff" opacity="0.16" />;
      break;
    case "hooded":
      backHair = <path d="M30 156C22 92 36 26 80 22C124 26 138 92 130 156Z" fill={outfitDark} />;
      frontHair = (
        <>
          <path d="M38 98C34 42 56 26 80 26C104 26 126 42 122 98C116 72 104 56 80 55C56 56 44 72 38 98Z" fill={outfit} />
          <path d="M44 84C46 62 58 56 80 55C102 56 114 62 116 84C108 68 98 62 80 62C62 62 52 68 44 84Z" fill={INK} opacity="0.2" />
          <path d="M38 98C34 42 56 26 80 26C104 26 126 42 122 98" fill="none" stroke={trim} strokeOpacity="0.5" strokeWidth="2" />
        </>
      );
      break;
    case "spiky":
      frontHair = <path d="M45 66L49 30L60 50L66 20L76 48L84 16L92 48L102 22L106 52L115 30L115 68Q104 52 80 51Q58 52 45 66Z" fill={hair} />;
      break;
    case "curly":
      frontHair = (
        <g fill={hair}>
          {(
            [
              [50, 62, 11],
              [56, 44, 12],
              [72, 36, 12],
              [90, 36, 12],
              [106, 44, 12],
              [112, 62, 11],
              [46, 80, 8],
              [114, 80, 8],
            ] as const
          ).map(([x, y, r], i) => (
            <circle key={i} cx={x} cy={y} r={r} />
          ))}
          <circle cx="68" cy="40" r="5" fill={hairLight} opacity="0.5" />
        </g>
      );
      break;
  }

  return (
    <svg viewBox="0 0 160 200" aria-hidden="true" focusable="false" className={cn("block", className)}>
      {backHair}

      <path d="M8 200C8 160 40 148 80 148C120 148 152 160 152 200Z" fill={outfit} />
      <path d="M80 148C120 148 152 160 152 200H80Z" fill={INK} opacity="0.16" />
      <path d="M8 200C8 176 18 162 34 154L44 200Z" fill={outfitLight} opacity="0.35" />
      <rect x="68" y="112" width="24" height="42" fill={skinShade} />
      <path d="M62 148L80 174L98 148Z" fill={skinShade} />
      <path d="M58 148L80 178L102 148" fill="none" stroke={trim} strokeWidth="3.4" strokeLinejoin="round" strokeLinecap="round" />

      {accessory === "scarf" && (
        <g>
          <path d="M52 140Q80 160 108 140L112 156Q80 176 48 156Z" fill={outfitLight} />
          <path d="M96 152L110 194L94 190Z" fill={outfitLight} />
          <path d="M96 152L110 194L102 192Z" fill={INK} opacity="0.16" />
        </g>
      )}

      <rect x="41" y="74" width="7" height="18" rx="3.5" fill={skin} />
      <rect x="112" y="74" width="7" height="18" rx="3.5" fill={skin} />
      <rect x="46" y="40" width="68" height="84" rx="20" fill={skin} />
      <path d="M80 40H94Q114 40 114 60V104Q114 124 94 124H80Z" fill={INK} opacity="0.07" />

      <g>
        <rect x="56" y="68" width="20" height="4.5" rx="2.2" fill={hairShade} />
        <rect x="84" y="68" width="20" height="4.5" rx="2.2" fill={hairShade} />
        {[58, 88].map((x) => (
          <g key={x}>
            <rect x={x} y="76" width="14" height="11" rx="3.5" fill="#fff" />
            <rect x={x + 3} y="76" width="8" height="11" rx="2.5" fill={eyes} />
            <rect x={x + 5} y="79" width="4" height="5" rx="1.5" fill={INK} />
            <rect x={x + 3.4} y="77.4" width="2.4" height="2.4" rx="1.2" fill="#fff" opacity="0.9" />
          </g>
        ))}
        <path d="M80 86V98H76" fill="none" stroke={skinShade} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M70 106Q80 113 90 106" fill="none" stroke="#a24a4a" strokeWidth="2.8" strokeLinecap="round" />
        <circle cx="62" cy="99" r="6" fill="#fb7185" opacity="0.18" />
        <circle cx="98" cy="99" r="6" fill="#fb7185" opacity="0.18" />
      </g>

      {frontHair}
      {overShoulder}
      {accessory === "headband" && (
        <g>
          <path d="M45 66Q80 54 115 66V75Q80 63 45 75Z" fill={outfitLight} />
          <path d="M45 66Q80 54 115 66V69Q80 57 45 69Z" fill="#fff" opacity="0.25" />
          <path d="M112 68L128 60L124 78Z" fill={outfitLight} />
        </g>
      )}
      {accessory === "crown" && <Crown />}
      {accessory === "circlet" && <Circlet />}
      {accessory === "goggles" && <Goggles />}
      {accessory === "antlers" && <Antlers />}
      {accessory === "eyepatch" && <Eyepatch />}
    </svg>
  );
}
