
import { useState, useEffect } from 'react';

export const useScrollDirection = () => {
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up');
  const [isVisible, setIsVisible] = useState(true);
  const [manuallyHidden, setManuallyHidden] = useState(false);

  useEffect(() => {
    let lastScrollY = window.pageYOffset;
    let ticking = false;

    const updateScrollDirection = () => {
      const scrollY = window.pageYOffset;
      
      if (Math.abs(scrollY - lastScrollY) < 10) {
        ticking = false;
        return;
      }

      const direction = scrollY > lastScrollY ? 'down' : 'up';
      setScrollDirection(direction);
      
      // Only update visibility based on scroll if not manually hidden
      if (!manuallyHidden) {
        // Show navbar when scrolling up or at top of page
        setIsVisible(direction === 'up' || scrollY < 10);
      }
      
      lastScrollY = scrollY > 0 ? scrollY : 0;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollDirection);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll);
    
    return () => window.removeEventListener('scroll', onScroll);
  }, [manuallyHidden]);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
    setManuallyHidden(!isVisible); // If hiding, mark as manually hidden
  };

  const showNavbar = () => {
    setIsVisible(true);
    setManuallyHidden(false);
  };

  const hideNavbar = () => {
    setIsVisible(false);
    setManuallyHidden(true);
  };

  return { 
    scrollDirection, 
    isVisible, 
    manuallyHidden,
    toggleVisibility,
    showNavbar,
    hideNavbar
  };
};
