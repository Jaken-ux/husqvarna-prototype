"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";

/* ═══════════════════════════════════════════════════════
   TYPES
   ═══════════════════════════════════════════════════════ */

export type CartItem = {
  articleNr: string;
  name: string;
  variant?: string;
  netPrice?: number; // in öre (cents)
  qty: number;
  comment: string;
  inStock?: boolean;
};

export type Cart = {
  id: string;
  name: string;
  items: CartItem[];
};

type CartContextType = {
  carts: Cart[];
  addToCart: (cartId: string, item: CartItem) => void;
  createCart: (name: string) => string; // returns new cart id
  removeFromCart: (cartId: string, articleNr: string) => void;
  updateQuantity: (cartId: string, articleNr: string, qty: number) => void;
  getCartItemCount: (cartId: string) => number;
  getTotalItemCount: () => number;
};

/* ═══════════════════════════════════════════════════════
   DEFAULT DATA
   ═══════════════════════════════════════════════════════ */

const defaultCarts: Cart[] = [
  {
    id: "cart-1",
    name: "Vårorder 2026",
    items: [
      {
        articleNr: "967 86 19-03",
        name: "Husqvarna 120 Mark II",
        variant: '120 Mark II (14" - 3/8" mini - S93G)',
        netPrice: 164938,
        qty: 1,
        comment: "Test QA 1 line",
        inStock: true,
      },
      {
        articleNr: "967 29 61-01",
        name: "Automower 430X NERA",
        variant: "430X NERA",
        netPrice: 2199900,
        qty: 2,
        comment: "",
        inStock: true,
      },
      {
        articleNr: "970 51 68-01",
        name: "Husqvarna 535i XP",
        variant: "535i XP (utan batteri/laddare)",
        netPrice: 549900,
        qty: 1,
        comment: "",
        inStock: true,
      },
    ],
  },
  {
    id: "cart-2",
    name: "QAutomation1",
    items: [],
  },
  {
    id: "cart-3",
    name: "QAutomationcart",
    items: [],
  },
];

/* ═══════════════════════════════════════════════════════
   CONTEXT
   ═══════════════════════════════════════════════════════ */

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [carts, setCarts] = useState<Cart[]>(defaultCarts);
  const [loaded, setLoaded] = useState(false);

  // Load from sessionStorage on mount
  useEffect(() => {
    try {
      const stored = sessionStorage.getItem("husqvarna-carts");
      if (stored) {
        setCarts(JSON.parse(stored));
      }
    } catch {}
    setLoaded(true);
  }, []);

  // Save to sessionStorage on change
  useEffect(() => {
    if (loaded) {
      try {
        sessionStorage.setItem("husqvarna-carts", JSON.stringify(carts));
      } catch {}
    }
  }, [carts, loaded]);

  const addToCart = useCallback((cartId: string, item: CartItem) => {
    setCarts((prev) =>
      prev.map((cart) => {
        if (cart.id !== cartId) return cart;
        const existing = cart.items.find((i) => i.articleNr === item.articleNr);
        if (existing) {
          return {
            ...cart,
            items: cart.items.map((i) =>
              i.articleNr === item.articleNr ? { ...i, qty: i.qty + item.qty, comment: item.comment || i.comment } : i
            ),
          };
        }
        return { ...cart, items: [...cart.items, item] };
      })
    );
  }, []);

  const createCart = useCallback((name: string) => {
    const id = `cart-${Date.now()}`;
    setCarts((prev) => [...prev, { id, name, items: [] }]);
    return id;
  }, []);

  const removeFromCart = useCallback((cartId: string, articleNr: string) => {
    setCarts((prev) =>
      prev.map((cart) =>
        cart.id === cartId ? { ...cart, items: cart.items.filter((i) => i.articleNr !== articleNr) } : cart
      )
    );
  }, []);

  const updateQuantity = useCallback((cartId: string, articleNr: string, qty: number) => {
    setCarts((prev) =>
      prev.map((cart) =>
        cart.id === cartId
          ? { ...cart, items: cart.items.map((i) => (i.articleNr === articleNr ? { ...i, qty } : i)) }
          : cart
      )
    );
  }, []);

  const getCartItemCount = useCallback((cartId: string) => {
    return carts.find((c) => c.id === cartId)?.items.reduce((s, i) => s + i.qty, 0) ?? 0;
  }, [carts]);

  const getTotalItemCount = useCallback(() => {
    return carts.reduce((s, c) => s + c.items.reduce((s2, i) => s2 + i.qty, 0), 0);
  }, [carts]);

  return (
    <CartContext.Provider value={{ carts, addToCart, createCart, removeFromCart, updateQuantity, getCartItemCount, getTotalItemCount }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
