import type { Metadata } from "next";
import { ArrowDown, ArrowRight, BookOpen, MessageCircle, Users, Sparkles, CalendarDays, MessageSquarePlus } from "lucide-react";
import { HeroScene } from "@/components/art/HeroScene";
import { CommunityError } from "@/components/community/CommunityError";
import { CommunitySetupNotice } from "@/components/community/CommunitySetupNotice";
import { ForumThreadList } from "@/components/community/ForumThreadList";
import { WikiPageList } from "@/components/community/WikiPageList";
import { TransitionLink } from "@/components/layout/TransitionLink";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { siteConfig } from "@/config/site";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Community Hub",
  description: siteConfig.description,
};

const pathways = [
  { title: "Join the conversation", description: "Ask a question, share an idea, or catch up on what members are talking about.", href: "/forum", icon: MessageCircle, tone: "aether" as const },
  { title: "Explore the community wiki", description: "Find practical guides and help keep shared community knowledge current.", href: "/wiki", icon: BookOpen, tone: "arcane" as const },
  { title: "Meet the members", description: "Discover community profiles, contributions and the people behind the projects.", href: "/members", icon: Users, tone: "verdant" as const },
];

export default async function Home() {
  const supabase = await createClient();
  if (!supabase) {
    return (
      <>
        <Hero />
        <section className="container-x -mt-7 pb-16">
          <div className="relative z-10"><CommunitySetupNotice /></div>
          <Pathways />
        </section>
      </>
    );
  }

  const [
    { data: threads, error: threadsError },
    { data: pages, error: pagesError },
    { data: categories, error: categoriesError },
    { data: wikiCategories, error: wikiCategoriesError },
    { data: announcements, error: announcementsError },
    profilesCount,
    threadsCount,
    pagesCount,
  ] = await Promise.all([
    supabase.from("forum_threads").select("id,title,reply_count,last_activity_at,pinned,category_id,author_id").eq("status", "published").order("pinned", { ascending: false }).order("last_activity_at", { ascending: false }).limit(5),
    supabase.from("wiki_pages").select("id,slug,title,summary,category_id,updated_at").eq("status", "published").order("updated_at", { ascending: false }).limit(4),
    supabase.from("forum_categories").select("id,name,slug"),
    supabase.from("wiki_categories").select("id,name,slug"),
    supabase.from("announcements").select("id,title,body,pinned,created_at").eq("published", true).order("pinned", { ascending: false }).order("created_at", { ascending: false }).limit(3),
    supabase.from("profiles").select("id", { count: "exact", head: true }),
    supabase.from("forum_threads").select("id", { count: "exact", head: true }).eq("status", "published"),
    supabase.from("wiki_pages").select("id", { count: "exact", head: true }).eq("status", "published"),
  ]);
  const firstError = threadsError ?? pagesError ?? categoriesError ?? wikiCategoriesError ?? announcementsError ?? profilesCount.error ?? threadsCount.error ?? pagesCount.error;
  if (firstError) {
    return (
      <>
        <Hero />
        <section className="container-x -mt-7 pb-16">
          <div className="relative z-10"><CommunityError message={firstError.message} /></div>
          <Pathways />
        </section>
      </>
    );
  }

  const profileIds = [...new Set((threads ?? []).map((thread) => thread.author_id))];
  const { data: profiles, error: profilesError } = profileIds.length
    ? await supabase.from("profiles").select("id,username,display_name").in("id", profileIds)
    : { data: [], error: null };
  if (profilesError) {
    return <><Hero /><section className="container-x -mt-7 pb-16"><div className="relative z-10"><CommunityError message={profilesError.message} /></div><Pathways /></section></>;
  }

  return (
    <>
      <Hero />
      <section id="community" className="container-x -mt-6 scroll-mt-24 pb-16">
        <div className="relative z-10 grid gap-3 sm:grid-cols-3">
          <StatCard label="Community members" value={profilesCount.count ?? 0} icon={<Users className="size-5" />} />
          <StatCard label="Forum discussions" value={threadsCount.count ?? 0} icon={<MessageCircle className="size-5" />} />
          <StatCard label="Wiki articles" value={pagesCount.count ?? 0} icon={<BookOpen className="size-5" />} />
        </div>
      </section>
      <Pathways />
      <section className="container-x grid gap-8 pb-24 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        <Card className="p-6 sm:p-8">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div><p className="text-xs font-semibold tracking-[0.2em] text-aether uppercase">From the forums</p><h2 className="mt-2 font-display text-2xl font-bold text-white">Latest discussions</h2></div>
            <TransitionLink href="/forum" className="inline-flex items-center gap-2 text-sm font-semibold text-aether hover:text-white">View forum <ArrowRight className="size-4" /></TransitionLink>
          </div>
          <ForumThreadList threads={threads ?? []} categories={categories ?? []} profiles={profiles ?? []} />
        </Card>
        <Card className="p-6 sm:p-8">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div><p className="text-xs font-semibold tracking-[0.2em] text-arcane uppercase">Recently improved</p><h2 className="mt-2 font-display text-2xl font-bold text-white">Wiki updates</h2></div>
            <TransitionLink href="/wiki" className="inline-flex items-center gap-2 text-sm font-semibold text-aether hover:text-white">Explore wiki <ArrowRight className="size-4" /></TransitionLink>
          </div>
          <WikiPageList pages={pages ?? []} categories={wikiCategories ?? []} />
        </Card>
      </section>
      <section className="relative isolate overflow-hidden border-y border-white/5 bg-[#111b35] py-20 sm:py-24">
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,rgba(56,189,248,0.1),transparent_55%)]" />
        <div className="container-x grid gap-9 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-solar uppercase"><Sparkles className="size-4" /> Community notices</p>
            <h2 className="mt-4 font-display text-3xl font-bold text-white sm:text-4xl">What’s happening.</h2>
            <p className="mt-4 max-w-xl leading-relaxed text-mist/75">Official announcements and community highlights, all in one place.</p>
            <Button href="/announcements" className="mt-6" variant="secondary" icon={<CalendarDays className="size-4" />}>All announcements</Button>
          </div>
          <div className="space-y-3">
            {(announcements ?? []).length ? (announcements ?? []).map((announcement) => (
              <Card key={announcement.id} className="p-5">
                <p className="text-xs text-mist/45">{announcement.pinned ? "Pinned announcement" : new Date(announcement.created_at).toLocaleDateString()}</p>
                <h3 className="mt-2 font-display text-lg font-bold text-white">{announcement.title}</h3>
                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-mist/70">{announcement.body}</p>
              </Card>
            )) : <Card className="p-6"><p className="text-sm text-mist/65">No announcements yet. Check back soon or join our Discord for community updates.</p><Button href={siteConfig.discord.invite} external className="mt-4" size="sm">Join Discord</Button></Card>}
          </div>
        </div>
      </section>
      <section className="container-x py-20 sm:py-24">
        <SectionHeading eyebrow="A community-built space" title={<>Make yourself <span className="text-gradient-sky">at home.</span></>} description="Whether you’re here to ask, share, learn or help others, there’s a place for you in Origin Ascendants." align="center" icon="users" />
        <div className="mt-8 flex justify-center"><Button href="/register" icon={<MessageSquarePlus className="size-4" />}>Create your account</Button></div>
      </section>
    </>
  );
}

