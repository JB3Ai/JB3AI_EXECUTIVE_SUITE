import type { Campaign, InboxTriageItem, SequenceStep } from "../types/outbound";
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
    channel: "email",
    status: "active",
    owner: "Ops AI",
  },
];

export const mockSequenceSteps: SequenceStep[] = [
  {
    id: "step_001",
    campaignId: "cmp_001",
    dayOffset: 0,
    subject: "Intro + Partnership Fit",
    bodyPreview: "Opening message with tailored market context.",
  },
];

export const mockInboxTriage: InboxTriageItem[] = [
  {
    id: "triage_001",
    from: "partnerships@northstar.example",
    subject: "Re: Initial Partnership Concept",
    priority: "high",
    receivedAtIso: new Date().toISOString(),
  },
];
