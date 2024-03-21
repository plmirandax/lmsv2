'use client'

import { useEffect } from 'react';
import { signOut } from 'next-auth/react';

export default function IdleTimeout() {
  useEffect(() => {
    let timeout: NodeJS.Timeout;

    function startTimer() {
      // Logout the user after 5 minutes of inactivity
      timeout = setTimeout(logout, 15 * 60 * 1000);
    }

    function resetTimer() {
      clearTimeout(timeout);
      startTimer();
    }

    function logout() {
      // Call the signOut function from 'next-auth/react'
      signOut();
    }

    document.addEventListener("mousemove", resetTimer, false);
    document.addEventListener("mousedown", resetTimer, false);
    document.addEventListener("keypress", resetTimer, false);
    document.addEventListener("touchmove", resetTimer, false);

    startTimer();

    return () => {
      // Cleanup
      document.removeEventListener("mousemove", resetTimer);
      document.removeEventListener("mousedown", resetTimer);
      document.removeEventListener("keypress", resetTimer);
      document.removeEventListener("touchmove", resetTimer);
    };
  }, []);

  return null;
}