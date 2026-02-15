import { useState, useEffect, useRef, useCallback } from 'react';

export function useAutoAdvanceCarousel(
  totalSlides: number,
  intervalMs: number = 5000,
  initialIndex: number = 0
) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<number | null>(null);

  const clearTimer = useCallback(() => {
    if (timerRef.current !== null) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const startTimer = useCallback(() => {
    if (intervalMs <= 0) return; // Don't start timer if interval is 0 or negative
    
    clearTimer();
    timerRef.current = window.setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides);
    }, intervalMs);
  }, [intervalMs, totalSlides, clearTimer]);

  useEffect(() => {
    if (!isPaused && intervalMs > 0) {
      startTimer();
    } else {
      clearTimer();
    }

    return clearTimer;
  }, [isPaused, startTimer, clearTimer, intervalMs]);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const pauseAutoAdvance = useCallback(() => {
    setIsPaused(true);
  }, []);

  const resumeAutoAdvance = useCallback(() => {
    setIsPaused(false);
  }, []);

  return {
    currentIndex,
    goToSlide,
    nextSlide,
    prevSlide,
    pauseAutoAdvance,
    resumeAutoAdvance,
  };
}
