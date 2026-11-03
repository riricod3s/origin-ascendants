import ReactMarkdown, { defaultUrlTransform } from "react-markdown";
import remarkGfm from "remark-gfm";
import { getSupabaseConfig } from "@/lib/supabase/config";

export function MarkdownContent({ content }: { content: string }) {
  const storageOrigin = getSupabaseConfig()?.url ? new URL(getSupabaseConfig()!.url).origin : "";
  return (
    <div className="community-markdown">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        urlTransform={(value, key) => {
          const safeValue = defaultUrlTransform(value);
          if (key !== "src") return safeValue;
          try {
            const imageUrl = new URL(safeValue);
            return imageUrl.protocol === "https:"
              && imageUrl.origin === storageOrigin
              && imageUrl.pathname.startsWith("/storage/v1/object/public/community-images/")
              ? imageUrl.href
              : "";
          } catch {
            return "";
          }
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
