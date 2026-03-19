import { useState, useEffect } from 'react';

export const useOrderTime = (createdAt) => {
  const [elapsedTime, setElapsedTime] = useState('');

  useEffect(() => {
    const calculateTime = () => {
      const start = new Date(createdAt);
      const now = new Date();
      const diffInSecs = Math.floor((now - start) / 1000);

      if (diffInSecs < 60) {
        setElapsedTime(`${diffInSecs}s ago`);
      } else if (diffInSecs < 3600) {
        setElapsedTime(`${Math.floor(diffInSecs / 60)}m ago`);
      } else if (diffInSecs < 86400) {
        setElapsedTime(`${Math.floor(diffInSecs / 3600)}h ago`);
      } else {
        const days = Math.floor(diffInSecs / 86400);
        setElapsedTime(`${days} ${days === 1 ? 'day' : 'days'} ago`);
      }
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, [createdAt]);

  const formattedDate = new Date(createdAt).toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });

  return { elapsedTime, formattedDate };
};