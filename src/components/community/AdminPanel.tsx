"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Activity, LoaderCircle, Megaphone, Shield, ShieldCheck, Users } from "lucide-react";
import { CommunityAvatar } from "@/components/community/CommunityAvatar";
import { createClient } from "@/lib/supabase/browser";
import { TransitionLink } from "@/components/layout/TransitionLink";

type Member = { id: string; username: string; display_name: string; role: string; reputation: number; avatar_url: string | null };
type Report = { id: string; target_type: string; target_id: string; target_label: string; target_href: string | null; reason: string; status: string; created_at: string };
type ForumThread = { id: string; title: string; status: string; pinned: boolean; locked: boolean; created_at: string };
type ForumPost = { id: string; body: string; status: string; created_at: string };
type WikiPage = { id: string; slug: string; title: string; status: string; updated_at: string };
type AuditEntry = { id: string; action: string; target_type: string; details: Record<string, unknown>; created_at: string };
type Badge = { id: string; name: string; description: string };

const ROLES = ["member", "trusted_editor", "moderator", "administrator"];
const STATUS: Record<string, string> = { published: "published", hidden: "hidden" };

export function AdminPanel({
  currentUserId,
  isAdministrator,
  members,
  reports,
  threads,
  posts,
  wikiPages,
  badges,
  audit,
  metrics,
}: {
  currentUserId: string;
  isAdministrator: boolean;
  members: Member[];
  reports: Report[];
  threads: ForumThread[];
  posts: ForumPost[];
  wikiPages: WikiPage[];
  badges: Badge[];
  audit: AuditEntry[];
  metrics: { members: number; threads: number; posts: number; pages: number; reports: number };
}) {
  const router = useRouter();
  const [busy, setBusy] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [badgeUserId, setBadgeUserId] = useState(members[0]?.id ?? "");
  const [badgeId, setBadgeId] = useState(badges[0]?.id ?? "");

  async function rpc(name: string, args: Record<string, string | boolean>) {
    const supabase = createClient();
    if (!supabase) {
      setError("The community service is not configured.");
      return false;
    }
    setError("");
    setNotice("");
    setBusy(name);
    const { error: rpcError } = await supabase.rpc(name, args);
    if (rpcError) {
      setError(rpcError.message);
      setBusy("");
      return false;
    }
    setBusy("");
    setNotice("Change saved and recorded in the moderation audit log.");
    router.refresh();
    return true;
  }

  async function setRole(memberId: string, newRole: string) {
    await rpc("admin_set_profile_role", { target_user_id: memberId, new_role: newRole });
  }

  async function adjustReputation(member: Member) {
    const value = window.prompt(`Reputation change for ${member.username} (between -100 and 100):`);
    if (value === null) return;
    const adjustment = Number(value);
    if (!Number.isInteger(adjustment) || adjustment === 0 || adjustment < -100 || adjustment > 100) {
      setError("Enter a non-zero whole number from -100 to 100.");
      return;
    }
    const reason = window.prompt("Reason for this adjustment (recorded in the audit log):");
    if (!reason?.trim()) {
      setError("A reason is required for reputation adjustments.");
      return;
    }
    await rpc("staff_adjust_reputation", { target_user_id: member.id, adjustment: String(adjustment), reason: reason.trim() });
  }

  async function moderateContent(type: string, id: string, status: string) {
    await rpc("staff_moderate_content", { target_type: type, target_id: id, new_status: status });
  }

  async function setThreadControls(thread: ForumThread, pinned: boolean, locked: boolean) {
    await rpc("staff_update_thread_controls", { target_thread_id: thread.id, should_pin: pinned, should_lock: locked });
  }

  async function resolveReport(report: Report, status: string) {
    const note = window.prompt("Add an optional moderator note for this report:", "");
    if (note === null) return;
    await rpc("staff_resolve_report", { target_report_id: report.id, new_status: status, resolution: note });
  }

  async function awardBadge() {
    if (!badgeUserId || !badgeId) {
      setError("Choose a member and badge.");
      return;
    }
    await rpc("staff_award_badge", { target_user_id: badgeUserId, target_badge_id: badgeId });
  }

  async function createAnnouncement(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    setError("");
    setNotice("");
    const form = new FormData(event.currentTarget);
    const title = String(form.get("title") ?? "").trim();
    const body = String(form.get("body") ?? "").trim();
    if (title.length < 3 || !body) {
      setError("Announcements need a title and body.");
      return;
    }
    const supabase = createClient();
    if (!supabase) {
      setError("The community service is not configured.");
      return;
    }
    setBusy("announcement");
    const { error: insertError } = await supabase.from("announcements").insert({
      title,
      body,
      author_id: currentUserId,
      published: true,
      pinned: form.get("pinned") === "on",
    });
    if (insertError) setError(insertError.message);
    else {
      formElement.reset();
      setNotice("Announcement published.");
      router.refresh();
    }
    setBusy("");
  }

  return (
    <div className="space-y-8">
      {error && <p role="alert" className="rounded-xl border border-ember/25 bg-ember/5 p-4 text-sm text-ember">{error}</p>}
      {notice && <p role="status" className="rounded-xl border border-verdant/25 bg-verdant/5 p-4 text-sm text-verdant">{notice}</p>}
      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        <Metric icon={<Users className="size-4" />} label="Members" value={metrics.members} />
        <Metric icon={<Activity className="size-4" />} label="Discussions" value={metrics.threads} />
        <Metric icon={<Activity className="size-4" />} label="Forum replies" value={metrics.posts} />
        <Metric icon={<Activity className="size-4" />} label="Wiki articles" value={metrics.pages} />
        <Metric icon={<Shield className="size-4" />} label="Open reports" value={metrics.reports} />
      </section>

      {isAdministrator && (
        <section className="rounded-3xl border border-white/8 bg-white/[0.025] p-5 sm:p-7">
          <SectionTitle icon={<ShieldCheck className="size-5" />} title="Member roles" description="Role changes are permission-checked in Postgres and written to the audit log." />
          <div className="mt-5 divide-y divide-white/8">
            {members.map((member) => (
              <div key={member.id} className="flex flex-wrap items-center gap-3 py-3 first:pt-0 last:pb-0">
                <CommunityAvatar name={member.display_name || member.username} url={member.avatar_url} size="sm" />
                <div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold text-white">{member.display_name || member.username}</p><p className="text-xs text-mist/45">@{member.username} · {member.reputation} reputation</p></div>
                <select aria-label={`Role for ${member.username}`} value={member.role} disabled={busy !== "" || member.id === currentUserId} onChange={(event) => void setRole(member.id, event.target.value)} className="rounded-lg border border-white/10 bg-night px-3 py-2 text-xs text-white disabled:opacity-50">
                  {ROLES.map((role) => <option key={role} value={role}>{role.replace("_", " ")}</option>)}
                </select>
                <button type="button" onClick={() => void adjustReputation(member)} disabled={busy !== ""} className="rounded-lg border border-white/10 px-3 py-2 text-xs font-semibold text-mist/70 hover:text-white disabled:opacity-50">Adjust rep</button>
              </div>
            ))}
            {!members.length && <p className="text-sm text-mist/55">No members found.</p>}
          </div>
        </section>
      )}

      <section className="rounded-3xl border border-white/8 bg-white/[0.025] p-5 sm:p-7">
        <SectionTitle icon={<Shield className="size-5" />} title="Content reports" description="Review member reports and record the disposition." />
        <ul className="mt-5 divide-y divide-white/8">
          {reports.map((report) => <li key={report.id} className="flex flex-wrap items-start gap-3 py-4 first:pt-0 last:pb-0">
            <div className="min-w-0 flex-1"><p className="text-xs font-semibold tracking-wider text-aether uppercase">{report.target_type} · {report.status}</p>{report.target_href ? <TransitionLink href={report.target_href} className="mt-1 block text-sm font-semibold text-white hover:text-aether">{report.target_label}</TransitionLink> : <p className="mt-1 text-sm font-semibold text-mist/55">{report.target_label}</p>}<p className="mt-1 text-sm leading-relaxed text-mist/75">{report.reason}</p><p className="mt-1 text-xs text-mist/40">Reported {new Date(report.created_at).toLocaleString()} · {report.target_id}</p></div>
            <select aria-label="Report decision" defaultValue="" disabled={busy !== "" || report.status === "resolved" || report.status === "dismissed"} onChange={(event) => { if (event.target.value) void resolveReport(report, event.target.value); }} className="rounded-lg border border-white/10 bg-night px-3 py-2 text-xs text-white disabled:opacity-50">
              <option value="" disabled>Review…</option><option value="reviewing">Mark reviewing</option><option value="resolved">Resolve</option><option value="dismissed">Dismiss</option>
            </select>
          </li>)}
          {!reports.length && <li className="text-sm text-mist/55">No reports to review.</li>}
        </ul>
      </section>

      <section className="grid gap-8 xl:grid-cols-2">
        <ContentModeration title="Forum discussions" items={threads.map((thread) => ({ id: thread.id, title: thread.title, status: thread.status, type: "thread" }))} busy={busy} onModerate={moderateContent} threads={threads} onThreadControls={setThreadControls} />
        <ContentModeration title="Wiki pages" items={wikiPages.map((page) => ({ id: page.id, title: page.title, status: page.status, type: "wiki_page" }))} busy={busy} onModerate={moderateContent} />
        <ContentModeration title="Forum replies" items={posts.map((post) => ({ id: post.id, title: post.body.slice(0, 100), status: post.status, type: "post" }))} busy={busy} onModerate={moderateContent} />
        <section className="rounded-3xl border border-white/8 bg-white/[0.025] p-5 sm:p-7">
          <SectionTitle icon={<ShieldCheck className="size-5" />} title="Award a badge" description="Recognize positive contributions. Each award is recorded in the audit log." />
          <div className="mt-5 space-y-3">
            <label className="block text-xs font-semibold text-mist/65">Member<select value={badgeUserId} onChange={(event) => setBadgeUserId(event.target.value)} className="mt-2 w-full rounded-xl border border-white/10 bg-night px-3 py-2.5 text-sm text-white">{members.map((member) => <option key={member.id} value={member.id}>{member.display_name || member.username}</option>)}</select></label>
            <label className="block text-xs font-semibold text-mist/65">Badge<select value={badgeId} onChange={(event) => setBadgeId(event.target.value)} className="mt-2 w-full rounded-xl border border-white/10 bg-night px-3 py-2.5 text-sm text-white">{badges.map((badge) => <option key={badge.id} value={badge.id}>{badge.name} — {badge.description}</option>)}</select></label>
            <button type="button" onClick={() => void awardBadge()} disabled={busy !== "" || members.length === 0 || badges.length === 0} className="rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-night disabled:opacity-50">Award badge</button>
          </div>
        </section>
        <section className="rounded-3xl border border-white/8 bg-white/[0.025] p-5 sm:p-7">
          <SectionTitle icon={<Megaphone className="size-5" />} title="Publish an announcement" description="Announcements appear on the community homepage." />
          <form onSubmit={createAnnouncement} className="mt-5 space-y-3">
            <input name="title" required minLength={3} maxLength={180} placeholder="Announcement title" className="w-full rounded-xl border border-white/10 bg-night/60 px-4 py-3 text-sm text-white outline-none placeholder:text-mist/40 focus:border-aether/50" />
            <textarea name="body" required maxLength={10000} rows={5} placeholder="Announcement details…" className="w-full resize-y rounded-xl border border-white/10 bg-night/60 px-4 py-3 text-sm text-white outline-none placeholder:text-mist/40 focus:border-aether/50" />
            <label className="flex items-center gap-2 text-sm text-mist/70"><input name="pinned" type="checkbox" className="accent-sky-400" /> Pin this announcement</label>
            <button disabled={busy !== ""} className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-night disabled:opacity-50">{busy === "announcement" && <LoaderCircle className="size-4 animate-spin" />}Publish</button>
          </form>
        </section>
      </section>

      {isAdministrator && (
        <section className="rounded-3xl border border-white/8 bg-white/[0.025] p-5 sm:p-7">
          <SectionTitle icon={<Activity className="size-5" />} title="Audit log" description="Recent administrative and moderation actions." />
          <ul className="mt-5 divide-y divide-white/8">
            {audit.map((entry) => <li key={entry.id} className="py-3 first:pt-0 last:pb-0"><p className="text-sm font-semibold text-white">{entry.action.replaceAll(".", " ")}</p><p className="mt-1 text-xs text-mist/50">{entry.target_type} · {JSON.stringify(entry.details)} · {new Date(entry.created_at).toLocaleString()}</p></li>)}
            {!audit.length && <li className="text-sm text-mist/55">No audit events recorded yet.</li>}
          </ul>
        </section>
      )}
    </div>
  );
}

