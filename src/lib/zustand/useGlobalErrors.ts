import { create } from "zustand";

interface UseGlobalErrors {
  errors: string[];
  pushError: (error: string) => void;
}

export const useGlobalErrors = create<UseGlobalErrors>((set) => ({
  errors: [],
  pushError: (error) => set(({ errors }) => ({
    errors: [...errors, error]
  }))
}))