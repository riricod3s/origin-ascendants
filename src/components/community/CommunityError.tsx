import { AlertTriangle } from "lucide-react";

export function CommunityError({ message }: { message: string }) {
  return (
    <div role="alert" className="flex items-start gap-3 rounded-2xl border border-ember/25 bg-ember/[0.06] p-5 text-sm text-mist/85">
      <AlertTriangle className="mt-0.5 size-5 shrink-0 text-ember" />
      <div>
        <p className="font-semibold text-white">Community content could not be loaded.</p>
        <p className="mt-1 break-words leading-relaxed">{message}</p>
        <p className="mt-2 text-xs text-mist/60">If this is a new installation, check that the Supabase migration has been applied.</p>
      </div>
    </div>
  );
}
