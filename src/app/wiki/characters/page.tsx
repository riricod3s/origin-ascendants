import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { CharacterCard } from "@/components/wiki/CharacterCard";
import { allCharacters, eras } from "@/lib/content";

export const metadata: Metadata = {
  title: "Characters",
  description: "Profiles of the legends, leaders and wanderers who shaped the history of Aurelune.",
};

export default function CharactersPage() {
  const groups = eras
    .map((era) => ({ era, people: allCharacters.filter((character) => character.era === era.slug) }))
    .filter((group) => group.people.length > 0);

  return (
    <>
      <PageHero
        title={<>The faces behind <span className="text-gradient-sky">the chronicles.</span></>}
        eyebrow="Ascendants Wiki · Characters"
        icon="users"
        description="Legends, leaders, explorers and keepers of memory—the people whose choices became Aurelune's history."
        scene="observatory"
        seed={58}
        tone="arcane"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Wiki", href: "/wiki" }, { label: "Characters" }]}
      />
      <div className="container-x space-y-20 py-14 sm:py-20">
        {groups.map(({ era, people }) => (
          <section key={era.slug}>
            <SectionHeading eyebrow={era.span} title={era.name} description={era.description} icon={era.icon} tone={era.tone} />
            <Stagger className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {people.map((character) => (
                <StaggerItem key={character.slug} className="h-full"><CharacterCard character={character} /></StaggerItem>
              ))}
            </Stagger>
          </section>
        ))}
      </div>
    </>
  );
}
