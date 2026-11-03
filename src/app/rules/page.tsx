import type { Metadata } from "next";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Accordion } from "@/components/ui/Accordion";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { renderInline } from "@/lib/inline";
import { toneStyle } from "@/lib/tones";
import { ruleSections } from "@/data/rules";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Community rules",
  description: "The shared standards that keep Origin Ascendants welcoming, fair and fun.",
};

export default function RulesPage() {
  return (
    <>
      <PageHero
        title={<>A good world is <span className="text-gradient-sky">built together.</span></>}
        eyebrow="Community standards"
        icon="shield-check"
        description="Aurelune is a shared story. These rules protect the people, places and trust that make it worth exploring."
        scene="citadel"
        seed={51}
        tone="aether"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Rules" }]}
        align="center"
      >
        <div className="flex flex-wrap justify-center gap-3">
          <Button href={siteConfig.discord.invite} variant="secondary">Ask staff a question</Button>
          <Button href="/terms-of-service" variant="ghost" iconRight={<ArrowRight />}>Terms of Service</Button>
        </div>
      </PageHero>

      <div className="container-x py-16 sm:py-20">
        <Reveal className="mx-auto mb-12 flex max-w-4xl items-start gap-4 rounded-2xl border border-verdant/20 bg-verdant/[0.05] p-5 sm:p-6">
          <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-verdant/15 text-verdant"><ShieldCheck className="size-5" /></span>
          <div>
            <h2 className="font-semibold text-white">The short version: be kind and play fair.</h2>
            <p className="mt-1.5 text-sm leading-relaxed text-mist/80">These standards apply in-game, on Discord and anywhere else connected to the community. Supporter status never changes the rules.</p>
          </div>
        </Reveal>

        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[minmax(0,1fr)_18rem]">
          <div className="space-y-12">
            {ruleSections.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-28" style={toneStyle(section.tone)}>
                <div className="mb-5 flex items-start gap-4">
                  <span className="tone-bg tone-text mt-0.5 grid size-11 shrink-0 place-items-center rounded-xl">
                    <Icon name={section.icon} />
                  </span>
                  <div>
                    <p className="text-xs font-semibold tracking-[0.2em] tone-text uppercase">{section.id.replaceAll("-", " ")}</p>
                    <h2 className="mt-1 font-display text-2xl font-bold text-white sm:text-3xl">{section.title}</h2>
                    <p className="mt-2 leading-relaxed text-mist/75">{section.summary}</p>
                  </div>
                </div>

                <Accordion
                  items={section.rules.map((rule, index) => ({
                    id: `${section.id}-${index}`,
                    title: rule.title,
                    tone: section.tone,
                    content: <p className="text-sm leading-relaxed text-mist">{renderInline(rule.text)}</p>,
                  }))}
                />

                {section.ladder && (
                  <div className="mt-6">
                    <h3 className="mb-4 text-sm font-semibold tracking-wide text-mist uppercase">Progressive response</h3>
                    <Stagger className="grid gap-3 sm:grid-cols-2" gap={0.06}>
                      {section.ladder.map((step) => (
                        <StaggerItem key={step.level}>
                          <Card tone={step.tone} className="h-full p-4">
                            <Badge tone={step.tone}>{step.level}</Badge>
                            <h4 className="mt-3 font-semibold text-white">{step.name}</h4>
                            <p className="mt-2 text-sm leading-relaxed text-mist/80">{step.description}</p>
                            <p className="mt-3 text-xs font-medium tone-text">{step.duration}</p>
                          </Card>
                        </StaggerItem>
                      ))}
                    </Stagger>
                  </div>
                )}
                {section.footnote && <p className="mt-4 rounded-xl border border-aether/15 bg-aether/[0.04] p-4 text-sm leading-relaxed text-mist/80">{renderInline(section.footnote)}</p>}
              </section>
            ))}
          </div>
          <aside className="space-y-4 lg:sticky lg:top-28 lg:h-fit">
            <Card tone="aether" className="p-5">
              <h2 className="font-semibold text-white">Need help?</h2>
              <p className="mt-2 text-sm leading-relaxed text-mist/75">If you are unsure how a rule applies, ask before acting. Staff are here to help.</p>
              <Button href={siteConfig.discord.invite} size="sm" className="mt-4 w-full">Open a Discord ticket</Button>
            </Card>
            <Card tone="solar" className="p-5">
              <h2 className="font-semibold text-white">Appeal with context.</h2>
              <p className="mt-2 text-sm leading-relaxed text-mist/75">Use a private appeal ticket. Where possible, a different staff member will review the evidence.</p>
            </Card>
          </aside>
        </div>
      </div>
    </>
  );
}
