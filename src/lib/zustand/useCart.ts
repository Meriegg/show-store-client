import { create } from 'zustand';
import type { Product } from '@prisma/client';

export interface CartItem {
  baseItem: Product;
  quantity: number;
  size: string;
}

interface UseCart {
  items: CartItem[];
  showItemPreview: boolean;
  latestItem: CartItem | null;
  isOpen: boolean;
  toggleOpen: () => void;
  toggleItemPreview: () => void;
  addItem: (item: CartItem) => void;
  removeItem: (props: { id: string; size: string }) => void;
  increaseItemQuantity: (props: { id: string; size: string }) => void;
  decreaseItemQuantity: (props: { id: string; size: string }) => void;
};

export const useCart = create<UseCart>((set) => ({
  items: [],
  showItemPreview: false,
  latestItem: null,
  isOpen: false,
  toggleOpen: () => set(({ isOpen }) => ({ isOpen: !isOpen })),
  addItem: (item) => set(({ items }) => {
    const idx = items.findIndex((arrItem) => arrItem.baseItem.id === item.baseItem.id && arrItem.size == item.size);
    const isAlreadyExisting = idx !== -1;

    if (!isAlreadyExisting) {
      return {
        items: [...items, item],
        latestItem: item,
        showItemPreview: true
      }
    };

    items[idx].quantity += item.quantity;

    return {
      items,
      latestItem: item,
      showItemPreview: true
    }
  }),
  removeItem: ({ id, size }) => set(({ items, latestItem }) => {
    const idx = items.findIndex((arrItem) => arrItem.baseItem.id === id && arrItem.size === size)
    if (idx === -1) return { items };

    const itemToBeRemoved = items[idx];
    if (JSON.stringify(itemToBeRemoved) === JSON.stringify(latestItem)) {
      latestItem = null
    }

    items.splice(idx, 1);

    return { items, latestItem }
  }),
  decreaseItemQuantity: ({ id, size }) => set(({ items }) => {
    const idx = items.findIndex((arrItem) => arrItem.baseItem.id === id && arrItem.size === size)
    if (idx === -1) return { items };

    const item = items[idx];
    if (item.quantity <= 1) return { items };

    item.quantity -= 1;

    return { items }
  }),
  increaseItemQuantity: ({ id, size }) => set(({ items }) => {
    const idx = items.findIndex((arrItem) => arrItem.baseItem.id === id && arrItem.size === size)
    if (idx === -1) return { items };

    const item = items[idx];
    item.quantity += 1;

    return {
      items
    }
  }),
  toggleItemPreview: () => set(({ showItemPreview }) => ({ showItemPreview: !showItemPreview }))
}))