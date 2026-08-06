export interface Lead {
  id: string;
  company: string;
  contactName: string;
  email: string;
  status: "new" | "qualified" | "scheduled" | "closed";
  score: number;
  notes?: string;
}

export interface GeminiDueDiligence {
  leadId: string;
  summary: string;
  risks: string[];
  opportunities: string[];
  updatedAtIso: string;
}

export interface CalendarEvent {
  id: string;
  leadId: string;
  title: string;
  startIso: string;
  endIso: string;
}
