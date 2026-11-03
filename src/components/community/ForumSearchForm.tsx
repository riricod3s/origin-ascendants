import { Search } from "lucide-react";

export function ForumSearchForm({ defaultValue = "" }: { defaultValue?: string }) {
  return (
    <form action="/forum/search" className="relative w-full max-w-md">
      <label className="sr-only" htmlFor="forum-query">Search discussions</label>
      <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-mist/45" />
      <input id="forum-query" name="q" defaultValue={defaultValue} maxLength={100} placeholder="Search discussions…" className="w-full rounded-full border border-white/12 bg-night/45 py-2.5 pr-4 pl-11 text-sm text-white outline-none placeholder:text-mist/45 focus:border-aether/50" />
    </form>
  );
}
