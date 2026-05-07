"use client";

import { useEffect, useState, useMemo } from "react";

type BackgroundProps = {
  appState: "idle" | "results" | "plan" | "store" | "sell";
  igniting?: boolean;
};

export default function Background({ appState, igniting = false }: BackgroundProps) {
  const [motionTick, setMotionTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setMotionTick((t) => t + 1), 40);
    return () => clearInterval(interval);
  }, []);

  const glowProgress = useMemo(() => {
    const base = appState === "idle" ? 78 : appState === "results" ? 58 : appState === "plan" ? 40 : 24;
    return base - Math.sin(motionTick * 0.06) * 20;
  }, [appState, motionTick]);

  const glowScale = useMemo(() => 1 + Math.sin(motionTick * 0.04) * 0.04, [motionTick]);

  const triangleProgress = useMemo(() => {
    const base = appState === "idle" ? 78 : appState === "results" ? 58 : appState === "plan" ? 40 : 24;
    return base - Math.sin(motionTick * 0.038 + 0.8) * 12;
  }, [appState, motionTick]);

  return (
    <>
      <div style={{
        position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
        background: "linear-gradient(180deg,#fff9f0 0%,#fff0e0 30%,#ffece0 60%,#fff0e8 80%,#fff9f0 100%)"
      }} />
      <div style={{
        position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
        backgroundImage: "url('/triangle-hero.svg')",
        backgroundRepeat: "no-repeat",
        backgroundPosition: `center ${triangleProgress}%`,
        backgroundSize: "2400px auto",
        opacity: 0.95
      }} />
      <div style={{
        position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
        background: `radial-gradient(ellipse ${90 * glowScale}% ${70 * glowScale}% at center ${glowProgress}%,rgba(253,224,71,0.58) 0%,rgba(245,158,11,0.54) 14%,rgba(234,88,12,0.50) 30%,rgba(239,68,68,0.34) 48%,rgba(251,113,133,0.22) 62%,rgba(255,255,255,0) 78%),radial-gradient(ellipse at center bottom,rgba(234,88,12,0.42) 0%,rgba(245,158,11,0.32) 22%,rgba(239,68,68,0.18) 40%,rgba(255,255,255,0) 70%)`,
        filter: "blur(55px)"
      }} />
      {igniting && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 100, pointerEvents: "none",
          background: "radial-gradient(ellipse at center,rgba(253,224,71,0.55) 0%,rgba(234,88,12,0.38) 40%,rgba(255,255,255,0) 75%)",
          animation: "ignitionFlash 0.42s ease forwards"
        }} />
      )}
    </>
  );
}