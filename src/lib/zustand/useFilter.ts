import { create } from 'zustand';

interface Filter {
  price: number | null;
  types: string[],
  setPrice: (val: number) => void;
  clearFilter: () => void;
  addType: (type: string) => void;
  removeType: (type: string) => void;
}

export const useFilter = create<Filter>((set) => ({
  price: null,
  types: [],
  addType: (type) => set(({ types }) => ({
    types: [...types, type]
  })),
  removeType: (value) => set(({ types }) => {
    const newTypes = types.filter((type) => type !== value)

    return {
      types: newTypes
    }
  }),
  setPrice: (val) => set(() => ({
    price: val
  })),
  clearFilter: () => set(() => ({
    price: null,
    types: []
  })),
}))