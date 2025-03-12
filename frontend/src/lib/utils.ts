import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Combines class names and Tailwind CSS utilities into a single string, optimizing for performance and avoiding conflicts.
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
