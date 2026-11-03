import { ArrowRight, Compass, Map } from "lucide-react";
import type { Metadata } from "next";
import { Flag } from "@/components/art/FlagArt";
import { DiplomacyWeb, type WebNation } from "@/components/nations/DiplomacyWeb";
import { NationCard } from "@/components/nations/NationCard";
import { TransitionLink } from "@/components/layout/TransitionLink";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { nations } from "@/lib/content";

export const metadata: Metadata = {
  title: "Nations",
  description: "Meet the six nations of Aurelune: their banners, leaders, alliances, rivalries, territories and histories.",
};

export default function NationsPage() {
  const web: WebNation[] = nations.map((nation) => ({
    slug: nation.slug,
    name: nation.name,
    short: nation.short,
    primary: nation.colors.primary,
    flag: nation.flag,
    allies: nation.allies.map((ally) => ally.slug),
    rivals: nation.rivals.map((rival) => rival.slug),
  }));
  const recruiting = nations.filter((nation) => nation.joining.open).length;

  return (
    <>
      <PageHero
        title={<>Six banners. <span className="text-gradient-gold">One sky.</span></>}
        eyebrow="Nations of Aurelune"
        icon="castle"
        description="Every nation in Aurelune was founded, governed and defended by players. Discover their banners, leaders and capitals, then find the people you want to build history with."
        scene="skycity"
        seed={14}
        tone="solar"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Nations" }]}
        aside={
          <div className="mx-auto grid w-72 grid-cols-3 gap-x-4 gap-y-6 sm:w-80" aria-hidden="true">
            {nations.map((nation, i) => (
              <div key={nation.slug} className="animate-float" style={{ animationDelay: `${i * -0.9}s` }}>
                <Flag spec={nation.flag} className="w-full drop-shadow-[0_10px_18px_rgba(2,6,23,0.55)]" />
              </div>
            ))}
          </div>
        }
      >
        <div className="flex flex-wrap items-center gap-3">
          <Button href="#nations" icon={<Compass />}>Browse nations</Button>
          <Button href="/map" variant="secondary" icon={<Map />}>Open the world map</Button>
          <Badge tone="verdant" icon="circle-check">{recruiting} recruiting now</Badge>
        </div>
      </PageHero>

      <section id="nations" className="container-x scroll-mt-28 py-16 lg:py-24">
        <SectionHeading
          eyebrow="The realms"
          icon="flag"
          title="Choose your banner"
          description="Each nation has its own government, culture and goals. Visit as many as you like before you swear an oath; Wanderers are welcome everywhere."
        />
        <Stagger className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {nations.map((nation) => (
            <StaggerItem key={nation.slug} className="h-full">
              <NationCard nation={nation} />
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section className="border-y border-white/5 bg-dusk/40 py-16 lg:py-24">
        <div className="container-x">
          <SectionHeading
            eyebrow="Diplomacy"
            icon="handshake"
            title="The web of alliances"
            description="Treaties, trade pacts and old rivalries tie Aurelune together. They change through play, so this web is updated after every Spire Summit."
            align="center"
            tone="verdant"
          />
          <Reveal className="mt-12">
            <DiplomacyWeb nations={web} />
          </Reveal>
        </div>
      </section>

      <section className="container-x py-16 lg:py-24">
        <SectionHeading eyebrow="At a glance" icon="scale" title="Compare the nations" tone="arcane" />
        <Reveal className="mt-10">
          <div className="surface overflow-x-auto rounded-2xl">
            <table className="w-full min-w-[760px] text-left text-sm">
              <caption className="sr-only">Comparison of nations by capital, government, founding year, size and recruitment</caption>
              <thead>
                <tr className="border-b border-white/10 text-[0.7rem] tracking-[0.16em] text-mist/60 uppercase">
                  <th scope="col" className="px-5 py-4 font-semibold">Nation</th>
                  <th scope="col" className="px-5 py-4 font-semibold">Capital</th>
                  <th scope="col" className="px-5 py-4 font-semibold">Government</th>
                  <th scope="col" className="px-5 py-4 font-semibold">Founded</th>
                  <th scope="col" className="px-5 py-4 font-semibold">Territory</th>
                  <th scope="col" className="px-5 py-4 font-semibold">Recruiting</th>
                </tr>
              </thead>
              <tbody>
                {nations.map((nation) => (
                  <tr key={nation.slug} className="border-b border-white/5 transition-colors last:border-0 hover:bg-white/[0.03]">
                    <th scope="row" className="px-5 py-4 font-normal">
                      <TransitionLink href={`/nations/${nation.slug}`} className="group inline-flex items-center gap-3 font-semibold text-white">
                        <Flag spec={nation.flag} className="w-9" />
                        <span className="group-hover:underline">{nation.name}</span>
                      </TransitionLink>
                    </th>
                    <td className="px-5 py-4 text-mist">{nation.capital.name}</td>
                    <td className="px-5 py-4 text-mist">{nation.government.type}</td>
                    <td className="px-5 py-4 text-mist">{nation.founded}</td>
                    <td className="px-5 py-4 text-mist">{nation.territory.size}</td>
                    <td className="px-5 py-4">
                      {nation.joining.open ? <Badge tone="verdant" icon="check">Open</Badge> : <Badge tone="aether" icon="lock" variant="outline">Invite</Badge>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </section>

      <section className="container-x pb-20 lg:pb-28">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-solar/20 bg-gradient-to-br from-solar/15 via-dusk to-arcane/15 p-8 sm:p-12">
            <div aria-hidden="true" className="absolute -top-20 -right-16 size-72 rounded-full bg-solar/20 blur-3xl" />
            <div className="relative max-w-2xl">
              <p className="text-xs font-semibold tracking-[0.24em] text-solar uppercase">Write the next chapter</p>
              <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">Ready to swear an oath?</h2>
              <p className="mt-4 text-mist">
                The Nations Guide explains how to join a nation, how nation ranks work, and why some of Aurelune&apos;s best-loved explorers choose to stay Wanderers.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button href="/wiki/guides/nations-guide" variant="gold" iconRight={<ArrowRight />}>Read the Nations Guide</Button>
                <Button href="/lore" variant="secondary">Learn their history</Button>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
