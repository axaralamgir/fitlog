const PLAN_KEY = "fitlog:plan";
const SAVED_KEY = "fitlog:saved";
const DONE_KEY = "fitlog:done";

function readIds(key: string): number[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((n) => typeof n === "number") : [];
  } catch {
    return [];
  }
}

function writeIds(key: string, ids: number[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(ids));
  } catch {
    // localStorage unavailable (e.g. private mode) — fail silently.
  }
}

export const storage = {
  getPlan: () => readIds(PLAN_KEY),
  setPlan: (ids: number[]) => writeIds(PLAN_KEY, ids),
  getSaved: () => readIds(SAVED_KEY),
  setSaved: (ids: number[]) => writeIds(SAVED_KEY, ids),
  getDone: () => readIds(DONE_KEY),
  setDone: (ids: number[]) => writeIds(DONE_KEY, ids),
};
