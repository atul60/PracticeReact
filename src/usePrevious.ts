import { useState, useEffect, useRef, Ref } from "react";

export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<any>(undefined);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;

  // your code here
}
