import type { Metadata } from "next";
import { ArrowRight, Check, HeartHandshake, ShieldCheck } from "lucide-react";
import { SceneArt } from "@/components/art/SceneArt";
import { PixelAvatar } from "@/components/art/PixelAvatar";
import { Accordion } from "@/components/ui/Accordion";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { PageHero } from "@/components/ui/PageHero";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { TransitionLink } from "@/components/layout/TransitionLink";
import { formatCurrency, formatDate } from "@/lib/format";
import { renderInline } from "@/lib/inline";
import { siteConfig } from "@/config/site";
import { supportFaq } from "@/data/faq";
import { fundingGoals, supportTiers } from "@/data/support";
import { supporters } from "@/data/supporters";

export const metadata: Metadata = {
  title: "Support",
  description: "Help keep Aurelune alive. Every contribution supports hosting, development and community events.",
};

export default function SupportPage() {
  return (
    <>
      <PageHero
        title={<>Support <span className="text-gradient-gold">Origin Ascendants</span></>}
        eyebrow="Keep the world alive"
        icon="hand-heart"
        description="Every contribution helps fund hosting, development, events and the next chapter of Aurelune. Support is always optional—and never a shortcut to power."
        scene="festival"
        seed={48}
        tone="solar"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Support" }]}
        align="center"
      >
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button href="#tiers" variant="gold" icon={<HeartHandshake />}>Explore support tiers</Button>
          <Button href="#goals" variant="secondary" iconRight={<ArrowRight />}>See where it goes</Button>
        </div>
      </PageHero>

      <div className="container-x">
        <Reveal className="mx-auto -mt-7 max-w-4xl">
          <div className="glass-strong relative z-10 flex flex-col items-center gap-4 rounded-3xl border border-verdant/25 p-5 text-center shadow-card sm:flex-row sm:text-left">
            <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-verdant/15 text-verdant">
              <ShieldCheck className="size-6" />
            </span>
            <p className="text-sm leading-relaxed text-mist sm:text-base">
              <strong className="text-verdant">Origin Ascendants is NOT pay-to-win.</strong> Ranks and Deeds are earned in-game. Supporter rewards are cosmetic, community-based or convenience-focused only—no combat, economy, claim or Origin advantages.
            </p>
          </div>
        </Reveal>

        <section id="tiers" className="scroll-mt-28 py-24 sm:py-28">
          <Reveal className="mx-auto mb-12 max-w-2xl text-center">
            <p className="mb-3 text-xs font-semibold tracking-[0.25em] text-solar uppercase">Choose your path</p>
            <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">Two ways to support</h2>
            <p className="mt-4 leading-relaxed text-mist">Every tier helps the same living world grow. Choose the one that feels right for you.</p>
          </Reveal>
          <Stagger className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-2" gap={0.14}>
            {supportTiers.map((tier) => (
              <StaggerItem key={tier.id}>
                <Card
                  tone={tier.tone}
                  className={`relative h-full overflow-hidden p-7 sm:p-9 ${tier.recommended ? "border-solar/40 shadow-[0_0_60px_-28px_rgb(251_191_36/0.55)]" : ""}`}
                >
                  {tier.recommended && (
                    <div className="absolute top-0 right-0 rounded-bl-2xl bg-gradient-to-r from-solar to-[#f59e0b] px-4 py-2 text-xs font-bold tracking-wider text-night uppercase">
                      Recommended
                    </div>
                  )}
                  <div aria-hidden="true" className="pointer-events-none absolute -top-20 -right-20 size-56 rounded-full bg-[rgb(var(--tone)/0.12)] blur-3xl" />
                  <div className="relative">
                    <span className="tone-bg tone-text mb-5 grid size-12 place-items-center rounded-2xl">
                      <Icon name={tier.icon} className="size-6" />
                    </span>
                    <p className="text-xs font-bold tracking-[0.2em] tone-text">{tier.name}</p>
                    <h3 className="mt-2 font-display text-2xl font-bold text-white">{tier.tagline}</h3>
                    <p className="mt-5 flex items-baseline gap-2">
                      <span className="font-display text-4xl font-bold text-white">{tier.price}</span>
                      <span className="text-sm text-mist/80">{tier.period}</span>
                    </p>
                    <div className="my-7 h-px bg-gradient-to-r from-white/20 via-white/10 to-transparent" />
                    <ul className="space-y-3">
                      {tier.benefits.map((benefit) => (
                        <li key={benefit.text} className="flex items-start gap-3 text-sm text-mist">
                          <Check className="mt-0.5 size-4 shrink-0 tone-text" />
                          <span>{benefit.text}</span>
                        </li>
                      ))}
                    </ul>
                    <Button href={siteConfig.support.url} external variant={tier.recommended ? "gold" : "primary"} fullWidth className="mt-8">
                      Support with {tier.name}
                    </Button>
                  </div>
                </Card>
              </StaggerItem>
            ))}
          </Stagger>
          <p className="mx-auto mt-5 max-w-3xl text-center text-xs leading-relaxed text-mist/60">
            Support tier names and prices are sample configuration. Contributions are voluntary, not investments; benefits may change. Please review our             <TransitionLink className="underline underline-offset-4 hover:text-white" href="/terms-of-service">Terms of Service</TransitionLink>.
          </p>
        </section>

        <section id="goals" className="scroll-mt-28 border-t border-white/8 py-24 sm:py-28">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <Reveal>
              <p className="mb-3 text-xs font-semibold tracking-[0.25em] text-aether uppercase">Every contribution has a home</p>
              <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">Where support goes</h2>
              <p className="mt-5 leading-relaxed text-mist">We keep our priorities visible: reliable hosting first, then the tools and gatherings that make this community feel like a world.</p>
              <div className="mt-6 flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm leading-relaxed text-mist/80">
                <Icon name="info" className="mt-0.5 size-4 shrink-0 text-aether" />
                <span>Amounts below are illustrative targets. Contributions beyond a goal become a reserve for future improvements.</span>
              </div>
            </Reveal>
            <Stagger className="space-y-4" gap={0.12}>
              {fundingGoals.map((goal) => {
                const percent = Math.min(100, Math.round((goal.raised / goal.goal) * 100));
                return (
                  <StaggerItem key={goal.id}>
                    <Card tone={goal.tone} className="p-5 sm:p-6">
                      <div className="flex items-start gap-4">
                        <span className="tone-bg tone-text grid size-11 shrink-0 place-items-center rounded-xl">
                          <Icon name={goal.icon} />
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                            <h3 className="font-semibold text-white">{goal.title}</h3>
                            <p className="font-mono text-sm text-mist">
                              <span className="font-semibold text-white">{formatCurrency(goal.raised, goal.currency)}</span>
                              <span className="text-mist/60"> / {formatCurrency(goal.goal, goal.currency)}</span>
                            </p>
                          </div>
                          <p className="mt-1 text-sm leading-relaxed text-mist/75">{goal.description}</p>
                          <div className="mt-4 flex items-center gap-3">
                            <ProgressBar value={percent} label={`${goal.title} funding`} tone={goal.tone} className="h-2.5" />
                            <span className="w-10 text-right font-mono text-xs text-mist/80">{percent}%</span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </StaggerItem>
                );
              })}
            </Stagger>
          </div>
        </section>

        <section className="border-t border-white/8 py-24 sm:py-28">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
            <Reveal>
              <p className="mb-3 text-xs font-semibold tracking-[0.25em] text-arcane uppercase">A little gratitude</p>
              <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">The supporter wall</h2>
              <p className="mt-3 max-w-xl leading-relaxed text-mist">A warm thank-you to community members who help keep Aurelune aloft.</p>
            </Reveal>
            <Badge tone="arcane" icon="heart">Thank you for being here</Badge>
          </div>
          <Stagger className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4" gap={0.05}>
            {supporters.map((supporter) => {
              const tier = supportTiers.find((item) => item.id === supporter.tier);
              return (
                <StaggerItem key={supporter.username}>
                  <Card tone={tier?.tone ?? "aether"} className="flex items-center gap-3 p-3 sm:gap-4 sm:p-4">
                    <PixelAvatar name={supporter.username} live={false} className="size-11 rounded-xl border border-white/10 sm:size-12" />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-white">{supporter.username}</p>
                      <p className="mt-0.5 text-xs tone-text">{tier?.name ?? "Supporter"}</p>
                      <p className="mt-1 text-[0.65rem] text-mist/60">Since {formatDate(supporter.joined, "month")}</p>
                    </div>
                    <span className="sr-only">Sample supporter profile</span>
                  </Card>
                </StaggerItem>
              );
            })}
          </Stagger>
          <p className="mt-5 text-center text-xs text-mist/55">Sample supporter names shown. The live wall should include supporters only with their opt-in.</p>
        </section>

        <section className="border-t border-white/8 py-24 sm:py-28">
          <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-[0.7fr_1.3fr]">
            <Reveal>
              <p className="mb-3 text-xs font-semibold tracking-[0.25em] text-verdant uppercase">Good questions</p>
              <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">Support FAQ</h2>
              <p className="mt-4 leading-relaxed text-mist">Support is a gift to the community. We want every part of it to be clear and fair.</p>
            </Reveal>
            <Accordion
              items={supportFaq.map((item) => ({
                id: item.id,
                title: item.question,
                tone: "verdant",
                content: (
                  <div className="space-y-3 text-sm leading-relaxed text-mist">
                    {item.answer.map((paragraph, index) => <p key={index}>{renderInline(paragraph)}</p>)}
                  </div>
                ),
              }))}
            />
          </div>
        </section>

        <Reveal>
          <div className="relative mb-24 overflow-hidden rounded-[2rem] border border-white/10 p-8 text-center sm:p-12">
            <SceneArt kind="skycity" seed={91} accent="#FBBF24" className="absolute inset-0 -z-10 opacity-25" />
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-night/95 via-night/80 to-night/90" />
            <p className="text-xs font-semibold tracking-[0.22em] text-solar uppercase">The world is better together</p>
            <h2 className="mt-3 font-display text-2xl font-bold text-white sm:text-3xl">Not ready to support? You still belong here.</h2>
            <p className="mx-auto mt-3 max-w-2xl text-mist">Join the conversation, share a build, help a new Wanderer—or just come see what the sky is hiding.</p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Button href={siteConfig.discord.invite} icon={<HeartHandshake />}>Join the community</Button>
              <Button href="/wiki" variant="secondary" iconRight={<ArrowRight />}>Explore the wiki</Button>
            </div>
          </div>
        </Reveal>
      </div>
    </>
  );
}
