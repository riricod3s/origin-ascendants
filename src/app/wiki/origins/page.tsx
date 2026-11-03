import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { OriginsExplorer } from "@/components/wiki/OriginsExplorer";
import { origins } from "@/lib/content";

export const metadata: Metadata = {
  title: "Origins",
  description: "Choose unique powers and abilities that shape your journey. Explore every Origin of Aurelune.",
};

export default function OriginsPage() {
  return (
    <>
      <PageHero
        title={<>Choose the gift that <span className="text-gradient-sky">shapes your journey.</span></>}
        eyebrow="Ascendants Wiki · Origins"
        icon="sparkles"
        description={`${origins.length} Origins awoke when the Heartstar fell. Each brings its own powers, quirks and stories—and none of them is the "right" one.`}
        scene="crystal"
        seed={41}
        tone="aether"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Wiki", href: "/wiki" }, { label: "Origins" }]}
      >
        <Button href="/wiki/guides/origins-guide" variant="secondary" iconRight={<ArrowRight />}>How to choose an Origin</Button>
      </PageHero>
      <section className="container-x py-14 sm:py-20">
        <Reveal>
          <OriginsExplorer origins={origins} />
        </Reveal>
      </section>
    </>
  );
}
