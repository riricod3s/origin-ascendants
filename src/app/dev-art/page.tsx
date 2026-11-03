import { Airship } from "@/components/art/Airship";
import { Banner, EmblemMark, Flag } from "@/components/art/FlagArt";
import { FloatingIsland, type IslandVariant } from "@/components/art/FloatingIsland";
import { HeroScene } from "@/components/art/HeroScene";
import { PixelAvatar } from "@/components/art/PixelAvatar";
import { PixelPortrait } from "@/components/art/PixelPortrait";
import { SceneArt } from "@/components/art/SceneArt";
import type {
  FlagEmblem,
  FlagPattern,
  PortraitAccessory,
  PortraitHair,
  PortraitSpec,
  SceneKind,
} from "@/types/content";

const SCENES: SceneKind[] = ["isles", "skycity", "ruins", "forest", "crystal", "airships", "mountains", "harbor", "forge", "festival", "observatory", "citadel"];
const ISLANDS: IslandVariant[] = ["meadow", "forest", "ruins", "crystal", "castle", "village", "temple", "observatory"];
const PATTERNS: FlagPattern[] = ["horizontal", "vertical", "cross", "diagonal", "chevron", "quartered", "sunburst"];
const EMBLEMS: FlagEmblem[] = ["sun", "wave", "anvil", "tree", "moon", "peak", "star", "crown", "wing", "tower"];
const HAIRS: PortraitHair[] = ["short", "long", "braided", "bald", "hooded", "spiky", "curly"];
const ACCS: PortraitAccessory[] = ["none", "crown", "circlet", "goggles", "headband", "antlers", "eyepatch", "scarf"];
const NAMES = ["Aurelia_Vale", "StormWarden", "MossyBoots", "Kaelith", "emberfox", "TideRunner", "Nyxie", "BrightHollow", "ToastedCloud", "PeakWalker", "LunarSage", "Ironquill"];

const PALETTE = [
  ["#38BDF8", "#0F172A", "#FBBF24"],
  ["#4ADE80", "#14532d", "#FDE68A"],
  ["#F97316", "#7c2d12", "#FFEDD5"],
  ["#A78BFA", "#312e81", "#FBBF24"],
  ["#FBBF24", "#78350f", "#FFFFFF"],
] as const;

const portraitSpec = (i: number, hairStyle: PortraitHair, accessory: PortraitAccessory): PortraitSpec => ({
  skin: ["#f1c9a5", "#c98e68", "#7a4a34", "#e0ac84"][i % 4],
  hair: ["#3b2a20", "#b8793f", "#222a3a", "#e3b95b", "#5b3a8a"][i % 5],
  eyes: ["#38BDF8", "#4ADE80", "#7c4a2a", "#A78BFA"][i % 4],
  outfit: ["#2563eb", "#7c3aed", "#0d9488", "#d97706", "#be123c", "#475569"][i % 6],
  hairStyle,
  accessory,
});

export default function DevArtPage() {
  return (
    <div className="bg-void text-white">
      <section id="hero" className="relative isolate h-[max(100svh,780px)] overflow-hidden">
        <HeroScene />
        <div className="absolute inset-x-0 top-[22%] z-10 text-center">
          <p className="font-display text-5xl font-bold tracking-widest sm:text-7xl">ORIGIN ASCENDANTS</p>
          <p className="mt-4 text-lg text-mist">Forge your destiny. Rise through the Origins. Become a legend.</p>
        </div>
      </section>

      <section id="scenes" className="container-x py-12">
        <h2 className="mb-6 font-display text-2xl">Scenes</h2>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {SCENES.map((kind, i) => (
            <figure key={kind}>
              <div className="aspect-[16/10] overflow-hidden rounded-2xl">
                <SceneArt kind={kind} seed={i + 1} />
              </div>
              <figcaption className="mt-1 text-sm text-mist">{kind}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section id="islands" className="container-x py-12">
        <h2 className="mb-6 font-display text-2xl">Islands + airship</h2>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {ISLANDS.map((variant, i) => (
            <figure key={variant} className="pt-4">
              <FloatingIsland variant={variant} seed={i + 2} waterfall={variant === "forest" || variant === "castle"} className="w-full" />
              <figcaption className="text-center text-sm text-mist">{variant}</figcaption>
            </figure>
          ))}
          <figure>
            <Airship className="w-full" />
            <figcaption className="text-center text-sm text-mist">airship</figcaption>
          </figure>
        </div>
      </section>

      <section id="flags" className="container-x py-12">
        <h2 className="mb-6 font-display text-2xl">Flags and banners (pattern x palette)</h2>
        <div className="grid grid-cols-3 items-end gap-6 md:grid-cols-7">
          {PATTERNS.map((pattern, i) => (
            <div key={pattern} className="space-y-3">
              <Flag spec={{ pattern, colors: [...PALETTE[i % PALETTE.length]], emblem: EMBLEMS[i] }} className="w-full" />
              <Banner spec={{ pattern, colors: [...PALETTE[(i + 2) % PALETTE.length]], emblem: EMBLEMS[(i + 3) % EMBLEMS.length] }} className="mx-auto w-2/3" />
              <p className="text-center text-xs text-mist">{pattern}</p>
            </div>
          ))}
        </div>
        <h3 className="mb-3 mt-10 font-display text-xl">Emblems</h3>
        <div className="grid grid-cols-5 gap-6 md:grid-cols-10">
          {EMBLEMS.map((emblem) => (
            <div key={emblem} className="text-center">
              <div className="rounded-xl bg-dusk p-3 text-solar">
                <EmblemMark spec={{ pattern: "horizontal", colors: ["#38BDF8", "#0F172A", "#FBBF24"], emblem }} className="w-full" />
              </div>
              <p className="mt-1 text-xs text-mist">{emblem}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="avatars" className="container-x py-12">
        <h2 className="mb-6 font-display text-2xl">Avatars</h2>
        <div className="flex flex-wrap gap-4">
          {NAMES.map((name) => (
            <div key={name} className="text-center text-xs text-mist">
              <PixelAvatar name={name} className="size-20 rounded-lg" />
              {name}
            </div>
          ))}
        </div>
      </section>

      <section id="portraits" className="container-x pb-24 pt-12">
        <h2 className="mb-6 font-display text-2xl">Portraits (hair x accessory)</h2>
        <div className="grid grid-cols-4 gap-4 md:grid-cols-8">
          {HAIRS.flatMap((hair, h) =>
            ACCS.map((acc, a) => (
              <div key={`${hair}-${acc}`} className="rounded-xl bg-dusk p-2 text-center text-[10px] text-mist">
                <PixelPortrait spec={portraitSpec(h * 3 + a, hair, acc)} className="w-full" />
                {hair} / {acc}
              </div>
            )),
          )}
        </div>
      </section>
    </div>
  );
}
