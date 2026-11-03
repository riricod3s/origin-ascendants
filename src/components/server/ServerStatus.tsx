"use client";

import { CircleAlert, Clock3, LoaderCircle, RefreshCw, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/cn";

interface StatusPayload {
  online: boolean | null;
  players: { online: number; max: number } | null;
  version: string | null;
  demo: boolean;
}

type StatusState =
  | { kind: "loading" }
  | { kind: "ready"; data: StatusPayload; checkedAt: number }
  | { kind: "error"; message: string };

export function ServerStatus() {
  const [status, setStatus] = useState<StatusState>({ kind: "loading" });
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    let active = true;

    async function check() {
      try {
        const response = await fetch("/api/status", { signal: controller.signal, cache: "no-store" });
        const body = (await response.json()) as StatusPayload & { error?: string };
        if (!response.ok) throw new Error(body.error ?? `Status check failed (${response.status}).`);
        if (active) setStatus({ kind: "ready", data: body, checkedAt: Date.now() });
      } catch (error) {
        if (!active || (error instanceof DOMException && error.name === "AbortError")) return;
        const message = error instanceof Error ? error.message : "The server status could not be checked.";
        setStatus({ kind: "error", message });
      }
    }

    void check();
    const interval = window.setInterval(() => {
      void check();
    }, 60_000);

    return () => {
      active = false;
      controller.abort();
      window.clearInterval(interval);
    };
  }, [refresh]);

  const ready = status.kind === "ready" ? status.data : null;
  const stateLabel = status.kind === "loading" ? "Checking" : status.kind === "error" ? "Unavailable" : ready?.demo ? "Demo mode" : ready?.online ? "Online" : ready?.online === false ? "Offline" : "Unverified";

  return (
    <Card tone="verdant" className="p-5 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold tracking-[0.2em] text-mist/65 uppercase">Live server status</p>
          <div className="mt-2 flex items-center gap-2.5">
            <span className={cn("relative grid size-3 place-items-center rounded-full", ready?.online ? "bg-verdant" : ready?.online === false ? "bg-ember" : "bg-solar/80")}>
              {ready?.online && <span className="absolute inset-0 animate-ping-soft rounded-full bg-verdant/60" />}
            </span>
            <h2 className="font-display text-xl font-bold text-white">{stateLabel}</h2>
          </div>
        </div>
        <Button
          type="button"
          size="sm"
          variant="ghost"
          aria-label="Refresh server status"
          onClick={() => {
            setStatus({ kind: "loading" });
            setRefresh((value) => value + 1);
          }}
          icon={status.kind === "loading" ? <LoaderCircle className="animate-spin" /> : <RefreshCw />}
          className="size-10 rounded-full p-0"
        >
          <span className="sr-only">Refresh</span>
        </Button>
      </div>

      {status.kind === "error" ? (
        <p role="status" className="mt-4 flex items-start gap-2 text-sm leading-relaxed text-ember">
          <CircleAlert className="mt-0.5 size-4 shrink-0" />
          {status.message}
        </p>
      ) : ready?.demo ? (
        <p role="status" className="mt-4 text-sm leading-relaxed text-mist/75">
          Demo data is enabled. Configure <code className="font-mono text-aether">SITE_DATA_MODE=live</code> to check the actual server.
        </p>
      ) : ready?.online !== null && ready ? (
        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-white/8 bg-white/[0.03] p-3">
            <p className="flex items-center gap-2 text-xs text-mist/65"><Users className="size-3.5" /> Players</p>
            <p className="mt-1 font-mono text-lg font-semibold text-white">{ready.players ? `${ready.players.online} / ${ready.players.max}` : "—"}</p>
          </div>
          <div className="rounded-xl border border-white/8 bg-white/[0.03] p-3">
            <p className="flex items-center gap-2 text-xs text-mist/65"><Clock3 className="size-3.5" /> Last checked</p>
            <p className="mt-1 font-mono text-lg font-semibold text-white">{status.kind === "ready" ? new Date(status.checkedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "—"}</p>
          </div>
          {ready.version && <p className="col-span-2 text-xs text-mist/65">Reported version: {ready.version}</p>}
        </div>
      ) : (
        <p role="status" className="mt-4 text-sm text-mist/75">Connecting to the status service…</p>
      )}
    </Card>
  );
}
