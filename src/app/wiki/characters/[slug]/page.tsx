import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EmblemMark } from "@/components/art/FlagArt";
import { neighbours, PrevNext } from "@/components/content/PrevNext";
import { RelatedLinks } from "@/components/content/RelatedLinks";
import { TransitionLink } from "@/components/layout/TransitionLink";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { TiltCard } from "@/components/ui/TiltCard";
import { PortraitFrame, STATUS_TONE } from "@/components/wiki/CharacterCard";
import { allCharacters, getCharacter, getEra, getNation, getOrigin, resolveRefs } from "@/lib/content";
import { renderInline, stripInline } from "@/lib/inline";
import { seedFrom, TONE_SCENE } from "@/lib/labels";
import { toneStyle } from "@/lib/tones";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return allCharacters.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const character = getCharacter(slug);
  return character ? { title: character.name, description: `${character.title}. ${stripInline(character.significance)}` } : {};
}

export default async function CharacterPage({ params }: Params) {
  const { slug } = await params;
  const character = getCharacter(slug);
  if (!character) notFound();

  const nation = character.nation ? getNation(character.nation) : undefined;
  const origin = character.origin ? getOrigin(character.origin) : undefined;
  const era = getEra(character.era);
  const index = allCharacters.findIndex((item) => item.slug === character.slug);
  const { prev, next } = neighbours(allCharacters, index);
  const related = resolveRefs([
    ...character.relatedCharacters.map((s) => ({ type: "character" as const, slug: s })),
    ...character.relatedLore.map((s) => ({ type: "lore" as const, slug: s })),
  ]);

  return (
    <div style={toneStyle(character.tone)}>
      <PageHero
        title={character.name}
        eyebrow={character.title}
        icon="user"
        description={<span className="font-display italic text-white/85">&ldquo;{character.quote}&rdquo;</span>}
        tone={character.tone}
        scene={nation?.scene ?? TONE_SCENE[character.tone]}
        seed={seedFrom(character.slug)}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Wiki", href: "/wiki" }, { label: "Characters", href: "/wiki/characters" }, { label: character.name }]}
      >
        <div className="flex flex-wrap gap-2">
          <Badge tone={STATUS_TONE[character.status]} icon={character.status === "Legend" ? "star" : character.status === "Living" ? "heart" : "feather"}>{character.status}</Badge>
          {era && <Badge tone={era.tone} icon={era.icon} variant="outline">{era.name}</Badge>}
        </div>
      </PageHero>

      <div className="container-x grid gap-10 py-14 lg:grid-cols-[20rem_minmax(0,1fr)] lg:gap-14 lg:py-20">
        <aside className="space-y-5 lg:sticky lg:top-28 lg:h-fit">
          <TiltCard tone={character.tone} max={5} className="p-3">
            <PortraitFrame character={character} className="aspect-[4/4.4]" />
            <p className="px-2 pt-4 pb-1 text-center font-display text-lg font-bold text-white">{character.name}</p>
            <p className="px-2 pb-2 text-center text-xs text-mist/70">{character.title}</p>
          </TiltCard>
          <Card tone={character.tone} className="divide-y divide-white/8 p-0">
            <div className="flex items-center gap-3 p-4">
              {nation ? (
                <>
                  <span className="grid size-10 place-items-center rounded-xl" style={{ background: `${nation.colors.primary}33` }}><EmblemMark spec={nation.flag} className="size-6" /></span>
                  <div className="min-w-0">
                    <p className="text-[0.7rem] tracking-wide text-mist/60 uppercase">Nation</p>
                    <TransitionLink href={`/nations/${nation.slug}`} className="font-medium text-white hover:text-aether">{nation.name}</TransitionLink>
                  </div>
                </>
              ) : (
                <>
                  <span className="grid size-10 place-items-center rounded-xl bg-white/[0.06] text-mist"><Icon name="compass" /></span>
                  <div><p className="text-[0.7rem] tracking-wide text-mist/60 uppercase">Nation</p><p className="font-medium text-white">Unaffiliated</p></div>
                </>
              )}
            </div>
            {origin && (
              <div className="flex items-center gap-3 p-4" style={toneStyle(origin.tone)}>
                <span className="grid size-10 place-items-center rounded-xl tone-bg tone-text"><Icon name={origin.icon} /></span>
                <div>
                  <p className="text-[0.7rem] tracking-wide text-mist/60 uppercase">Origin</p>
                  <TransitionLink href={`/wiki/origins/${origin.slug}`} className="font-medium text-white hover:text-aether">{origin.name}</TransitionLink>
                </div>
              </div>
            )}
            {era && (
              <div className="flex items-center gap-3 p-4" style={toneStyle(era.tone)}>
                <span className="grid size-10 place-items-center rounded-xl tone-bg tone-text"><Icon name={era.icon} /></span>
                <div>
                  <p className="text-[0.7rem] tracking-wide text-mist/60 uppercase">Era</p>
                  <TransitionLink href={`/lore#era-${era.slug}`} className="font-medium text-white hover:text-aether">{era.name}</TransitionLink>
                  <p className="text-xs text-mist/60">{era.span}</p>
                </div>
              </div>
            )}
          </Card>
        </aside>

        <div className="min-w-0 space-y-14">
          <section>
            <p className="text-xs font-semibold tracking-[0.22em] uppercase tone-text">Biography</p>
            <h2 className="mt-2 font-display text-3xl font-bold text-white">Their story</h2>
            <div className="mt-6 max-w-3xl space-y-5 text-[1.05rem] leading-8 text-mist">
              {character.biography.map((paragraph, i) => (
                <Reveal key={i} delay={i * 0.05}>
                  <p className={i === 0 ? "first-letter:float-left first-letter:mr-3 first-letter:font-display first-letter:text-6xl first-letter:leading-[0.9] first-letter:font-bold first-letter:text-[rgb(var(--tone))]" : undefined}>{renderInline(paragraph)}</p>
                </Reveal>
              ))}
            </div>
          </section>

          <section>
            <p className="text-xs font-semibold tracking-[0.22em] uppercase tone-text">Deeds remembered</p>
            <h2 className="mt-2 font-display text-3xl font-bold text-white">Achievements</h2>
            <Stagger className="mt-6 grid gap-3 sm:grid-cols-2">
              {character.achievements.map((achievement) => (
                <StaggerItem key={achievement}>
                  <div className="flex h-full items-start gap-3 rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                    <span className="grid size-8 shrink-0 place-items-center rounded-lg tone-bg tone-text"><Icon name="trophy" className="size-4" /></span>
                    <p className="text-sm leading-relaxed text-mist/90">{renderInline(achievement)}</p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </section>

          <Reveal>
            <section className="relative overflow-hidden rounded-3xl border tone-border bg-gradient-to-br from-[rgb(var(--tone)/0.12)] via-white/[0.02] to-transparent p-6 sm:p-8">
              <div aria-hidden="true" className="absolute -right-10 -bottom-10 size-48 rounded-full bg-[radial-gradient(circle,rgb(var(--tone)/0.25),transparent_70%)]" />
              <p className="relative flex items-center gap-2 text-xs font-semibold tracking-[0.22em] uppercase tone-text"><Icon name="landmark" className="size-4" />Historical significance</p>
              <p className="relative mt-4 font-display text-xl leading-relaxed text-white sm:text-2xl">{renderInline(character.significance)}</p>
            </section>
          </Reveal>

          <RelatedLinks items={related} title="Connected people & stories" />

          <PrevNext
            label="More characters"
            prev={prev && { title: prev.name, href: `/wiki/characters/${prev.slug}` }}
            next={next && { title: next.name, href: `/wiki/characters/${next.slug}` }}
          />
        </div>
      </div>
    </div>
  );
}
