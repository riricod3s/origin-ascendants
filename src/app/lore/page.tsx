import { ArrowRight, BookOpen, Hourglass, MessageCircle } from "lucide-react";
import type { Metadata } from "next";
import { SectionNav } from "@/components/content/SectionNav";
import { LoreArchive } from "@/components/lore/LoreArchive";
import { WorldTimeline, type TimelineNation } from "@/components/lore/WorldTimeline";
import { Button } from "@/components/ui/Button";
import { CountUp } from "@/components/ui/CountUp";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CharacterCard } from "@/components/wiki/CharacterCard";
import { siteConfig } from "@/config/site";
import { allCharacters, eras, loreEntries, loreTopics, nations, timelineEvents } from "@/lib/content";
import { seedFrom } from "@/lib/labels";
import { toArchiveEntry } from "@/lib/lore";

export const metadata: Metadata = {
  title: "Lore",
  description: "The searchable chronicles of Aurelune: ancient history, founding eras, great wars, legendary figures, political history, world events and an interactive timeline.",
};

const STATUS_ORDER = { Legend: 0, Living: 1, Fallen: 2 } as const;

export default function LorePage() {
  const entries = loreEntries.map(toArchiveEntry);
  const topics = loreTopics.map((topic) => ({ ...topic, seed: seedFrom(topic.slug) }));
  const timelineNations: Record<string, TimelineNation> = Object.fromEntries(nations.map((n) => [n.slug, { name: n.short, color: n.colors.primary }]));
  const present = `AS ${eras[eras.length - 1].endYear}`;
  const figures = [...allCharacters].sort((a, b) => STATUS_ORDER[a.status] - STATUS_ORDER[b.status]).slice(0, 4);

  const stats = [
    { value: loreEntries.length, label: "Chronicles" },
    { value: timelineEvents.length, label: "Recorded events" },
    { value: eras.length, label: "Ages of history" },
    { value: allCharacters.length, label: "Legendary figures" },
  ];

  return (
    <>
      <PageHero
        title={<>The Chronicles of <span className="text-gradient-sky">Aurelune</span></>}
        eyebrow="Lore Archive"
        icon="scroll-text"
        description="From the fall of the Heartstar to last season's Spire Summit, every age of Aurelune is recorded here—much of it written by the players who lived it."
        scene="ruins"
        seed={21}
        tone="arcane"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Lore" }]}
        aside={
          <dl className="grid w-72 grid-cols-2 gap-3 sm:w-80">
            {stats.map((stat) => (
              <div key={stat.label} className="glass rounded-2xl p-4 text-center">
                <dd className="font-display text-3xl font-bold text-white"><CountUp value={stat.value} /></dd>
                <dt className="mt-1 text-[0.68rem] tracking-[0.14em] text-mist/70 uppercase">{stat.label}</dt>
              </div>
            ))}
          </dl>
        }
      >
        <div className="flex flex-wrap gap-3">
          <Button href="#timeline" icon={<Hourglass />}>Walk the timeline</Button>
          <Button href="#topics" variant="secondary" icon={<BookOpen />}>Browse the archive</Button>
        </div>
      </PageHero>

      <section id="topics" className="container-x scroll-mt-28 py-16 lg:py-24">
        <SectionHeading
          eyebrow="Encyclopedia"
          icon="library"
          title="Explore by topic"
          description="Choose a topic to filter the archive, or search every chronicle for a name, place or era."
        />
        <div className="mt-10">
          <LoreArchive entries={entries} topics={topics} />
        </div>
      </section>

      <section id="timeline" aria-labelledby="timeline-title" className="relative scroll-mt-20 border-t border-white/5 bg-gradient-to-b from-dusk/50 to-night py-16 lg:py-24">
        <div className="container-x">
          <SectionHeading
            eyebrow="Interactive timeline"
            icon="hourglass"
            title={<span id="timeline-title">Twelve centuries of history</span>}
            description="Scroll through the ages of Aurelune and open any event to learn more. Filter by type to follow a single thread, from foundings to festivals."
            align="center"
            tone="aether"
          />
        </div>
        <SectionNav
          className="mt-10"
          label="Jump to an age"
          items={eras.map((era) => ({ id: `era-${era.slug}`, label: era.name.replace(/^The /, ""), icon: era.icon }))}
        />
        <div className="container-x mt-10">
          <WorldTimeline eras={eras} events={timelineEvents} nations={timelineNations} present={present} />
        </div>
      </section>

      <section className="container-x py-16 lg:py-24">
        <SectionHeading
          eyebrow="Legendary figures"
          icon="crown"
          title="The people behind the turning points"
          tone="solar"
          action={<Button href="/wiki/characters" variant="ghost" iconRight={<ArrowRight />}>All characters</Button>}
        />
        <Stagger className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {figures.map((character) => (
            <StaggerItem key={character.slug} className="h-full"><CharacterCard character={character} /></StaggerItem>
          ))}
        </Stagger>
      </section>

      <section className="container-x pb-20 lg:pb-28">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-arcane/25 bg-gradient-to-br from-arcane/20 via-dusk to-aether/10 p-8 sm:p-12">
            <div aria-hidden="true" className="absolute -right-10 -bottom-24 size-80 rounded-full bg-arcane/25 blur-3xl" />
            <div className="relative max-w-2xl">
              <p className="text-xs font-semibold tracking-[0.24em] text-arcane uppercase">Community storytelling</p>
              <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">History is written by players</h2>
              <p className="mt-4 text-mist">
                Founded a city, won a siege or uncovered a ruin? Share the story in Discord. The staff and community regularly add memorable player moments to the chronicles and the timeline.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button href={siteConfig.discord.invite} external icon={<MessageCircle />}>Share your story</Button>
                <Button href="/news" variant="secondary" iconRight={<ArrowRight />}>Latest chronicles in the news</Button>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
