"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

type PageTransitionProps = {
  children: ReactNode;
};

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  const smoothSpring = {
    type: "spring" as const,
    stiffness: 260,
    damping: 28,
    mass: 0.65,
  };

  if (reduceMotion) {
    return <div className="overflow-x-clip">{children}</div>;
  }

  return (
    <div className="overflow-x-clip">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={pathname}
          initial={{ x: 16, opacity: 0.01 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -12, opacity: 0.01 }}
          transition={smoothSpring}
          style={{ willChange: "transform, opacity" }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}