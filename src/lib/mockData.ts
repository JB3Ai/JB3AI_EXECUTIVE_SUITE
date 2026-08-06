import type { Campaign, OutboundContact } from "../types/outbound";
import type { GeminiDueDiligence, Lead } from "../types/inbound";

export const mockLeads: Lead[] = [
  {
    id: "lead_001",
    company: "Northstar Capital",
    contactName: "Elena Rao",
    email: "elena@northstar.example",
    status: "qualified",
    score: 91,
  },
  {
    id: "lead_002",
    company: "Apex Media Group",
    contactName: "Marcus Vale",
    email: "marcus@apex.example",
    status: "new",
    score: 74,
  },
];

export const mockBriefings: GeminiDueDiligence[] = [
  {
    leadId: "lead_001",
    summary: "Strong expansion fit, immediate opportunity in cross-channel sponsorship.",
    risks: ["Short procurement cycle", "Requires legal review"],
    opportunities: ["Q4 budget remaining", "Decision maker engaged"],
    updatedAtIso: new Date().toISOString(),
  },
];

export const mockCampaigns: Campaign[] = [
  {
    id: "cmp_001",
    name: "Executive Outreach - Sports Partners",
    target_audience: "Sponsorship Directors and Brand Leads",
    status: "ACTIVE",
    sent_count: 124,
    open_rate: 57.5,
    reply_rate: 19.2,
    last_activity: new Date().toISOString(),
  },
];

export const mockOutboundContacts: OutboundContact[] = [
  {
    id: "contact_001",
    campaign_id: "cmp_001",
    name: "Nia Carter",
    company: "Northstar Capital",
    email: "partnerships@northstar.example",
    stage: "REPLIED",
    last_touch: "2h ago",
    notes: "Requested pricing packet and strategy call.",
  },
];
