import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EmblemMark } from "@/components/art/FlagArt";
import { neighbours, PrevNext } from "@/components/content/PrevNext";
import { TransitionLink } from "@/components/layout/TransitionLink";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { OriginCard, RARITY_TONE } from "@/components/wiki/OriginCard";
import { OriginSigil, StatPips } from "@/components/wiki/OriginBits";
import { allCharacters, getNation, getOrigin, origins } from "@/lib/content";
import { formatDate } from "@/lib/format";
import { renderInline, stripInline } from "@/lib/inline";
import { DIFFICULTY_LABEL, seedFrom, TONE_SCENE } from "@/lib/labels";
import { toneStyle } from "@/lib/tones";
import type { IconKey } from "@/types/content";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return origins.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const origin = getOrigin(slug);
  return origin ? { title: `${origin.name} Origin`, description: stripInline(origin.description) } : {};
}

function SectionTitle({ eyebrow, title, icon }: { eyebrow: string; title: string; icon: IconKey }) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <span className="grid size-10 place-items-center rounded-xl tone-bg tone-text"><Icon name={icon} className="size-5" /></span>
      <div>
        <p className="text-[0.68rem] font-semibold tracking-[0.2em] uppercase tone-text">{eyebrow}</p>
        <h2 className="font-display text-2xl font-bold text-white">{title}</h2>
      </div>
    </div>
  );
}