function ContentModeration({
  title,
  items,
  busy,
  onModerate,
  threads,
  onThreadControls,
}: {
  title: string;
  items: { id: string; title: string; status: string; type: string }[];
  busy: string;
  onModerate: (type: string, id: string, status: string) => Promise<void>;
  threads?: ForumThread[];
  onThreadControls?: (thread: ForumThread, pinned: boolean, locked: boolean) => Promise<void>;
}) {
  return (
    <section className="rounded-3xl border border-white/8 bg-white/[0.025] p-5 sm:p-7">
      <SectionTitle icon={<Shield className="size-5" />} title={title} description="Hide or restore published community content." />
      <ul className="mt-5 divide-y divide-white/8">
        {items.map((item) => {
          const thread = threads?.find((candidate) => candidate.id === item.id);
          return <li key={item.id} className="flex flex-wrap items-center gap-3 py-3 first:pt-0 last:pb-0"><div className="min-w-0 flex-1"><p className="line-clamp-2 text-sm text-white">{item.title || "Untitled content"}</p><p className="mt-1 text-xs text-mist/40">{item.status}</p></div>{thread && onThreadControls && <><button type="button" onClick={() => void onThreadControls(thread, !thread.pinned, thread.locked)} disabled={busy !== ""} className="rounded-full border border-white/10 px-3 py-1.5 text-xs font-semibold text-mist/75 hover:text-white disabled:opacity-50">{thread.pinned ? "Unpin" : "Pin"}</button><button type="button" onClick={() => void onThreadControls(thread, thread.pinned, !thread.locked)} disabled={busy !== ""} className="rounded-full border border-white/10 px-3 py-1.5 text-xs font-semibold text-mist/75 hover:text-white disabled:opacity-50">{thread.locked ? "Unlock" : "Lock"}</button></>}<button type="button" onClick={() => void onModerate(item.type, item.id, item.status === "hidden" ? STATUS.published : STATUS.hidden)} disabled={busy !== ""} className="shrink-0 rounded-full border border-white/10 px-3 py-1.5 text-xs font-semibold text-mist/75 hover:text-white disabled:opacity-50">{item.status === "hidden" ? "Restore" : "Hide"}</button></li>;
        })}
        {!items.length && <li className="text-sm text-mist/55">No content found.</li>}
      </ul>
    </section>
  );
}

function Metric({ icon, label, value }: { icon: React.ReactNode; label: string; value: number }) {
  return <div className="rounded-2xl border border-white/8 bg-white/[0.025] p-4"><div className="flex items-center justify-between text-xs text-mist/55"><span>{label}</span><span className="text-aether">{icon}</span></div><p className="mt-2 font-display text-2xl font-bold text-white">{value.toLocaleString()}</p></div>;
}

function SectionTitle({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return <div className="flex items-start gap-3"><span className="grid size-10 shrink-0 place-items-center rounded-xl bg-aether/10 text-aether">{icon}</span><div><h2 className="font-display text-xl font-bold text-white">{title}</h2><p className="mt-1 text-sm leading-relaxed text-mist/55">{description}</p></div></div>;
}
