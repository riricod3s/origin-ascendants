import { ArrowRight, Map, MessageCircle } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Banner, EmblemMark, Flag } from "@/components/art/FlagArt";
import { FactsPanel } from "@/components/content/ArticleLayout";
import { neighbours, PrevNext } from "@/components/content/PrevNext";
import { RelatedLinks } from "@/components/content/RelatedLinks";
import { SectionNav, type SectionNavItem } from "@/components/content/SectionNav";
import { TransitionLink } from "@/components/layout/TransitionLink";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { SceneCover } from "@/components/ui/SceneCover";
import { TiltCard } from "@/components/ui/TiltCard";
import { CharacterCard, PortraitFrame } from "@/components/wiki/CharacterCard";
import { OriginCard } from "@/components/wiki/OriginCard";
import { siteConfig } from "@/config/site";
import { allCharacters, getCharacter, getNation, getOrigin, loreEntries, nations, newsArticles, resolveRefs, timelineEvents } from "@/lib/content";
import { formatDate } from "@/lib/format";
import { renderInline, stripInline } from "@/lib/inline";
import { seedFrom } from "@/lib/labels";
import { hexToneStyle, toneStyle } from "@/lib/tones";
import type { CityType, IconKey, Nation, NationRelation } from "@/types/content";

type Params = { params: Promise<{ slug: string }> };

const CITY_ICON: Record<CityType, IconKey> = { capital: "crown", city: "building", port: "anchor", fortress: "castle", town: "home" };

const SECTIONS: SectionNavItem[] = [
  { id: "overview", label: "Overview", icon: "compass" },
  { id: "leadership", label: "Leadership", icon: "crown" },
  { id: "diplomacy", label: "Diplomacy", icon: "handshake" },
  { id: "territory", label: "Territory", icon: "mountain" },
  { id: "government", label: "Government", icon: "landmark" },
  { id: "history", label: "History", icon: "hourglass" },
  { id: "cities", label: "Cities", icon: "castle" },
  { id: "culture", label: "Culture", icon: "palette" },
  { id: "join", label: "Join", icon: "flag" },
];

export function generateStaticParams() {
  return nations.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const nation = getNation(slug);
  return nation ? { title: nation.name, description: `${nation.tagline} ${stripInline(nation.description)}`.slice(0, 300) } : {};
}

function Heading({ eyebrow, title, icon }: { eyebrow: string; title: string; icon: IconKey }) {
  return (
    <div className="mb-6 flex items-center gap-3">
      <span className="grid size-11 place-items-center rounded-xl border border-white/10 tone-bg tone-text"><Icon name={icon} className="size-5" /></span>
      <div>
        <p className="text-[0.68rem] font-semibold tracking-[0.22em] uppercase tone-text">{eyebrow}</p>
        <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">{title}</h2>
      </div>
    </div>
  );
}

function RelationCard({ relation, kind }: { relation: NationRelation; kind: "ally" | "rival" }) {
  const other = getNation(relation.slug);
  if (!other) return null;
  return (
    <Card tone={other.tone} interactive className="h-full p-5" as="li">
      <div className="flex items-center gap-3">
        <span className="grid size-12 shrink-0 place-items-center rounded-xl border-2 bg-night/70" style={{ borderColor: other.colors.primary }}>
          <EmblemMark spec={other.flag} className="size-7" />
        </span>
        <div className="min-w-0">
          <TransitionLink href={`/nations/${other.slug}`} className="font-display text-lg font-bold text-white after:absolute after:inset-0 hover:underline">
            {other.name}
          </TransitionLink>
          <p className={kind === "ally" ? "text-xs font-semibold text-verdant" : "text-xs font-semibold text-[#FB923C]"}>
            {kind === "ally" ? "Ally" : "Rival"} · {other.government.type}
          </p>
        </div>
      </div>
      <p className="relative mt-3 text-sm leading-relaxed text-mist/85">{renderInline(relation.note)}</p>
    </Card>
  );
}

