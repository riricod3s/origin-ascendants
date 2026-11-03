"use client";

import { useRef, useState } from "react";
import { ImagePlus, LoaderCircle, Eye, PencilLine } from "lucide-react";
import { createClient } from "@/lib/supabase/browser";
import { MarkdownContent } from "@/components/community/MarkdownContent";

export function MarkdownComposer({
  value,
  onChange,
  userId,
  label = "Message",
  placeholder = "Write your message in Markdown…",
  maxLength = 20000,
}: {
  value: string;
  onChange: (value: string) => void;
  userId: string;
  label?: string;
  placeholder?: string;
  maxLength?: number;
}) {
  const [preview, setPreview] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const fileInput = useRef<HTMLInputElement>(null);

  async function uploadImage(file: File) {
    setError("");
    if (!file.type.startsWith("image/") || file.size > 5 * 1024 * 1024) {
      setError("Choose an image file smaller than 5 MB.");
      return;
    }

    const supabase = createClient();
    if (!supabase) {
      setError("Image uploads are unavailable because the storage service is not configured.");
      return;
    }

    setUploading(true);
    const safeName = file.name.replace(/[^A-Za-z0-9._-]/g, "-").slice(-100) || "image";
    const path = `${userId}/${crypto.randomUUID()}-${safeName}`;
    const { error: uploadError } = await supabase.storage.from("community-images").upload(path, file, {
      cacheControl: "3600",
      upsert: false,
      contentType: file.type,
    });
    if (uploadError) {
      setError(uploadError.message);
      setUploading(false);
      return;
    }
    const { data } = supabase.storage.from("community-images").getPublicUrl(path);
    onChange(`${value}${value ? "\n\n" : ""}![${file.name.replace(/[\[\]]/g, "")}](${data.publicUrl})\n`);
    setUploading(false);
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-night/45 focus-within:border-aether/40">
      <div className="flex items-center justify-between border-b border-white/8 px-3 py-2">
        <div className="flex items-center gap-1">
          <button type="button" onClick={() => setPreview(false)} aria-pressed={!preview} className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold transition-colors ${!preview ? "bg-white/10 text-white" : "text-mist/60 hover:text-white"}`}>
            <PencilLine className="size-3.5" /> Write
          </button>
          <button type="button" onClick={() => setPreview(true)} aria-pressed={preview} className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold transition-colors ${preview ? "bg-white/10 text-white" : "text-mist/60 hover:text-white"}`}>
            <Eye className="size-3.5" /> Preview
          </button>
        </div>
        {!preview && (
          <>
            <input ref={fileInput} type="file" accept="image/png,image/jpeg,image/gif,image/webp" className="sr-only" onChange={(event) => {
              const file = event.currentTarget.files?.[0];
              if (file) void uploadImage(file);
              event.currentTarget.value = "";
            }} />
            <button type="button" onClick={() => fileInput.current?.click()} disabled={uploading} className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-mist/75 transition-colors hover:bg-white/8 hover:text-white disabled:opacity-50">
              {uploading ? <LoaderCircle className="size-4 animate-spin" /> : <ImagePlus className="size-4" />}
              Add image
            </button>
          </>
        )}
      </div>
      {preview ? (
        <div className="min-h-48 p-4">
          {value ? <MarkdownContent content={value} /> : <p className="text-sm text-mist/45">Nothing to preview yet.</p>}
        </div>
      ) : (
        <label className="block">
          <span className="sr-only">{label}</span>
          <textarea value={value} onChange={(event) => onChange(event.target.value)} required minLength={1} maxLength={maxLength} rows={10} placeholder={placeholder} className="min-h-48 w-full resize-y bg-transparent p-4 text-sm leading-relaxed text-white outline-none placeholder:text-mist/35" />
        </label>
      )}
      <div className="flex items-center justify-between border-t border-white/8 px-4 py-2 text-[0.7rem] text-mist/45">
        {error ? <span role="alert" className="text-ember">{error}</span> : <span>Markdown supported · Images up to 5 MB</span>}
        <span>{value.length}/{maxLength}</span>
      </div>
    </div>
  );
}
