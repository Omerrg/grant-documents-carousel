import { useEffect, useState } from "react";

export function usePagination<T>(items: T[]) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  useEffect(() => {
    setCurrentIndex(0);
  }, [items])

  const goToNext = () => {
    setCurrentIndex((prevIndex) => {
      return prevIndex === items.length - 1 ? prevIndex : prevIndex + 1;
    });
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => {
      return prevIndex === 0 ? prevIndex : prevIndex - 1;
    });
  };
  return {
    goToNext,
    goToPrevious,
    currentIndex: currentIndex,
  };
}
