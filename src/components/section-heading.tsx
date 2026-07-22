"use client"

import React from "react";
import { motion } from "framer-motion";

export const SectionHeading = ({
  children,
  delay = 0,
}: {
  children: string;
  delay?: number;
}) => {
  return (
    <h2 className="text-secondary max-w-lg pt-2 mb-4 text-sm font-normal md:text-sm">
      {children.split(" ").map((word, idx) => (
        <motion.span
          initial={{ opacity: 0, y: 5, filter: "blur(2px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            delay: delay + idx * 0.05,
            duration: 0.3,
            ease: "easeInOut",
          }}
          viewport={{ once: true }}
          key={word + idx}
          className="inline-block"
        >
          {word}&nbsp;
        </motion.span>
      ))}
    </h2>
  );
};
