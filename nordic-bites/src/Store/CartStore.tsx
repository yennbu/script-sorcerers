import { create } from "zustand";

export interface CartItem {
  prodId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  total: number;
  orderId?: string;

  addItem: (item: Omit<CartItem, "quantity">, userId: string) => void;
  removeItem: (id: string, userId: string) => void;
  clearCart: () => void;
  calculateTotal: () => void;

  syncCart: (userId: string) => Promise<void>;
  createOrder: (userId: string) => Promise<string | null>;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  total: 0,
  orderId: undefined,

  addItem: (item, userId) => {
    const { items } = get();
    console.log("items", items);
    const existing = items.find((i) => i.prodId === item.prodId);

    let updated: CartItem[];

    if (existing) {
      updated = items.map((i) =>
        i.prodId === item.prodId ? { ...i, quantity: i.quantity + 1 } : i
      );
    } else {
      updated = [...items, { ...item, quantity: 1 }];
    }

    set({ items: updated });
    get().calculateTotal();
    get().syncCart(userId);
  },

  removeItem: (id, userId) => {
    const updated = get()
      .items.map((i) =>
        i.prodId === id ? { ...i, quantity: i.quantity - 1 } : i
      )
      .filter((i) => i.quantity > 0);

    set({ items: updated });
    get().calculateTotal();
    get().syncCart(userId);
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

  syncCart: async (userId) => {
    try {
      const guestId = userId || localStorage.getItem("guestId") || undefined;
      const { items } = get();
      console.log("items", items);
      for (const item of items) {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "x-api-key": import.meta.env.VITE_API_KEY,
            },
            body: JSON.stringify({
              prodId: item.prodId,
              name: item.name,
              price: item.price,
              guestId,
              qty: item.quantity,
            }),
          }
        );
        const data = await res.json();
        if (data.success) {
          if (data.guestId) {
            localStorage.setItem("guestId", data.guestId);
          }
        }
      }
    } catch (err) {
      console.error("Error syncing cart:", err);
    }
  },

  createOrder: async (userId) => {
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
