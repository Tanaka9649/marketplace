"use client";
import { MotionConfig } from "motion/react";

export function Providers({ children }: { children: React.ReactNode }) {
  // reducedMotion="user" respeita a preferência do sistema operacional
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
