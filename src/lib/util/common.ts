export function normalizeQueryParam(value: string, emptyMessage: string): string {
  const trimmed = value.trim();

  if (!trimmed) {
    throw new Error(emptyMessage);
  }

  return encodeURIComponent(trimmed);
}

export async function fetchWithTimeout(
  url: string,
  options: RequestInit = {},
  timeoutMs = 5000
): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await fetch(url, {
      ...options,
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeoutId);
  }
}
