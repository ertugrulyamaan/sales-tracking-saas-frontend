const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080";

export class ApiError extends Error {
  status: number;
  payload?: unknown;

  constructor(message: string, status: number, payload?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.payload = payload;
  }
}

type ApiErrorPayload = {
  message?: string | string[];
};

type RequestOptions = {
  method?: "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
  body?: unknown;
  token?: string | null;
  signal?: AbortSignal;
};

export async function http<T>(
  path: string,
  { method = "GET", body, token, signal }: RequestOptions = {},
): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
    signal,
    cache: "no-store",
  });

  if (!res.ok) {
    let payload: unknown;
    try {
      payload = await res.json();
    } catch {
      payload = undefined;
    }

    const fallback = `Request failed: ${res.status}`;
    const messageValue =
      typeof payload === "object" && payload !== null
        ? (payload as ApiErrorPayload).message
        : undefined;
    const message = Array.isArray(messageValue)
      ? messageValue.join(", ")
      : typeof messageValue === "string"
        ? messageValue
        : fallback;

    if (res.status === 401 && typeof window !== "undefined") {
      window.dispatchEvent(new Event("app:unauthorized"));
    }

    throw new ApiError(message, res.status, payload);
  }

  if (res.status === 204) return undefined as T;
  return (await res.json()) as T;
}