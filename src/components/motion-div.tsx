"use client";

import React from "react";
import { AnimationProps, motion, HTMLMotionProps } from "framer-motion";

type MotionDivProps = AnimationProps &
  HTMLMotionProps<"div"> & {
    children: React.ReactNode;
  };

export const MotionDiv: React.FC<MotionDivProps> = ({
  children,
  ...props
}) => {
  return <motion.div {...props}>{children}</motion.div>;
};
