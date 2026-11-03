import type { Metadata } from "next";
import { ArrowUpRight, BadgeCheck, Shield, Sparkles } from "lucide-react";
import { PixelAvatar } from "@/components/art/PixelAvatar";
import { PageHero } from "@/components/ui/PageHero";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { siteConfig } from "@/config/site";
import { staffMembers } from "@/data/staff";

export const metadata: Metadata = {
  title: "Staff",
  description: "Meet the volunteer team caring for the Origin Ascendants community.",
};

const roleOrder = ["Owner", "Administrator", "Moderator", "Builder"] as const;

export default function StaffPage() {
  return (
    <>
      <PageHero
        title={<>The people behind <span className="text-gradient-sky">the banners.</span></>}
        eyebrow="Community team"
        icon="users"
        description="A friendly, volunteer team of worldbuilders, guides and moderators helps Aurelune feel like home."
        scene="skycity"
        seed={34}
        tone="arcane"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Staff" }]}
        align="center"
      >
        <Button href={siteConfig.discord.invite}>Say hello in Discord</Button>
      </PageHero>

      <div className="container-x py-16 sm:py-20">
        <Reveal className="mx-auto mb-14 flex max-w-4xl items-center gap-4 rounded-2xl border border-aether/15 bg-aether/[0.04] p-5">
          <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-aether/15 text-aether"><Shield className="size-5" /></span>
          <p className="text-sm leading-relaxed text-mist">Staff remain neutral in nation conflicts. Their role is to keep the community safe and fair—not to decide which banner wins.</p>
        </Reveal>

        <div className="mx-auto max-w-6xl space-y-14">
          {roleOrder.map((role) => {
            const members = staffMembers.filter((member) => member.role === role);
            if (!members.length) return null;
            const RoleIcon = role === "Owner" ? Sparkles : role === "Administrator" ? BadgeCheck : role === "Moderator" ? Shield : Sparkles;
            return (
              <section key={role}>
                <div className="mb-6 flex items-center gap-3">
                  <span className="grid size-9 place-items-center rounded-xl bg-white/[0.06] text-aether"><RoleIcon className="size-4" /></span>
                  <div>
                    <p className="text-xs font-semibold tracking-[0.18em] text-aether uppercase">The team</p>
                    <h2 className="font-display text-2xl font-bold text-white">{role}{members.length > 1 ? "s" : ""}</h2>
                  </div>
                </div>
                <Stagger className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3" gap={0.08}>
                  {members.map((member) => (
                    <StaggerItem key={member.slug}>
                      <Card tone={member.tone} className="h-full p-5 sm:p-6">
                        <div className="flex items-center gap-4">
                          <PixelAvatar name={member.username} live={false} className="size-16 rounded-2xl border border-white/10" />
                          <div className="min-w-0">
                            <Badge tone={member.tone} size="sm">{member.role}</Badge>
                            <h3 className="mt-2 truncate font-display text-lg font-bold text-white">{member.username}</h3>
                            <p className="mt-1 text-xs leading-relaxed text-mist/70">{member.position}</p>
                          </div>
                        </div>
                        <p className="mt-5 text-sm leading-relaxed text-mist/85">{member.bio}</p>
                        {member.socials.length > 0 && (
                          <div className="mt-5 flex flex-wrap gap-2 border-t border-white/8 pt-4">
                            {member.socials.map((social) => (
                              <a
                                key={`${member.slug}-${social.platform}`}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-mist transition-colors hover:border-white/25 hover:text-white"
                              >
                                {social.label}<ArrowUpRight className="size-3" />
                              </a>
                            ))}
                          </div>
                        )}
                      </Card>
                    </StaggerItem>
                  ))}
                </Stagger>
              </section>
            );
          })}
        </div>
      </div>
    </>
  );
}
