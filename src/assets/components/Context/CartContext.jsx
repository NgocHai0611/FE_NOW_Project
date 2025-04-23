import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem("itemCart");
    return saved ? JSON.parse(saved) : [];
  });

  const updateLocalStorage = (updatedCart) => {
    // Lưu giỏ hàng vào localStorage mà không liên quan đến idUser
    localStorage.setItem("itemCart", JSON.stringify(updatedCart));
  };

  const addToCart = (item, qty = 1) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      let updatedCart;

      // Tồn tại thì tăng qty lên 1
      if (existingItem) {
        updatedCart = prevItems.map((i) =>
          i.id === item.id ? { ...i, qty: i.qty + qty } : i
        );
      } else {
        // Chưa tồn tại thêm vào giỏ
        updatedCart = [...prevItems, { ...item, qty }];
      }

      updateLocalStorage(updatedCart);
      return updatedCart;
    });
  };

  const removeFromCart = (itemId) => {
    setCartItems((prevItems) => {
      const updatedCart = prevItems.filter((i) => i.id !== itemId);
      updateLocalStorage(updatedCart);
      return updatedCart;
    });
  };

  const handleIncreaseItem = (product, qty = 1) => {
    addToCart(product, qty);
  };

  const handleDecreaseItem = (itemId) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === itemId);
      if (!existingItem || existingItem.qty <= 1) return prevItems;

      const updatedCart = prevItems.map((i) =>
        i.id === itemId ? { ...i, qty: i.qty - 1 } : i
      );

      updateLocalStorage(updatedCart);
      return updatedCart;
    });
  };

  const totalItem = cartItems.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.qty * item.unitPrice,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        totalItem,
        totalPrice,
        handleIncreaseItem,
        handleDecreaseItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
