import { useState, useEffect } from 'react';
import { getGreeting } from '../utils/greeting';

/**
 * Hook to manage the dynamic greeting state.
 * Returns the greeting string and a key for animation triggering.
 */
export const useGreeting = () => {
  const [greeting, setGreeting] = useState(getGreeting());

  useEffect(() => {
    // Update greeting if the time boundary is crossed while the page is open
    const interval = setInterval(() => {
      const nextGreeting = getGreeting();
      if (nextGreeting !== greeting) {
        setGreeting(nextGreeting);
      }
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [greeting]);

  return greeting;
};
