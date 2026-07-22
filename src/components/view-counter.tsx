'use client';

import { useEffect, useState } from 'react';

interface ViewCounterProps {
  slug: string;
  initialViews?: number;
}

export function ViewCounter({ slug, initialViews = 0 }: ViewCounterProps) {
  const [views, setViews] = useState(initialViews);
  const [isLoading, setIsLoading] = useState(true);

  // Check if running in browser (for Next.js)
  const isBrowser = typeof window !== 'undefined';

  useEffect(() => {
    let isMounted = true;

    const updateViewCount = async () => {
      try {
        // Check if already viewed in this session
        const hasViewed = isBrowser ? sessionStorage.getItem(`viewed_${slug}`) : false;
        
        if (!hasViewed) {
          // First, get the current view count
          const getResponse = await fetch(`/api/view-count?slug=${encodeURIComponent(slug)}`);
          if (getResponse.ok) {
            const { views: currentViews } = await getResponse.json();
            if (isMounted) setViews(parseInt(currentViews) || 0);
            
            // Then, increment the view count
            await fetch('/api/view-count', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ slug }),
            });
            
            // Mark as viewed in this session
            if (isBrowser) {
              sessionStorage.setItem(`viewed_${slug}`, 'true');
            }
            
            // Update the view count
            if (isMounted) setViews(prev => prev + 1);
          }
        } else {
          // Just get the current count if already viewed
          const getResponse = await fetch(`/api/view-count?slug=${encodeURIComponent(slug)}`);
          if (getResponse.ok) {
            const { views: currentViews } = await getResponse.json();
            if (isMounted) setViews(parseInt(currentViews) || 0);
          }
        }
      } catch (error) {
        console.error('Error updating view count:', error);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    updateViewCount();
    
    return () => {
      isMounted = false;
    };
  }, [slug, isBrowser]);

  // Format number with comma separators
  const formattedViews = new Intl.NumberFormat('en-US').format(views);

  if (isLoading) {
    return (
      <div className="flex items-center gap-1">
        <span className="dark:text-neutral-300">👁️</span>
        <span className="dark:text-neutral-300 text-sm">...</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1">
      <span className="dark:text-neutral-300">👁️</span>
      <span className="dark:text-neutral-300 text-sm">
        {formattedViews} {views === 1 ? 'view' : 'views'}
      </span>
    </div>
  );
}