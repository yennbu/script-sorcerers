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
  orderId?: string;

  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  calculateTotal: () => void;

  syncCart: (userId: string) => Promise<void>;

  createOrder: (userId: string) => Promise<string | null>;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  total: 0,
  orderId: undefined,

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
    set({ items: [], total: 0, orderId: undefined });
  },

  calculateTotal: () => {
    const total = get().items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    set({ total });
  },

  syncCart: async (userId: string) => {
    try {
      const { items } = get();
      for (const item of items) {
        await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/cart/${userId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": import.meta.env.VITE_API_KEY,
          },
          body: JSON.stringify({
            prodId: item.id,
            name: item.name,
            price: item.price,
            qty: item.quantity,
            image: item.image,
          }),
        });
      }
    } catch (err) {
      console.error("Error syncing cart:", err);
    }
  },

  createOrder: async (userId: string) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/orders`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": import.meta.env.VITE_API_KEY,
          },
          body: JSON.stringify({
            cartId: userId,
            note: "",
          }),
        }
      );

      const result = await res.json();

      if (result.success) {
        set({ orderId: result.order.orderId });
        get().clearCart();
        return result.order.orderId;
      } else {
        console.error("Order creation failed:", result.message);
        return null;
      }
    } catch (err) {
      console.error("Error creating order:", err);
      return null;
    }
  },
}));

export const useTotalQuantity = () =>
  useCartStore((state) =>
    state.items.reduce((acc, item) => acc + item.quantity, 0)
  );
