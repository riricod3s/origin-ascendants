import { ArrowRight, MessageCircle, Pin } from "lucide-react";
import { TransitionLink } from "@/components/layout/TransitionLink";

type Thread = {
  id: string;
  title: string;
  reply_count: number;
  last_activity_at: string;
  pinned: boolean;
  category_id: string;
  author_id: string;
};

type Category = { id: string; name: string; slug: string };
type Profile = { id: string; username: string; display_name: string };

export function ForumThreadList({
  threads,
  categories,
  profiles,
}: {
  threads: Thread[];
  categories: Category[];
  profiles: Profile[];
}) {
  const categoryById = new Map(categories.map((category) => [category.id, category]));
  const profileById = new Map(profiles.map((profile) => [profile.id, profile]));
  if (threads.length === 0) {
    return <p className="rounded-2xl border border-white/8 bg-white/[0.025] p-8 text-center text-sm text-mist/60">No discussions yet. Be the first to start one.</p>;
  }
  return (
    <ul className="divide-y divide-white/8">
      {threads.map((thread) => {
        const category = categoryById.get(thread.category_id);
        const profile = profileById.get(thread.author_id);
        return (
          <li key={thread.id} className="py-5 first:pt-0 last:pb-0">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-xl bg-aether/10 text-aether"><MessageCircle className="size-4" /></span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  {thread.pinned && <span className="inline-flex items-center gap-1 text-[0.65rem] font-semibold tracking-wider text-solar uppercase"><Pin className="size-3" /> Pinned</span>}
                  {category && <TransitionLink href={`/forum/category/${category.slug}`} className="text-[0.68rem] font-semibold tracking-wider text-aether/80 uppercase hover:text-aether">{category.name}</TransitionLink>}
                </div>
                <TransitionLink href={`/forum/${thread.id}`} className="mt-1 block truncate font-display text-lg font-semibold text-white transition-colors hover:text-aether">{thread.title}</TransitionLink>
                <p className="mt-1 text-xs text-mist/50">
                  {profile ? <TransitionLink href={`/members/${profile.username}`} className="hover:text-mist">{profile.display_name || profile.username}</TransitionLink> : "Community member"}
                  {" · "}{new Date(thread.last_activity_at).toLocaleDateString(undefined, { month: "short", day: "numeric" })}
                </p>
              </div>
              <span className="inline-flex shrink-0 items-center gap-1.5 pt-1 text-xs text-mist/50"><MessageCircle className="size-3.5" />{thread.reply_count}</span>
              <ArrowRight className="mt-1 hidden size-4 shrink-0 text-mist/25 sm:block" />
            </div>
          </li>
        );
      })}
    </ul>
  );
}
