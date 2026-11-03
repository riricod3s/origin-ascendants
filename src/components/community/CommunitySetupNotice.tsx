import { ExternalLink, ShieldAlert } from "lucide-react";
import { Card } from "@/components/ui/Card";

export function CommunitySetupNotice({ compact = false }: { compact?: boolean }) {
  return (
    <Card tone="solar" className={compact ? "p-5" : "p-6 sm:p-8"}>
      <div className="flex items-start gap-4">
        <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-solar/15 text-solar">
          <ShieldAlert className="size-5" />
        </span>
        <div>
          <h2 className="font-display text-lg font-bold text-white">Community services need configuration</h2>
          <p className="mt-2 text-sm leading-relaxed text-mist/80">
            Connect a Supabase project and apply the community migration before enabling accounts, posts and edits. The setup guide lists the required email, Discord OAuth and CAPTCHA settings.
          </p>
          <a href="https://supabase.com/docs" target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-solar hover:text-white">
            Supabase setup documentation <ExternalLink className="size-4" />
          </a>
        </div>
      </div>
    </Card>
  );
}