function DiplomacyColumn({ title, icon, relations, kind, empty }: { title: string; icon: IconKey; relations: NationRelation[]; kind: "ally" | "rival"; empty: string }) {
  return (
    <div>
      <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold tracking-[0.16em] text-mist/70 uppercase">
        <Icon name={icon} className={kind === "ally" ? "size-4 text-verdant" : "size-4 text-[#FB923C]"} />
        {title}
        <span className="text-mist/45">({relations.length})</span>
      </h3>
      {relations.length > 0 ? (
        <ul className="grid gap-4">
          {relations.map((relation) => <RelationCard key={relation.slug} relation={relation} kind={kind} />)}
        </ul>
      ) : (
        <p className="surface rounded-2xl p-5 text-sm text-mist/70">{empty}</p>
      )}
    </div>
  );
}

function nationRefs(nation: Nation) {
  return loreEntries.filter((entry) => entry.related.some((ref) => ref.type === "nation" && ref.slug === nation.slug));
}

export default async function NationPage({ params }: Params) {
  const { slug } = await params;
  const nation = getNation(slug);
  if (!nation) notFound();

  const index = nations.findIndex((item) => item.slug === nation.slug);
  const { prev, next } = neighbours(nations, index);
  const leader = nation.leader.characterSlug ? getCharacter(nation.leader.characterSlug) : undefined;
  const citizens = allCharacters.filter((character) => character.nation === nation.slug && character.slug !== leader?.slug);
  const commonOrigins = nation.commonOrigins.map(getOrigin).filter((item) => item !== undefined);
  const events = timelineEvents.filter((event) => event.nations?.includes(nation.slug)).sort((a, b) => a.year - b.year);
  const news = newsArticles.filter((article) => article.nations?.includes(nation.slug)).slice(0, 3);
  const lore = resolveRefs(nationRefs(nation).map((entry) => ({ type: "lore" as const, slug: entry.slug })));

  return (
    <div style={toneStyle(nation.tone)}>
      <PageHero
        title={nation.name}
        eyebrow={`“${nation.motto}”`}
        icon="flag"
        description={nation.tagline}
        tone={nation.tone}
        scene={nation.scene}
        seed={seedFrom(nation.slug)}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Nations", href: "/nations" }, { label: nation.name }]}
        aside={
          <div className="relative mx-auto flex w-64 items-start justify-center gap-5 sm:w-72" aria-hidden="true">
            <div className="absolute inset-x-0 top-1/3 h-40 rounded-full blur-3xl" style={{ background: `${nation.colors.primary}40` }} />
            <Banner spec={nation.flag} className="relative w-24 origin-top animate-sway drop-shadow-[0_18px_30px_rgba(2,6,23,0.6)] sm:w-28" />
            <div className="relative mt-10 w-32 animate-float sm:w-36">
              <Flag spec={nation.flag} className="w-full drop-shadow-[0_14px_26px_rgba(2,6,23,0.6)]" />
            </div>
          </div>
        }
      >
        <div className="flex flex-wrap gap-2">
          <Badge tone={nation.tone} icon="landmark">{nation.government.type}</Badge>
          <Badge tone="aether" icon="calendar" variant="outline">Founded {nation.founded}</Badge>
          <Badge tone="aether" icon="map-pin" variant="outline">{nation.territory.region}</Badge>
          {nation.joining.open ? <Badge tone="verdant" icon="circle-check" variant="solid">Recruiting</Badge> : <Badge tone="aether" icon="lock">By invitation</Badge>}
        </div>
      </PageHero>

      <SectionNav items={SECTIONS} label={`${nation.name} sections`} />

      <div className="container-x grid gap-12 py-14 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-14 lg:py-20">
        <div className="min-w-0 space-y-20 [&>section]:scroll-mt-40">
          <section id="overview">
            <Reveal>
              <p className="max-w-3xl font-display text-xl leading-relaxed text-white/90 sm:text-2xl">{renderInline(nation.description)}</p>
            </Reveal>
          </section>

          <section id="leadership">
            <Heading eyebrow="Leadership" title={`${nation.leader.title} ${nation.leader.name}`} icon="crown" />
            <Reveal>
              <Card tone={nation.tone} className="grid gap-6 overflow-hidden p-5 sm:grid-cols-[11rem_minmax(0,1fr)] sm:p-6">
                {leader ? (
                  <TransitionLink href={`/wiki/characters/${leader.slug}`} className="group/tilt block" aria-label={`Read ${leader.name}'s biography`}>
                    <PortraitFrame character={leader} className="aspect-[4/4.6]" />
                  </TransitionLink>
                ) : (
                  <div className="grid aspect-[4/4.6] place-items-center rounded-[1.6rem] border border-white/10 tone-bg"><Icon name="crown" className="size-12 tone-text" /></div>
                )}
                <div className="flex flex-col">
                  <p className="text-sm leading-relaxed text-mist">{renderInline(nation.leader.bio)}</p>
                  {leader && (
                    <>
                      <blockquote className="mt-5 border-l-2 pl-4 font-display text-lg text-white/90 italic" style={{ borderColor: nation.colors.primary }}>
                        &ldquo;{leader.quote}&rdquo;
                      </blockquote>
                      <div className="mt-auto pt-5">
                        <Button href={`/wiki/characters/${leader.slug}`} variant="secondary" size="sm" iconRight={<ArrowRight />}>Full biography</Button>
                      </div>
                    </>
                  )}
                </div>
              </Card>
            </Reveal>
          </section>

          <section id="diplomacy">
            <Heading eyebrow="Diplomacy" title="Allies & rivals" icon="handshake" />
            <div className="grid gap-8 md:grid-cols-2">
              <DiplomacyColumn title="Allies" icon="handshake" relations={nation.allies} kind="ally" empty="No formal alliances at the moment." />
              <DiplomacyColumn title="Rivals" icon="swords" relations={nation.rivals} kind="rival" empty="No standing rivalries. A rare and peaceful thing." />
            </div>
          </section>

          <section id="territory">
            <Heading eyebrow="Territory" title={nation.territory.region} icon="mountain" />
            <Reveal>
              <div className="overflow-hidden rounded-3xl border border-white/10">
                <SceneCover scene={nation.scene} seed={seedFrom(`${nation.slug}-land`)} tone={nation.tone} aspect="aspect-[21/8]" shade>
                  <div className="absolute right-5 bottom-4 left-5 flex flex-wrap items-end justify-between gap-3">
                    <p className="max-w-xl text-sm text-white/90 drop-shadow">{nation.territory.size}</p>
                    <Button href="/map" size="sm" variant="secondary" icon={<Map />}>View on map</Button>
                  </div>
                </SceneCover>
              </div>
            </Reveal>
            <p className="mt-6 max-w-3xl leading-relaxed text-mist">{renderInline(nation.territory.summary)}</p>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="text-sm font-semibold tracking-[0.16em] text-mist/70 uppercase">Biomes</h3>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {nation.territory.biomes.map((biome) => (
                    <li key={biome}><Badge tone={nation.tone} icon="leaf" variant="outline">{biome}</Badge></li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold tracking-[0.16em] text-mist/70 uppercase">Landmarks</h3>
                <ul className="mt-3 space-y-2">
                  {nation.territory.landmarks.map((landmark) => (
                    <li key={landmark} className="flex items-center gap-3 text-sm text-white">
                      <Icon name="map-pin" className="size-4 tone-text" />
                      {landmark}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section id="government">
            <Heading eyebrow="Government" title={nation.government.type} icon="landmark" />
            <p className="max-w-3xl leading-relaxed text-mist">{renderInline(nation.government.summary)}</p>
            <Stagger className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {nation.government.branches.map((branch, i) => (
                <StaggerItem key={branch.title} className="h-full">
                  <Card tone={nation.tone} interactive className="h-full p-5">
                    <span className="font-display text-3xl font-bold tone-text opacity-40">{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="mt-2 font-display text-lg font-bold text-white">{branch.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-mist/85">{renderInline(branch.role)}</p>
                  </Card>
                </StaggerItem>
              ))}
            </Stagger>
          </section>

          <section id="history">
            <Heading eyebrow="History" title="Chronicle of the realm" icon="hourglass" />
            <ol className="relative space-y-8 border-l border-white/10 pl-8">
              <span aria-hidden="true" className="absolute top-0 -left-px h-full w-px bg-gradient-to-b from-[rgb(var(--tone))] via-[rgb(var(--tone)/0.4)] to-transparent" />
              {nation.history.map((entry) => (
                <li key={`${entry.year}-${entry.title}`} className="relative">
                  <Reveal x={-16} y={0}>
                    <span aria-hidden="true" className="absolute top-1.5 -left-[2.4rem] size-4 rounded-full border-2 border-night tone-bg-strong tone-glow" />
                    <p className="text-xs font-semibold tracking-[0.2em] uppercase tone-text">{entry.year}</p>
                    <h3 className="mt-1 font-display text-xl font-bold text-white">{entry.title}</h3>
                    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-mist/85">{renderInline(entry.text)}</p>
                  </Reveal>
                </li>
              ))}
            </ol>
            {events.length > 0 && (
              <p className="mt-8 text-sm text-mist/75">
                {nation.short} appears in {events.length} events on the{" "}
                <TransitionLink href="/lore#timeline" className="font-semibold tone-text hover:underline">world timeline</TransitionLink>.
              </p>
            )}
          </section>

          <section id="cities">
            <Heading eyebrow="Settlements" title="Capital & cities" icon="castle" />
            <Reveal>
              <TiltCard tone={nation.tone} max={3} className="overflow-hidden">
                <div className="grid md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
                  <SceneCover scene={nation.scene} seed={seedFrom(nation.capital.name)} tone={nation.tone} aspect="aspect-[16/10] md:aspect-auto md:min-h-72" />
                  <div className="p-6 sm:p-8">
                    <Badge tone="solar" icon="crown" variant="solid">Capital</Badge>
                    <h3 className="mt-3 font-display text-3xl font-bold text-white">{nation.capital.name}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-mist">{renderInline(nation.capital.description)}</p>
                  </div>
                </div>
              </TiltCard>
            </Reveal>
            <Stagger className="mt-5 grid gap-4 sm:grid-cols-2">
              {nation.cities.map((city) => (
                <StaggerItem key={city.name} className="h-full">
                  <Card tone={nation.tone} interactive className="h-full p-5">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="font-display text-lg font-bold text-white">{city.name}</h3>
                      <Badge tone={nation.tone} icon={CITY_ICON[city.type]} variant="outline">{city.type}</Badge>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-mist/85">{renderInline(city.description)}</p>
                  </Card>
                </StaggerItem>
              ))}
            </Stagger>
          </section>

          <section id="culture">
            <Heading eyebrow="Culture" title="Life in the realm" icon="palette" />
            <div className="max-w-3xl space-y-4 leading-relaxed text-mist">
              {nation.culture.map((paragraph, i) => <p key={i}>{renderInline(paragraph)}</p>)}
            </div>
            <h3 className="mt-10 text-sm font-semibold tracking-[0.16em] text-mist/70 uppercase">Traditions</h3>
            <Stagger className="mt-4 grid gap-4 sm:grid-cols-2">
              {nation.traditions.map((tradition) => (
                <StaggerItem key={tradition.name} className="h-full">
                  <Card tone={nation.tone} interactive className="h-full p-5">
                    <h4 className="flex items-center gap-2 font-display text-lg font-bold text-white"><Icon name="sparkles" className="size-4 tone-text" />{tradition.name}</h4>
                    <p className="mt-2 text-sm leading-relaxed text-mist/85">{renderInline(tradition.description)}</p>
                  </Card>
                </StaggerItem>
              ))}
            </Stagger>
            <div className="mt-10 grid gap-5 md:grid-cols-2">
              <Card tone="verdant" className="p-5">
                <h3 className="flex items-center gap-2 font-display text-lg font-bold text-white"><Icon name="trending-up" className="size-5 text-verdant" />Strengths</h3>
                <ul className="mt-3 space-y-2 text-sm text-mist">
                  {nation.strengths.map((item) => <li key={item} className="flex gap-2"><Icon name="check" className="mt-0.5 size-4 text-verdant" />{item}</li>)}
                </ul>
              </Card>
              <Card tone="ember" className="p-5">
                <h3 className="flex items-center gap-2 font-display text-lg font-bold text-white"><Icon name="alert" className="size-5 text-ember" />Challenges</h3>
                <ul className="mt-3 space-y-2 text-sm text-mist">
                  {nation.challenges.map((item) => <li key={item} className="flex gap-2"><Icon name="target" className="mt-0.5 size-4 text-ember" />{item}</li>)}
                </ul>
              </Card>
            </div>
            {commonOrigins.length > 0 && (
              <>
                <h3 className="mt-10 text-sm font-semibold tracking-[0.16em] text-mist/70 uppercase">Common origins</h3>
                <Stagger className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {commonOrigins.map((origin) => (
                    <StaggerItem key={origin.slug} className="h-full"><OriginCard origin={origin} compact /></StaggerItem>
                  ))}
                </Stagger>
              </>
            )}
          </section>

          <section id="join">
            <Reveal>
              <div className="relative overflow-hidden rounded-3xl border p-7 sm:p-10" style={{ ...hexToneStyle(nation.colors.primary), borderColor: `${nation.colors.primary}40`, background: `linear-gradient(135deg, ${nation.colors.primary}1f, #1E293B 55%)` }}>
                <div aria-hidden="true" className="absolute -top-10 -right-6 w-40 opacity-25 sm:w-52"><Banner spec={nation.flag} className="w-full rotate-6" /></div>
                <div className="relative max-w-2xl">
                  {nation.joining.open ? <Badge tone="verdant" icon="circle-check" variant="solid">Open to new citizens</Badge> : <Badge tone="aether" icon="lock">By invitation only</Badge>}
                  <h2 className="mt-4 font-display text-3xl font-bold text-white">Join {nation.name}</h2>
                  <p className="mt-3 text-mist">{renderInline(nation.joining.summary)}</p>
                  <ul className="mt-5 space-y-2.5">
                    {nation.joining.requirements.map((requirement) => (
                      <li key={requirement} className="flex gap-3 text-sm text-white"><Icon name="circle-check" className="mt-0.5 size-4 tone-text" />{renderInline(requirement)}</li>
                    ))}
                  </ul>
                  <div className="mt-7 flex flex-wrap gap-3">
                    <Button href={siteConfig.discord.invite} external icon={<MessageCircle />}>Apply in Discord</Button>
                    <Button href="/wiki/guides/nations-guide" variant="secondary" iconRight={<ArrowRight />}>Nations Guide</Button>
                  </div>
                </div>
              </div>
            </Reveal>
          </section>
        </div>

        <aside className="space-y-6 lg:sticky lg:top-40 lg:self-start">
          <FactsPanel
            tone={nation.tone}
            title="Nation record"
            facts={[
              { label: "Capital", value: nation.capital.name, icon: "crown" },
              { label: "Leader", value: `${nation.leader.title} ${nation.leader.name}`, icon: "user" },
              { label: "Government", value: nation.government.type, icon: "landmark" },
              { label: "Founded", value: nation.founded, icon: "calendar" },
              { label: "Region", value: nation.territory.region, icon: "map" },
              { label: "Size", value: nation.territory.size, icon: "layers" },
              { label: "Cities", value: `${nation.cities.length + 1} settlements`, icon: "castle" },
            ]}
          />
          <div className="surface rounded-2xl p-5">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase tone-text">Colours</p>
            <div className="mt-4 flex gap-3">
              {nation.flag.colors.map((color) => (
                <span key={color} className="flex flex-col items-center gap-1.5">
                  <span className="size-10 rounded-xl border border-white/15 shadow-inner" style={{ background: color }} />
                  <span className="font-mono text-[0.65rem] text-mist/60">{color}</span>
                </span>
              ))}
            </div>
          </div>
          {news.length > 0 && (
            <div className="surface rounded-2xl p-5">
              <p className="text-xs font-semibold tracking-[0.2em] uppercase tone-text">In the news</p>
              <ul className="mt-4 space-y-4">
                {news.map((article) => (
                  <li key={article.slug}>
                    <TransitionLink href={`/news/${article.slug}`} className="group block">
                      <p className="text-sm font-semibold text-white group-hover:underline">{article.title}</p>
                      <p className="mt-0.5 text-xs text-mist/60">{formatDate(article.date, "short")}</p>
                    </TransitionLink>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </div>

      {citizens.length > 0 && (
        <section className="container-x pb-16">
          <p className="text-xs font-semibold tracking-[0.22em] uppercase tone-text">Notable citizens</p>
          <h2 className="mt-2 font-display text-2xl font-bold text-white">Faces of {nation.short}</h2>
          <Stagger className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {citizens.map((character) => <StaggerItem key={character.slug} className="h-full"><CharacterCard character={character} /></StaggerItem>)}
          </Stagger>
        </section>
      )}

      <div className="container-x space-y-14 pb-20 lg:pb-28">
        <RelatedLinks items={lore} title={`${nation.short} in the chronicles`} eyebrow="Lore" />
        <PrevNext
          label="More nations"
          prev={prev && { href: `/nations/${prev.slug}`, title: prev.name }}
          next={next && { href: `/nations/${next.slug}`, title: next.name }}
        />
      </div>
    </div>
  );
}
