import { useState, useCallback } from "react";

export const useSelection = (itemsLength: number) => {
  const [selectedIndexes, setSelectedIndexes] = useState<number[]>(() =>
    Array.from({ length: itemsLength }, (_, i) => i)
  );

  const selectIndex = useCallback((index: number) => {
    setSelectedIndexes((prev) => {
      if (prev.includes(index)) {
        return prev.length > 1 ? prev.filter((i) => i !== index) : prev;
      } else {
        return [...prev, index];
      }
    });
  }, []);

  const toggleSelectAll = useCallback(() => {
    setSelectedIndexes((prev) => {
      if (prev.length !== itemsLength) {
        return Array.from({ length: itemsLength }, (_, i) => i);
      } else {
        return [prev[0]];
      }
    });
  }, [itemsLength]);

  return {
    selectedIndexes,
    selectIndex,
    toggleSelectAll,
  };
};
