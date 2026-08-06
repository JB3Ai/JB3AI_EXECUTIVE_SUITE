export interface Campaign {
  id: string;
  name: string;
  channel: "email" | "linkedin" | "sms";
  status: "draft" | "active" | "paused" | "completed";
  owner: string;
}

export interface SequenceStep {
  id: string;
  campaignId: string;
  dayOffset: number;
  subject: string;
  bodyPreview: string;
}

export interface InboxTriageItem {
  id: string;
  from: string;
  subject: string;
  priority: "low" | "medium" | "high";
  receivedAtIso: string;
}
