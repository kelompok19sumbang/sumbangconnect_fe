// src/components/AnimatedBar.tsx
'use client';

import { motion } from 'motion/react';

interface AnimatedBarProps {
  widthPercent: number;
  value: number;
  delay?: number;
}

export default function AnimatedBar({ widthPercent, value, delay = 0 }: AnimatedBarProps) {
  return (
    <motion.div
      initial={{ width: 0 }}
      whileInView={{ width: `${widthPercent}%` }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 1.2, ease: "easeOut", delay }}
      className="h-full bg-gradient-to-r from-[#093720] to-[#0c4a2a] rounded-r-xl flex items-center justify-end px-3 min-w-[24px]"
    >
      <span className="text-xs font-bold text-white drop-shadow-md">{value}</span>
    </motion.div>
  );
}