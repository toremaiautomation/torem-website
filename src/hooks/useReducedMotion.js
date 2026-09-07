import { useReducedMotion as useFramerRM } from "framer-motion";

export function useReducedMotion() {
  const reduced = useFramerRM();
  return reduced === true;
}
