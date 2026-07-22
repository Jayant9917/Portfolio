import React from 'react'
import { cn } from '@/lib/utils'

export const Container = ({children, className}: {children: React.ReactNode, className?: string}) => {
  return (
    <div className={cn("max-w-[805px] w-full mx-auto bg-white dark:bg-black", className)}> {children}
    </div>
  )
}
