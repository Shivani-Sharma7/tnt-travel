"use client";
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useProfile } from '@/context/ProfileContext';

interface VisitTrackerProps {
  enabled?: boolean;
}

export default function VisitTracker({ enabled = true }: VisitTrackerProps) {
  const pathname = usePathname();
  const { user } = useProfile();

  useEffect(() => {
    if (!enabled) return;

    const logVisit = async () => {
      try {
        // Generate a session ID if it doesn't exist
        let sessionId = sessionStorage.getItem('tnt_session_id');
        if (!sessionId) {
          sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
          sessionStorage.setItem('tnt_session_id', sessionId);
        }

        // Get user ID if logged in
        const userId = user?.email || null;

        // Log the visit
        await fetch('/api/log-visit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            page: pathname,
            userId,
            sessionId,
          }),
        });

        console.log('Visit logged:', { page: pathname, userId, sessionId });
      } catch (error) {
        console.error('Failed to log visit:', error);
      }
    };

    // Log visit after a short delay to ensure page is fully loaded
    const timeoutId = setTimeout(logVisit, 1000);

    return () => clearTimeout(timeoutId);
  }, [pathname, user, enabled]);

  return null; // This component doesn't render anything
}
