import { Activity } from "lucide-react";

export function InboundView() {
  return (
    <section className="space-y-4">
      <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-4">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-amber-500">Inbound Lead Pipeline</h2>
        <p className="mt-2 text-sm text-neutral-300">
          Placeholder view for pipeline table, lead drawer, and Gemini due diligence briefings.
        </p>
      </div>
      <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-4 text-xs text-neutral-400 flex items-center gap-2">
        <Activity className="h-4 w-4 text-emerald-500" />
        Inbound systems nominal.
      </div>
    </section>
  );
}
