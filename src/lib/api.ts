export async function fetchFromAppsScript<T>(path: string, init?: RequestInit): Promise<T> {
  const baseUrl = import.meta.env.VITE_APPS_SCRIPT_WEBAPP_URL as string | undefined;
  if (!baseUrl) {
    throw new Error("VITE_APPS_SCRIPT_WEBAPP_URL is not configured");
  }

  const response = await fetch(`${baseUrl}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
    ...init,
  });

  if (!response.ok) {
    throw new Error(`Apps Script request failed: ${response.status} ${response.statusText}`);
  }

  return (await response.json()) as T;
}

export {
  createGoogleCalendarEvent,
  deleteGoogleCalendarEvent,
  listGoogleCalendarEvents,
} from "../components/inbound/lib/googleCalendar";
export type { CalendarEventInput, GoogleCalendarEvent } from "../components/inbound/lib/googleCalendar";

export {
  appendLeadToGoogleSheet,
  createGoogleSheet,
  exportLeadsToGoogleSheet,
  importLeadsFromGoogleSheet,
  listUserGoogleSheets,
} from "../components/inbound/lib/googleSheets";
export type { GoogleSpreadsheetItem } from "../components/inbound/lib/googleSheets";

export {
  checkInboxForReplies,
  fetchGmailProfile,
  sendGmailEmail,
} from "../components/outbound/lib/gmail";
export type {
  GmailProfile,
  IncomingReplyMatch,
  SendEmailPayload,
} from "../components/outbound/lib/gmail";
