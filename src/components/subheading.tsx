"use client";
import React from 'react'
import { cn } from '@/lib/utils'
import { motion } from 'motion/react'

export const SubHeading = ({as: Tag = "h2", children, className }: {as: "h2" | "h3" | "h4" | "h5" | "h6", children: React.ReactNode, className?: string}) => {
  return (
    <motion.div
        initial={{ opacity: 0 , filter: "blur(10px)", y:10}}
        whileInView={{ opacity: 1 , filter: "blur(0px)", y:0}}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        viewport={{once: true}}
        >
    <Tag className={cn(`text-secondary dark:text-white/60 max-w-lg pt-4 text-sm md:text-base`, className)}>
      {children}
    </Tag>
    </motion.div>
  )
}
