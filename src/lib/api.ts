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
