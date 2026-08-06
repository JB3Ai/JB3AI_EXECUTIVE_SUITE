import { Send } from "lucide-react";

export function OutboundView() {
  return (
    <section className="space-y-4">
      <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-4">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-amber-500">SponsorFlow Outbound</h2>
        <p className="mt-2 text-sm text-neutral-300">
          Placeholder view for campaign board, sequence builder, and inbox triage.
        </p>
      </div>
      <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-4 text-xs text-neutral-400 flex items-center gap-2">
        <Send className="h-4 w-4 text-amber-500" />
        Outbound systems ready.
      </div>
    </section>
  );
}
