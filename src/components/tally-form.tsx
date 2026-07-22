"use client";

import React from 'react';
import { cn } from '@/lib/utils';

interface TallyFormProps {
  className?: string;
}

export const TallyForm = ({ className }: TallyFormProps) => {
  return (
    <div className={cn("tally-frame", className)}>
      <iframe
        src="https://tally.so/embed/3ljxDX?alignLeft=1&hideTitle=1&transparentBackground=1"
        width="100%"
        height="100%"
        frameBorder="0"
        marginHeight={0}
        marginWidth={0}
        title="Contact Form"
        className="border-0"
        loading="lazy"
      />
    </div>
  );
};
