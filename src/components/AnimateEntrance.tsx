"use client";

import { motion } from "framer-motion";

const variants = {
  hidden: { opacity: 0, x: 0, y: 10 },
  enter: { opacity: 1, x: 0, y: 0 },
};

export default function AnimateEntrance({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <motion.div
      initial="hidden"
      animate="enter"
      transition={{ duration: 0.5, type: "easeInOut" }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}
