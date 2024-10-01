"use client";

import React from "react";
import { motion } from "framer-motion";
import clsx from "clsx";

interface AIResultAnimationProps {
  children?: React.ReactNode;
  className?: string;
}

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
};

const dotVariants = {
  hidden: { y: 0 },
  visible: {
    y: [0, -10, 0],
    transition: {
      repeat: Infinity,
      duration: 0.8,
    },
  },
};

export default function AIResultAnimation({
  children,
  className,
}: AIResultAnimationProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className={clsx("bg-blue-100 p-6 rounded-lg shadow-md", className)}
    >
      {!children ? (
        <div className="flex items-center justify-center space-x-2">
          <span className="text-blue-600 font-semibold">AI is thinking</span>
          {[0, 1, 2].map((index) => (
            <motion.span
              key={index}
              variants={dotVariants}
              className="w-2 h-2 bg-blue-600 rounded-full"
              style={{ display: "inline-block" }}
            />
          ))}
        </div>
      ) : (
        children
      )}
    </motion.div>
  );
}