export default async function OriginPage({ params }: Params) {
  const { slug } = await params;
  const origin = getOrigin(slug);
  if (!origin) notFound();

  const index = origins.findIndex((item) => item.slug === origin.slug);
  const { prev, next } = neighbours(origins, index);
  const related = origin.related.map(getOrigin).filter((item) => item !== undefined);
  const homelands = origin.homelands.map(getNation).filter((item) => item !== undefined);
  const notable = allCharacters.filter((character) => character.origin === origin.slug);

  return (
    <div style={toneStyle(origin.tone)}>
      <PageHero
        title={origin.name}
        eyebrow={origin.epithet}
        icon={origin.icon}
        description={origin.tagline}
        tone={origin.tone}
        scene={TONE_SCENE[origin.tone]}
        seed={seedFrom(origin.slug)}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Wiki", href: "/wiki" }, { label: "Origins", href: "/wiki/origins" }, { label: origin.name }]}
        aside={<OriginSigil icon={origin.icon} tone={origin.tone} className="mx-auto" />}
      >
        <div className="flex flex-wrap gap-2">
          <Badge tone={RARITY_TONE[origin.rarity]} icon="gem">{origin.rarity}</Badge>
          <Badge tone={origin.tone} icon="signpost" variant="outline">{DIFFICULTY_LABEL[origin.difficulty]}</Badge>
          {origin.playstyle.map((style) => <Badge key={style} tone="aether" variant="outline">{style}</Badge>)}
        </div>
      </PageHero>

      <div className="container-x grid gap-10 py-14 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-14 lg:py-20">
        <div className="min-w-0 space-y-16">
          <Reveal>
            <p className="max-w-3xl font-display text-xl leading-relaxed text-white/90 sm:text-2xl">{renderInline(origin.description)}</p>
          </Reveal>

          <section>
            <SectionTitle eyebrow="Always active" title="Passive abilities" icon="sparkles" />
            <Stagger className="grid gap-4 sm:grid-cols-2">
              {origin.passives.map((ability) => (
                <StaggerItem key={ability.name}>
                  <Card tone={origin.tone} interactive className="h-full p-5">
                    <div className="flex items-center gap-3">
                      <span className="grid size-10 place-items-center rounded-xl border border-white/10 tone-bg tone-text"><Icon name={ability.icon} /></span>
                      <h3 className="font-display text-lg font-bold text-white">{ability.name}</h3>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-mist/85">{renderInline(ability.description)}</p>
                  </Card>
                </StaggerItem>
              ))}
            </Stagger>
          </section>

          <section>
            <SectionTitle eyebrow="On your command" title="Active abilities" icon="zap" />
            <Stagger className="grid gap-4">
              {origin.actives.map((ability) => (
                <StaggerItem key={ability.name}>
                  <Card tone={origin.tone} interactive className="overflow-hidden p-5 sm:p-6">
                    <div aria-hidden="true" className="absolute inset-y-0 left-0 w-1 tone-bg-strong" />
                    <div className="flex flex-wrap items-start gap-4">
                      <span className="grid size-12 place-items-center rounded-2xl border border-white/10 tone-bg tone-text tone-glow"><Icon name={ability.icon} className="size-6" /></span>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-display text-xl font-bold text-white">{ability.name}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-mist/85">{renderInline(ability.description)}</p>
                      </div>
                      <div className="flex flex-wrap gap-2 sm:flex-col sm:items-end">
                        {ability.cooldown && <Badge tone="aether" icon="hourglass" variant="outline">{ability.cooldown} cooldown</Badge>}
                        {ability.keybind && <Badge tone="arcane" icon="key" variant="outline">{ability.keybind}</Badge>}
                      </div>
                    </div>
                  </Card>
                </StaggerItem>
              ))}
            </Stagger>
          </section>

          <section style={toneStyle("ember")}>
            <SectionTitle eyebrow="Every gift has a cost" title="Weaknesses" icon="alert" />
            {origin.weaknesses.length > 0 ? (
              <Stagger className="grid gap-4 sm:grid-cols-2">
                {origin.weaknesses.map((weakness) => (
                  <StaggerItem key={weakness.name}>
                    <Card tone="ember" className="h-full border-ember/15 bg-ember/[0.04] p-5">
                      <h3 className="flex items-center gap-2 font-display text-lg font-bold text-white"><Icon name="alert" className="size-4 text-ember" />{weakness.name}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-mist/85">{renderInline(weakness.description)}</p>
                    </Card>
                  </StaggerItem>
                ))}
              </Stagger>
            ) : (
              <Card tone="ember" className="p-5 text-sm leading-relaxed text-mist/85">
                {origin.name}s have no supernatural weaknesses—their challenge is that they have no supernatural strengths to lean on either.
              </Card>
            )}
          </section>

          <section style={toneStyle("arcane")}>
            <SectionTitle eyebrow="From the archives" title={`The story of the ${origin.name}`} icon="scroll-text" />
            <Reveal>
              <div className="relative overflow-hidden rounded-3xl border border-arcane/20 bg-gradient-to-br from-arcane/[0.08] via-white/[0.02] to-transparent p-6 sm:p-8">
                <span aria-hidden="true" className="absolute -top-6 right-4 font-display text-[9rem] leading-none text-arcane/10">&ldquo;</span>
                <div className="relative space-y-4 text-[1.05rem] leading-8 text-mist">
                  {origin.lore.map((paragraph, i) => <p key={i}>{renderInline(paragraph)}</p>)}
                </div>
              </div>
            </Reveal>
          </section>

          {related.length > 0 && (
            <section>
              <SectionTitle eyebrow="Kindred gifts" title="Related Origins" icon="orbit" />
              <Stagger className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {related.map((item) => (
                  <StaggerItem key={item.slug} className="h-full"><OriginCard origin={item} compact /></StaggerItem>
                ))}
              </Stagger>
            </section>
          )}

          <PrevNext
            label="More Origins"
            prev={prev && { title: prev.name, href: `/wiki/origins/${prev.slug}` }}
            next={next && { title: next.name, href: `/wiki/origins/${next.slug}` }}
          />
        </div>

        <aside className="space-y-6 lg:sticky lg:top-28 lg:h-fit">
          <Card tone={origin.tone} className="p-5">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase tone-text">Attributes</p>
            <StatPips stats={origin.stats} tone={origin.tone} showIcons className="mt-4" />
            <p className="mt-4 text-xs leading-relaxed text-mist/60">Ratings compare Origins with each other, from 1 (low) to 5 (high).</p>
          </Card>

          {homelands.length > 0 && (
            <Card tone={origin.tone} className="p-5">
              <p className="text-xs font-semibold tracking-[0.2em] uppercase tone-text">Most common in</p>
              <ul className="mt-3 space-y-1">
                {homelands.map((nation) => (
                  <li key={nation.slug}>
                    <TransitionLink href={`/nations/${nation.slug}`} className="flex items-center gap-3 rounded-xl px-2 py-2 text-sm text-mist transition-colors hover:bg-white/[0.05] hover:text-white">
                      <span className="grid size-8 place-items-center rounded-lg" style={{ background: `${nation.colors.primary}33` }}>
                        <EmblemMark spec={nation.flag} className="size-5" />
                      </span>
                      {nation.name}
                    </TransitionLink>
                  </li>
                ))}
              </ul>
            </Card>
          )}

          {notable.length > 0 && (
            <Card tone={origin.tone} className="p-5">
              <p className="text-xs font-semibold tracking-[0.2em] uppercase tone-text">Notable {origin.name}s</p>
              <ul className="mt-3 space-y-1">
                {notable.map((character) => (
                  <li key={character.slug}>
                    <TransitionLink href={`/wiki/characters/${character.slug}`} className="block rounded-xl px-2 py-2 text-sm transition-colors hover:bg-white/[0.05]">
                      <span className="block font-medium text-white">{character.name}</span>
                      <span className="block text-xs text-mist/65">{character.title}</span>
                    </TransitionLink>
                  </li>
                ))}
              </ul>
            </Card>
          )}

          <p className="px-1 text-xs text-mist/55">Last balanced {formatDate(origin.updated, "long")}. Exact values may change between updates—check the <TransitionLink href="/wiki/changelog" className="text-aether hover:text-white">changelog</TransitionLink>.</p>
        </aside>
      </div>
    </div>
  );
}
