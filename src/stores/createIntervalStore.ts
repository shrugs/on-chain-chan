import { readable } from "svelte/store";

export function createIntervalStore(ms: number) {
  return readable(new Date(), (set) => {
    const interval = setInterval(() => set(new Date()), ms);
    return () => clearInterval(interval);
  });
}
