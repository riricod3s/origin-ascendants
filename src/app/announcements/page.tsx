import type { Metadata } from "next";
import { CalendarDays, Pin } from "lucide-react";
import { CommunityError } from "@/components/community/CommunityError";
import { CommunitySetupNotice } from "@/components/community/CommunitySetupNotice";
import { MarkdownContent } from "@/components/community/MarkdownContent";
import { PageHero } from "@/components/ui/PageHero";
import { Card } from "@/components/ui/Card";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "Community Announcements", description: "Official news and announcements from Origin Ascendants." };

export default async function AnnouncementsPage() {
  const supabase = await createClient();
  if (!supabase) return <><PageHero title="Announcements" /><section className="container-x py-12"><CommunitySetupNotice /></section></>;
  const { data: announcements, error } = await supabase.from("announcements").select("id,title,body,pinned,created_at,author_id").eq("published", true).order("pinned", { ascending: false }).order("created_at", { ascending: false }).limit(50);
  if (error) return <><PageHero title="Announcements" /><section className="container-x py-12"><CommunityError message={error.message} /></section></>;
  const authors = [...new Set((announcements ?? []).map((item) => item.author_id))];
  const { data: profiles, error: profilesError } = authors.length ? await supabase.from("profiles").select("id,username,display_name").in("id", authors) : { data: [], error: null };
  if (profilesError) return <><PageHero title="Announcements" /><section className="container-x py-12"><CommunityError message={profilesError.message} /></section></>;
  const profileById = new Map((profiles ?? []).map((profile) => [profile.id, profile]));

  return (
    <>
      <PageHero title="Community announcements" eyebrow="News from the community" icon="megaphone" description="Official updates, notices and things happening around Origin Ascendants." scene="observatory" />
      <section className="container-x py-12">
        <ul className="mx-auto max-w-4xl space-y-5">
          {(announcements ?? []).map((announcement) => {
            const author = profileById.get(announcement.author_id);
            return <li key={announcement.id}><Card className="p-6 sm:p-8"><div className="flex items-center justify-between gap-4"><p className="flex items-center gap-2 text-xs text-mist/45">{announcement.pinned && <Pin className="size-3.5 text-solar" />}<CalendarDays className="size-3.5" />{new Date(announcement.created_at).toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" })}</p>{author && <span className="text-xs text-mist/45">By {author.display_name || author.username}</span>}</div><h2 className="mt-4 font-display text-2xl font-bold text-white">{announcement.title}</h2><div className="mt-4"><MarkdownContent content={announcement.body} /></div></Card></li>;
          })}
          {(announcements ?? []).length === 0 && <li><Card className="p-8 text-center text-sm text-mist/60">No announcements yet. Check back soon.</Card></li>}
        </ul>
      </section>
    </>
  );
}
