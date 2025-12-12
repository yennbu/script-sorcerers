import { useEffect, useState } from "react";
export interface MenuItem {
  id: string;
  prodId: string;
  name: string;
  price: number;
  image: string;
  category: string;
  type: number;
}

export function useMenu() {
  const [data, setData] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_URL = import.meta.env.VITE_BACKEND_URL;
  const API_KEY = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    async function fetchMenu() {
      try {
        const res = await fetch(`${API_URL}/api/menu`, {
          method: "GET",
          headers: {
            "x-api-key": API_KEY,
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) throw new Error(`Failed to fetch menu: ${res.status}`);

        const json = await res.json();
        interface MenuApiItem {
          _id: string;
          title?: string;
          price: number;
          image?: string;
          prodId?: string;
          type?: number;
        }

        const mapped = (json.menu ?? []).map((item: MenuApiItem) => ({
          id: item._id,
          name: item.title ?? null,
          price: item.price,
          image: item.image ?? "",
          category: item.prodId ?? "okänd",
          type: item.type ?? 0,
        }));
        setData(mapped);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchMenu();
  }, [API_URL, API_KEY]);

  return { data, loading, error };
}
