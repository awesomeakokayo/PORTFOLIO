export function trackMuseumEvent(name, data) {
  if (typeof window === "undefined") return;

  const va = window.va;
  if (typeof va !== "function") return;

  try {
    va("event", { name, data });
  } catch {
    // Analytics must never interrupt the museum experience.
  }
}
