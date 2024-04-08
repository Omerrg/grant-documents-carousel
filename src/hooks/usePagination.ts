import { useState } from "react";

export function usePagination<T>(items: T[]) {
  const [selectedIndexes, setSelectedIndexes] = useState<number[]>([0]);
  const [currentIndex, setCurrentIndex] = useState<number>(selectedIndexes[0]);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = selectedIndexes.indexOf(prevIndex) + 1;
      return selectedIndexes[nextIndex] ?? selectedIndexes[0];
    });
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => {
      const prevIndexPos = selectedIndexes.indexOf(prevIndex) - 1;
      return (
        selectedIndexes[prevIndexPos] ??
        selectedIndexes[selectedIndexes.length - 1]
      );
    });
  };

  const selectIndex = (index: number) => {
    if (selectedIndexes.includes(index)) {
      if (selectedIndexes.length === 1) return; // Prevent deselecting the last item
      setSelectedIndexes(
        selectedIndexes.filter((selectedIndex) => selectedIndex !== index)
      );
      if (currentIndex === index) {
        setCurrentIndex(selectedIndexes[0]);
      }
    } else {
      setSelectedIndexes([...selectedIndexes, index]);
    }
  };

  const selectAll = (selectAll: boolean) => {
    if (selectAll) {
      setSelectedIndexes(items.map((_, index) => index));
    } else {
      setSelectedIndexes([currentIndex]);
    }
  };

  return {
    goToNext,
    goToPrevious,
    currentIndex,
    selectIndex,
    selectAll,
    selectedIndexes,
  };
}
