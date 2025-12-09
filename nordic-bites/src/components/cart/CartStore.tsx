import { create } from "zustand";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  total: number;

  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;

  /** Recalcula total dinámicamente */
  calculateTotal: () => void;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  total: 0,

  addItem: (item) => {
    const { items } = get();
    const existing = items.find((i) => i.id === item.id);

    let updated: CartItem[];

    if (existing) {
      updated = items.map((i) =>
        i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
      );
    } else {
      updated = [...items, { ...item, quantity: 1 }];
    }

    set({ items: updated });
    get().calculateTotal();
  },

  removeItem: (id) => {
    const updated = get()
      .items.map((i) => (i.id === id ? { ...i, quantity: i.quantity - 1 } : i))
      .filter((i) => i.quantity > 0);

    set({ items: updated });
    get().calculateTotal();
  },

  clearCart: () => {
    set({ items: [], total: 0 });
  },

  calculateTotal: () => {
    const total = get().items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    set({ total });
  },
  
}));
export const useTotalQuantity = () =>
  useCartStore((state) =>
    state.items.reduce((acc, item) => acc + item.quantity, 0)
  );
