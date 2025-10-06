"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CartItem {
  id: string;
  type: 'hotel' | 'taxi' | 'trip';
  name: string;
  price: number;
  image: string;
  details: {
    checkIn?: string;
    checkOut?: string;
    guests?: number;
    pickupLocation?: string;
    dropLocation?: string;
    pickupDate?: string;
    pickupTime?: string;
    passengers?: number;
    duration?: string;
    accommodation?: string;
    hotel?: string;
    transportation?: string;
    meals?: string;
    activities?: string;
    tripDate?: string;
    tripEndDate?: string;
  };
}

interface Order {
  orderId: string;
  transactionId: string;
  customerName: string;
  customerMobile: string;
  preferredDay?: string;
  preferredTime?: string;
  paymentMethod: string;
  amountPaid: number;
  totalAmount: number;
  isAdvancePayment: boolean;
  items: CartItem[];
  status: 'confirmed' | 'processing' | 'completed' | 'cancelled';
  orderDate: string;
  orderTime: string;
  comments?: string;
}

interface CartContextType {
  items: CartItem[];
  user: { name: string; email: string; mobile: string } | null;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getItemCount: () => number;
  checkLoginStatus: () => boolean;
  updateUser: (user: { name: string; email: string; mobile: string } | null) => void;
  saveOrder: (order: Order) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [user, setUser] = useState<{ name: string; email: string; mobile: string } | null>(null);

  // Load cart and user from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    const savedUser = localStorage.getItem('tnt_user');
    
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
    
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error loading user from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (item: CartItem) => {
    setItems(prev => {
      // Check if item already exists in cart
      const existingItemIndex = prev.findIndex(cartItem => cartItem.id === item.id);
      
      if (existingItemIndex >= 0) {
        // Update existing item
        const updatedItems = [...prev];
        updatedItems[existingItemIndex] = item;
        return updatedItems;
      } else {
        // Add new item
        return [...prev, item];
      }
    });
  };

  const removeFromCart = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setItems([]);
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + item.price, 0);
  };

  const getItemCount = () => {
    return items.length;
  };

  const checkLoginStatus = () => {
    return user !== null;
  };

  const updateUser = (newUser: { name: string; email: string; mobile: string } | null) => {
    setUser(newUser);
    if (newUser) {
      localStorage.setItem('tnt_user', JSON.stringify(newUser));
    } else {
      localStorage.removeItem('tnt_user');
    }
  };

  const saveOrder = (order: Order) => {
    try {
      const existingOrders = localStorage.getItem('tnt_order_history');
      const orders = existingOrders ? JSON.parse(existingOrders) : [];
      orders.push(order);
      localStorage.setItem('tnt_order_history', JSON.stringify(orders));
    } catch (error) {
      console.error('Error saving order:', error);
    }
  };

  return (
    <CartContext.Provider value={{
      items,
      user,
      addToCart,
      removeFromCart,
      clearCart,
      getTotalPrice,
      getItemCount,
      checkLoginStatus,
      updateUser,
      saveOrder
    }}>
      {children}
    </CartContext.Provider>
  );
}; 