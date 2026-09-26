"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from "react";
import toast from "react-hot-toast";
import { storage } from "@/lib/storage";

export const PLAN_CAP = 5;

interface PlanContextValue {
  planIds: number[];
  savedIds: number[];
  doneIds: number[];
  isHydrated: boolean;
  isInPlan: (id: number) => boolean;
  isSaved: (id: number) => boolean;
  isDone: (id: number) => boolean;
  isPlanFull: boolean;
  addToPlan: (id: number, name?: string) => void;
  addToSaved: (id: number, name?: string) => void;
  removeFromPlan: (id: number, name?: string) => void;
  removeFromSaved: (id: number, name?: string) => void;
  markAsDone: (id: number, name?: string) => void;
}

const PlanContext = createContext<PlanContextValue | undefined>(undefined);

export function PlanProvider({ children }: { children: ReactNode }) {
  const [planIds, setPlanIds] = useState<number[]>([]);
  const [savedIds, setSavedIds] = useState<number[]>([]);
  const [doneIds, setDoneIds] = useState<number[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // Hydrate from localStorage once on mount (client only).
  useEffect(() => {
    setPlanIds(storage.getPlan());
    setSavedIds(storage.getSaved());
    setDoneIds(storage.getDone());
    setIsHydrated(true);
  }, []);

  // Persist whenever state changes, but only after initial hydration
  // so we don't stomp on stored data with the initial empty arrays.
  useEffect(() => {
    if (isHydrated) storage.setPlan(planIds);
  }, [planIds, isHydrated]);

  useEffect(() => {
    if (isHydrated) storage.setSaved(savedIds);
  }, [savedIds, isHydrated]);

  useEffect(() => {
    if (isHydrated) storage.setDone(doneIds);
  }, [doneIds, isHydrated]);

  const isInPlan = useCallback((id: number) => planIds.includes(id), [planIds]);
  const isSaved = useCallback((id: number) => savedIds.includes(id), [savedIds]);
  const isDone = useCallback((id: number) => doneIds.includes(id), [doneIds]);
  const isPlanFull = planIds.length >= PLAN_CAP;

  const addToPlan = useCallback(
    (id: number, name?: string) => {
      setPlanIds((prev) => {
        if (prev.includes(id)) {
          toast("Already in today's plan.");
          return prev;
        }
        if (prev.length >= PLAN_CAP) {
          toast.error("Today's plan is full (5/5). Finish a lift first.");
          return prev;
        }
        toast.success(`${name ?? "Workout"} added to today's plan`);
        return [...prev, id];
      });
    },
    []
  );

  const addToSaved = useCallback((id: number, name?: string) => {
    setSavedIds((prev) => {
      if (prev.includes(id)) {
        toast("Already saved.");
        return prev;
      }
      toast.success(`${name ?? "Workout"} saved for later`);
      return [...prev, id];
    });
  }, []);

  const removeFromPlan = useCallback((id: number, name?: string) => {
    setPlanIds((prev) => {
      if (!prev.includes(id)) return prev;
      toast(`${name ?? "Workout"} removed from today's plan`);
      return prev.filter((p) => p !== id);
    });
    setDoneIds((prev) => prev.filter((p) => p !== id));
  }, []);

  const removeFromSaved = useCallback((id: number, name?: string) => {
    setSavedIds((prev) => {
      if (!prev.includes(id)) return prev;
      toast(`${name ?? "Workout"} removed from saved`);
      return prev.filter((p) => p !== id);
    });
  }, []);

  const markAsDone = useCallback((id: number, name?: string) => {
    setDoneIds((prev) => {
      if (prev.includes(id)) return prev;
      toast.success(`${name ?? "Workout"} marked as done 💪`);
      return [...prev, id];
    });
  }, []);

  const value = useMemo(
    () => ({
      planIds,
      savedIds,
      doneIds,
      isHydrated,
      isInPlan,
      isSaved,
      isDone,
      isPlanFull,
      addToPlan,
      addToSaved,
      removeFromPlan,
      removeFromSaved,
      markAsDone,
    }),
    [
      planIds,
      savedIds,
      doneIds,
      isHydrated,
      isInPlan,
      isSaved,
      isDone,
      isPlanFull,
      addToPlan,
      addToSaved,
      removeFromPlan,
      removeFromSaved,
      markAsDone,
    ]
  );

  return <PlanContext.Provider value={value}>{children}</PlanContext.Provider>;
}

export function usePlan() {
  const ctx = useContext(PlanContext);
  if (!ctx) {
    throw new Error("usePlan must be used within a PlanProvider");
  }
  return ctx;
}
