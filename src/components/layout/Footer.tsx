import { ArrowUpRight } from "lucide-react";
import { LogoMark } from "@/components/art/LogoMark";
import { MountainRange } from "@/components/art/MountainRange";
import { Starfield } from "@/components/art/Starfield";
import { DiscordIcon } from "@/components/icons/BrandIcons";
import { TransitionLink } from "@/components/layout/TransitionLink";
import { Button } from "@/components/ui/Button";
import { footerGroups, siteConfig } from "@/config/site";

export function Footer() {
  return (
    <footer className="relative mt-32 bg-void">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-full h-32 overflow-hidden">
        <MountainRange seed={14} peaks={6} top="#27376a" bottom="#162044" amplitude={0.75} className="absolute inset-x-0 bottom-0 h-full opacity-50" />
        <MountainRange seed={5} peaks={8} top="#1a2750" bottom="#070b18" amplitude={0.6} snow snowColor="#7dd3fc" className="absolute inset-x-0 bottom-0 h-[78%]" />
      </div>

      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <Starfield count={50} seed={31} height={0.7} className="opacity-40" />
        <div className="absolute -bottom-40 left-1/2 h-80 w-[60rem] -translate-x-1/2 rounded-full bg-aether/[0.07] blur-3xl" />
      </div>

      <div className="container-x relative py-16">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_repeat(3,1fr)]">
          <div className="max-w-sm">
            <TransitionLink href="/" className="group inline-flex items-center gap-3" aria-label="Origin Ascendants home">
              <LogoMark className="size-11 transition-transform duration-500 ease-out-expo group-hover:scale-105" />
              <span className="font-display text-base font-semibold tracking-[0.22em]">
                ORIGIN <span className="text-gradient-sky">ASCENDANTS</span>
              </span>
            </TransitionLink>
            <p className="mt-5 text-sm leading-relaxed text-mist/80">
              A shared space for conversation, community knowledge and the people who make Origin Ascendants what it is.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href={siteConfig.discord.invite} external size="sm" icon={<DiscordIcon />}>
                Join Discord
              </Button>
              <Button href="/wiki" size="sm" variant="secondary">
                Community Wiki
              </Button>
            </div>
          </div>

          {footerGroups.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <h2 className="font-display text-xs font-semibold uppercase tracking-[0.32em] text-aether">{group.title}</h2>
              <ul className="mt-5 space-y-3 text-sm">
                {group.links.map((link) => (
                  <li key={link.label}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-1 text-mist/80 transition-all duration-300 hover:translate-x-1 hover:text-white"
                      >
                        {link.label}
                        <ArrowUpRight aria-hidden="true" className="size-3.5 opacity-60 transition-opacity group-hover:opacity-100" />
                      </a>
                    ) : (
                      <TransitionLink
                        href={link.href}
                        className="inline-block text-mist/80 transition-all duration-300 hover:translate-x-1 hover:text-white"
                      >
                        {link.label}
                      </TransitionLink>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-14 border-t border-white/10 pt-8 text-sm text-mist/70">
          <p className="font-medium text-mist">© Origin Ascendants SMP. All Rights Reserved.</p>
          <p className="mt-2">Origin Ascendants is not affiliated with Mojang Studios or Microsoft.</p>
          <p className="mt-1">Minecraft is a trademark of Mojang Studios.</p>
        </div>
      </div>
    </footer>
  );
}