function Hero() {
  return (
    <section className="relative isolate min-h-[min(760px,95svh)] overflow-hidden bg-night">
      <div aria-hidden="true" className="absolute inset-0 -z-20"><HeroScene /></div>
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-b from-night/20 via-night/15 to-night/90" />
      <div className="container-x relative flex min-h-[min(760px,95svh)] items-start pt-[calc(var(--nav-h)+4.5rem)] pb-28 sm:items-center sm:pt-28">
        <div className="max-w-4xl text-center sm:text-left">
          <p className="enter mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-night/35 px-4 py-2 text-[0.68rem] font-semibold tracking-[0.22em] text-solar uppercase backdrop-blur-md sm:text-xs">
            <span className="size-1.5 animate-pulse rounded-full bg-verdant shadow-[0_0_10px_#4ade80]" />
            The Origin Ascendants community
          </p>
          <h1 className="enter font-display text-[clamp(2rem,8vw,6.6rem)] leading-[1.05] font-bold tracking-[0.015em] text-white drop-shadow-[0_6px_40px_rgba(2,6,23,0.75)]">
            ORIGIN <span className="text-gradient-sky">ASCENDANTS</span>
          </h1>
          <p className="enter mt-5 font-display text-lg leading-relaxed text-white/90 drop-shadow-lg sm:text-2xl">
            A community shaped by its members.<br className="sm:hidden" /> A place to share what you know.
          </p>
          <div className="enter mt-8 flex flex-wrap justify-center gap-3 sm:justify-start">
            <Button href="/register" size="lg" icon={<Users />}>Join the community</Button>
            <Button href="/forum" size="lg" variant="secondary" iconRight={<ArrowRight />}>Explore the forums</Button>
          </div>
          <p className="enter mt-5 text-xs text-mist/75 sm:text-sm">Meet people · Share ideas · Build knowledge together</p>
        </div>
        <a href="#community" className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs tracking-[0.18em] text-white/70 uppercase transition-colors hover:text-white sm:flex">
          Explore the community <ArrowDown className="size-4 animate-bounce" />
        </a>
      </div>
    </section>
  );
}

function StatCard({ label, value, icon }: { label: string; value: number; icon: React.ReactNode }) {
  return <Card className="flex items-center gap-4 p-5"><span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-aether/10 text-aether">{icon}</span><div><p className="font-display text-2xl font-bold text-white">{value.toLocaleString()}</p><p className="mt-0.5 text-xs text-mist/55">{label}</p></div></Card>;
}

function Pathways() {
  return (
    <section className="container-x py-14 sm:py-20">
      <SectionHeading eyebrow="Your community, your way" title={<>Find your place <span className="text-gradient-gold">here.</span></>} description="A shared space for conversation, useful knowledge and the people who make Origin Ascendants what it is." align="center" icon="sparkles" />
      <Stagger className="mt-10 grid gap-4 md:grid-cols-3" gap={0.08}>
        {pathways.map(({ title, description, href, icon: Icon, tone }) => (
          <StaggerItem key={href}>
            <Card tone={tone} interactive as="article" className="group/path h-full p-6 sm:p-7">
              <TransitionLink href={href} aria-label={title} className="absolute inset-0 z-10 rounded-[inherit]" />
              <div className="pointer-events-none relative z-0">
                <span className="tone-bg tone-text mb-5 grid size-12 place-items-center rounded-2xl transition-transform duration-500 group-hover/path:scale-110"><Icon className="size-6" /></span>
                <h3 className="font-display text-xl font-bold text-white">{title}</h3>
                <p className="mt-3 leading-relaxed text-mist/80">{description}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold tone-text">Explore <ArrowRight className="size-4 transition-transform group-hover/path:translate-x-1" /></span>
              </div>
            </Card>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
