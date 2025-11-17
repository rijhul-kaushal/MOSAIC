import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const CartContext = createContext(undefined);
const STORAGE_KEY = 'mosaicCart';
const TAX_RATE = 0.18;

const normaliseCartItem = (item) => ({
  id: item.id,
  name: item.name,
  price: Number(item.price) || 0,
  quantity: Number(item.quantity) || 1,
  image: item.image ?? '',
});

const loadCartFromStorage = () => {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed.map(normaliseCartItem);
  } catch (error) {
    console.error('Failed to load cart from storage:', error);
    return [];
  }
};

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(loadCartFromStorage);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      console.error('Failed to persist cart to storage:', error);
    }
  }, [items]);

  const addItem = (incomingItem) => {
    setItems((current) => {
      const item = normaliseCartItem(incomingItem);
      const existingIndex = current.findIndex((entry) => entry.id === item.id);

      if (existingIndex > -1) {
        const next = [...current];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + item.quantity,
        };
        return next;
      }

      return [...current, item];
    });
  };

  const updateItemQuantity = (id, quantity) => {
    setItems((current) => {
      if (quantity <= 0) {
        return current.filter((item) => item.id !== id);
      }

      return current.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity,
            }
          : item,
      );
    });
  };

  const removeItem = (id) => {
    setItems((current) => current.filter((item) => item.id !== id));
  };

  const clearCart = () => setItems([]);

  const totals = useMemo(() => {
    const subtotal = items.reduce((sum, { price, quantity }) => sum + price * quantity, 0);
    const tax = subtotal * TAX_RATE;
    const total = subtotal + tax;
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
    return {
      subtotal,
      tax,
      total,
      itemCount,
    };
  }, [items]);

  const value = useMemo(
    () => ({
      items,
      addItem,
      updateItemQuantity,
      removeItem,
      clearCart,
      taxRate: TAX_RATE,
      ...totals,
    }),
    [items, totals],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

