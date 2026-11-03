"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { TransitionLink } from "@/components/layout/TransitionLink";
import { CommunityAvatar } from "@/components/community/CommunityAvatar";
import { Card } from "@/components/ui/Card";

type Member = { id: string; username: string; display_name: string; bio: string; avatar_url: string | null; role: string; reputation: number; created_at: string };

export function MemberDirectory({ members }: { members: Member[] }) {
  const [search, setSearch] = useState("");
  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return members.filter((member) => !query || `${member.username} ${member.display_name} ${member.bio}`.toLowerCase().includes(query));
  }, [members, search]);

  return (
    <>
      <label className="relative mb-6 block max-w-xl">
        <Search className="absolute top-1/2 left-4 size-4 -translate-y-1/2 text-mist/45" />
        <span className="sr-only">Search members</span>
        <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search community members…" className="w-full rounded-xl border border-white/10 bg-night/60 py-3 pr-4 pl-11 text-sm text-white outline-none placeholder:text-mist/40 focus:border-aether/50" />
      </label>
      {filtered.length ? (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((member) => (
            <li key={member.id}>
              <Card as="article" interactive className="h-full p-5">
                <TransitionLink href={`/members/${member.username}`} className="flex items-center gap-4">
                  <CommunityAvatar name={member.display_name || member.username} url={member.avatar_url} />
                  <span className="min-w-0">
                    <span className="block truncate font-display font-bold text-white">{member.display_name || member.username}</span>
                    <span className="mt-0.5 block truncate text-xs text-mist/50">@{member.username}</span>
                  </span>
                </TransitionLink>
                {member.bio && <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-mist/65">{member.bio}</p>}
                <div className="mt-4 flex items-center justify-between text-xs text-mist/45">
                  <span className="rounded-full bg-aether/10 px-2.5 py-1 text-[0.65rem] font-semibold tracking-wider text-aether uppercase">{member.role.replace("_", " ")}</span>
                  <span>{member.reputation} reputation</span>
                </div>
              </Card>
            </li>
          ))}
        </ul>
      ) : <p className="rounded-2xl border border-white/8 p-8 text-center text-sm text-mist/60">No members match that search.</p>}
    </>
  );
}
