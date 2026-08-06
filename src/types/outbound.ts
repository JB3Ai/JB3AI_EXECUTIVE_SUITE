export type CampaignStatus = "ACTIVE" | "PAUSED" | "COMPLETED" | "DRAFT";
export type TriageStage = "LEAD_IDENTIFIED" | "EMAIL_SENT" | "OPENED" | "REPLIED" | "CONVERTED" | "BOUNCED";

export interface Campaign {
  id: string;
  name: string;
  target_audience: string;
  status: CampaignStatus;
  sent_count: number;
  open_rate: number;
  reply_rate: number;
  last_activity: string;
}

export interface OutboundContact {
  id: string;
  campaign_id: string;
  name: string;
  company: string;
  email: string;
  stage: TriageStage;
  last_touch: string;
  notes?: string;
}
