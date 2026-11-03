"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ImagePlus, LoaderCircle } from "lucide-react";
import { CommunityAvatar } from "@/components/community/CommunityAvatar";
import { createClient } from "@/lib/supabase/browser";

export function ProfileEditForm({
  userId,
  initial,
}: {
  userId: string;
  initial: { username: string; display_name: string; bio: string; avatar_url: string | null };
}) {
  const router = useRouter();
  const [avatarUrl, setAvatarUrl] = useState(initial.avatar_url ?? "");
  const [busy, setBusy] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function upload(file: File) {
    setError("");
    if (!file.type.startsWith("image/") || file.size > 5 * 1024 * 1024) {
      setError("Choose an image file smaller than 5 MB.");
      return;
    }
    const supabase = createClient();
    if (!supabase) {
      setError("The community service is not configured.");
      return;
    }
    setUploading(true);
    const fileName = file.name.replace(/[^A-Za-z0-9._-]/g, "-").slice(-100) || "avatar";
    const path = `${userId}/${crypto.randomUUID()}-${fileName}`;
    const { error: uploadError } = await supabase.storage.from("community-images").upload(path, file, { upsert: false, contentType: file.type });
    if (uploadError) {
      setError(uploadError.message);
      setUploading(false);
      return;
    }
    setAvatarUrl(supabase.storage.from("community-images").getPublicUrl(path).data.publicUrl);
    setUploading(false);
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSuccess("");
    const form = new FormData(event.currentTarget);
    const username = String(form.get("username") ?? "").trim();
    const displayName = String(form.get("display_name") ?? "").trim();
    const bio = String(form.get("bio") ?? "").trim();
    if (!/^[A-Za-z0-9_]{3,24}$/.test(username)) {
      setError("Usernames must use 3–24 letters, numbers or underscores.");
      return;
    }
    const supabase = createClient();
    if (!supabase) {
      setError("The community service is not configured.");
      return;
    }
    setBusy(true);
    const { error: updateError } = await supabase.from("profiles").update({
      username,
      display_name: displayName || username,
      bio,
      avatar_url: avatarUrl || null,
    }).eq("id", userId);
    if (updateError) {
      setError(updateError.code === "23505" ? "That username is already in use." : updateError.message);
      setBusy(false);
      return;
    }
    setSuccess("Profile saved.");
    setBusy(false);
    router.refresh();
  }

  return (
    <form onSubmit={submit} className="space-y-5">
      <div className="flex items-center gap-4">
        <CommunityAvatar name={initial.display_name || initial.username} url={avatarUrl} size="lg" />
        <div>
          <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-mist transition-colors hover:bg-white/5">
            {uploading ? <LoaderCircle className="size-4 animate-spin" /> : <ImagePlus className="size-4" />}
            Upload avatar
            <input type="file" accept="image/png,image/jpeg,image/gif,image/webp" disabled={uploading} className="sr-only" onChange={(event) => {
              const file = event.currentTarget.files?.[0];
              if (file) void upload(file);
              event.currentTarget.value = "";
            }} />
          </label>
          <p className="mt-2 text-xs text-mist/45">PNG, JPEG, GIF or WebP · up to 5 MB</p>
        </div>
      </div>
      <label className="block text-sm font-medium text-mist">Username<input name="username" required minLength={3} maxLength={24} pattern="[A-Za-z0-9_]+" defaultValue={initial.username} className="mt-2 w-full rounded-xl border border-white/10 bg-night/60 px-4 py-3 text-white outline-none focus:border-aether/60" /></label>
      <label className="block text-sm font-medium text-mist">Display name<input name="display_name" maxLength={48} defaultValue={initial.display_name} className="mt-2 w-full rounded-xl border border-white/10 bg-night/60 px-4 py-3 text-white outline-none focus:border-aether/60" /></label>
      <label className="block text-sm font-medium text-mist">About you<textarea name="bio" maxLength={500} rows={4} defaultValue={initial.bio} className="mt-2 w-full resize-y rounded-xl border border-white/10 bg-night/60 px-4 py-3 text-white outline-none focus:border-aether/60" placeholder="A little about what you enjoy or what you’re working on…" /></label>
      {error && <p role="alert" className="rounded-xl border border-ember/25 bg-ember/5 p-3 text-sm text-ember">{error}</p>}
      {success && <p role="status" className="rounded-xl border border-verdant/25 bg-verdant/5 p-3 text-sm text-verdant">{success}</p>}
      <button disabled={busy || uploading} className="inline-flex h-11 items-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-night transition-opacity hover:opacity-90 disabled:opacity-50">{busy && <LoaderCircle className="size-4 animate-spin" />}Save profile</button>
    </form>
  );
}
