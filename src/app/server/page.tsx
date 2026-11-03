import type { Metadata } from "next";
import { ArrowRight, Check, Download, ShieldCheck, Wifi } from "lucide-react";
import { SceneArt } from "@/components/art/SceneArt";
import { ServerStatus } from "@/components/server/ServerStatus";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { CopyButton } from "@/components/ui/CopyButton";
import { Icon } from "@/components/ui/Icon";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Server information",
  description: "Server address, version, modpack requirements and everything you need to join Origin Ascendants.",
};

export default function ServerPage() {
  const { server } = siteConfig;

  return (
    <>
      <PageHero
        title={<>Your next adventure <span className="text-gradient-sky">starts here.</span></>}
        eyebrow="Server information"
        icon="server"
        description="Aurelune is a whitelisted, community-led Origins SMP. Set up your client, meet us in Discord and step onto the Ascendant Landing."
        scene="airships"
        seed={20}
        tone="aether"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Server" }]}
        align="center"
      >
        <Button href={siteConfig.discord.invite} icon={<Wifi />}>Apply in Discord</Button>
      </PageHero>

      <div className="container-x">
        <section className="mx-auto grid max-w-5xl gap-5 py-16 lg:grid-cols-[1fr_0.85fr]">
          <Card tone="aether" className="relative overflow-hidden p-6 sm:p-8">
            <div aria-hidden="true" className="absolute -top-20 -right-20 size-60 rounded-full bg-aether/10 blur-3xl" />
            <div className="relative">
              <Badge tone="aether" icon="gamepad">Java Edition</Badge>
              <h2 className="mt-5 font-display text-2xl font-bold text-white">Join the world</h2>
              <p className="mt-2 text-sm leading-relaxed text-mist/75">Use the address below in Multiplayer. A whitelist application is required before your first visit.</p>
              <div className="mt-6 flex items-center gap-3 rounded-2xl border border-white/12 bg-night/60 p-3 sm:p-4">
                <code className="min-w-0 flex-1 truncate font-mono text-base font-semibold tracking-wide text-white sm:text-lg">{server.ip}</code>
                <CopyButton value={server.ip} label="Copy server address" className="shrink-0 rounded-full px-3 py-2">
                  Copy IP
                </CopyButton>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                <Badge tone="solar" icon="layers">{server.version}</Badge>
                <Badge tone="verdant" icon="globe">{server.region}</Badge>
                <Badge tone="arcane" icon="lock">{server.whitelist.label}</Badge>
              </div>
              <p className="mt-5 text-sm leading-relaxed text-mist">{server.whitelist.detail}</p>
            </div>
          </Card>
          <ServerStatus />
        </section>

        <section className="mx-auto max-w-5xl pb-24">
          <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
            <Reveal>
              <p className="mb-3 text-xs font-semibold tracking-[0.22em] text-solar uppercase">Get ready to play</p>
              <h2 className="font-display text-3xl font-bold text-white">Your client setup</h2>
              <p className="mt-4 leading-relaxed text-mist">{server.modpack.summary}</p>
              {server.modpack.downloadUrl ? (
                <Button href={server.modpack.downloadUrl} external className="mt-6" icon={<Download />}>Download the modpack</Button>
              ) : (
                <p className="mt-6 rounded-xl border border-solar/20 bg-solar/5 p-3 text-xs leading-relaxed text-solar/90">
                  Modpack download link is not configured yet. Ask staff in Discord for the current client setup.
                </p>
              )}
            </Reveal>
            <div className="space-y-5">
              <Card tone="aether" className="p-5 sm:p-6">
                <h3 className="flex items-center gap-2 font-semibold text-white"><ShieldCheck className="size-5 text-aether" /> Required</h3>
                <ul className="mt-4 grid gap-3 sm:grid-cols-3">
                  {server.modpack.required.map((mod) => (
                    <li key={mod.name} className="rounded-xl border border-white/8 bg-white/[0.03] p-3">
                      <p className="flex items-center gap-2 text-sm font-semibold text-white"><Check className="size-4 text-verdant" />{mod.name}</p>
                      <p className="mt-1.5 text-xs leading-relaxed text-mist/70">{mod.note}</p>
                    </li>
                  ))}
                </ul>
              </Card>
              <Card tone="arcane" className="p-5 sm:p-6">
                <h3 className="flex items-center gap-2 font-semibold text-white"><Icon name="sparkles" className="size-5 tone-text" /> Recommended</h3>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {server.modpack.recommended.map((mod) => (
                    <li key={mod.name} className="flex items-start gap-3 rounded-xl border border-white/8 bg-white/[0.03] p-3">
                      <Check className="mt-0.5 size-4 shrink-0 text-arcane" />
                      <span><span className="block text-sm font-semibold text-white">{mod.name}</span><span className="mt-1 block text-xs leading-relaxed text-mist/70">{mod.note}</span></span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </div>
        </section>

        <section className="relative isolate mb-24 overflow-hidden rounded-[2rem] border border-white/10">
          <SceneArt kind="isles" seed={37} accent="#38BDF8" className="absolute inset-0 -z-10 opacity-35" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-night/95 via-night/80 to-night/65" />
          <div className="grid gap-8 p-7 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-xs font-semibold tracking-[0.2em] text-aether uppercase">First steps in Aurelune</p>
              <h2 className="mt-3 font-display text-2xl font-bold text-white sm:text-3xl">From whitelist to the wide-open sky</h2>
              <p className="mt-3 max-w-2xl leading-relaxed text-mist">Apply in Discord, install the required Fabric mods, then join and choose your Origin at the Hall of Origins. The first seven days are a chance to find the fit that feels right.</p>
            </div>
            <Button href={siteConfig.discord.invite} iconRight={<ArrowRight />}>Open Discord</Button>
          </div>
        </section>
      </div>
    </>
  );
}
