"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, ReactNode } from "react";
import toast from "react-hot-toast";
import { storage } from "@/lib/storage";

export const PLAN_CAP = 5;

interface PlanContextValue {
  planIds: number[];
  savedIds: number[];
  doneIds: number[];
  isHydrated: boolean;
  planCount: number;
  savedCount: number;
  isInPlan: (id: number) => boolean;
  isSaved: (id: number) => boolean;
  isDone: (id: number) => boolean;
  isPlanFull: boolean;
  addToPlan: (id: number, name?: string) => void;
  removeFromPlan: (id: number, name?: string) => void;
  markAsDone: (id: number, name?: string) => void;
  saveWorkout: (id: number, name?: string) => void;
  removeSaved: (id: number, name?: string) => void;
}

const PlanContext = createContext<PlanContextValue | undefined>(undefined);

export function PlanProvider({ children }: { children: ReactNode }) {
  const [planIds, setPlanIds] = useState<number[]>([]);
  const [savedIds, setSavedIds] = useState<number[]>([]);
  const [doneIds, setDoneIds] = useState<number[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setPlanIds(storage.getPlan());
    setSavedIds(storage.getSaved());
    setDoneIds(storage.getDone());
    setIsHydrated(true);
  }, []);

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

  const addToPlan = useCallback((id: number, name = "Workout") => {
    if (planIds.includes(id)) {
      toast("Already in today's plan.");
      return;
    }
    if (planIds.length >= PLAN_CAP) {
      toast.error("Today's plan is full (5/5). Finish a lift first.");
      return;
    }
    setPlanIds((prev) => [...prev, id]);
    toast.success(`${name} added to today's plan`);
  }, [planIds]);

  const removeFromPlan = useCallback((id: number, name = "Workout") => {
    if (!planIds.includes(id)) return;
    setPlanIds((prev) => prev.filter((item) => item !== id));
    setDoneIds((prev) => prev.filter((item) => item !== id));
    toast(`${name} removed from today's plan`);
  }, [planIds]);

  const markAsDone = useCallback((id: number, name = "Workout") => {
    if (doneIds.includes(id)) return;
    setDoneIds((prev) => [...prev, id]);
    toast.success(`${name} marked as done`);
  }, [doneIds]);

  const saveWorkout = useCallback((id: number, name = "Workout") => {
    if (savedIds.includes(id)) {
      toast("Already saved.");
      return;
    }
    setSavedIds((prev) => [...prev, id]);
    toast.success(`${name} saved for later`);
  }, [savedIds]);

  const removeSaved = useCallback((id: number, name = "Workout") => {
    if (!savedIds.includes(id)) return;
    setSavedIds((prev) => prev.filter((item) => item !== id));
    toast(`${name} removed from saved`);
  }, [savedIds]);

  const value = useMemo(() => ({
    planIds,
    savedIds,
    doneIds,
    isHydrated,
    planCount: planIds.length,
    savedCount: savedIds.length,
    isInPlan,
    isSaved,
    isDone,
    isPlanFull,
    addToPlan,
    removeFromPlan,
    markAsDone,
    saveWorkout,
    removeSaved,
  }), [planIds, savedIds, doneIds, isHydrated, isInPlan, isSaved, isDone, isPlanFull, addToPlan, removeFromPlan, markAsDone, saveWorkout, removeSaved]);

  return <PlanContext.Provider value={value}>{children}</PlanContext.Provider>;
}

export function usePlan() {
  const context = useContext(PlanContext);
  if (!context) throw new Error("usePlan must be used within a PlanProvider");
  return context;
}
