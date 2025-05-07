import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthUtils/AuthContexts";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [userId, setUserId] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [totalPay, setTotalPay] = useState();
  const { user } = useContext(AuthContext);

  console.log("User trong cart item", user);

  useEffect(() => {
    if (user && user._id) {
      setUserId(user._id);
      const savedCart = JSON.parse(localStorage.getItem("itemCart")) || {};
      setCartItems(savedCart[user._id] || []);
    }
  }, [user]); // Chỉ chạy khi user thay đổi

  const updateLocalStorage = (updatedCart) => {
    const savedCart = JSON.parse(localStorage.getItem("itemCart")) || {};
    savedCart[userId] = updatedCart;
    localStorage.setItem("itemCart", JSON.stringify(savedCart));
  };

  const addToCart = (item, qty = 1) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      const currentQtyInCart = existingItem ? existingItem.qty : 0;

      if (currentQtyInCart + qty > item.qtyStock) {
        alert("Số lượng sản phẩm trong kho không đủ!");
        return prevItems; // Không cập nhật giỏ hàng
      }

      let updatedCart;

      if (existingItem) {
        updatedCart = prevItems.map((i) =>
          i.id === item.id ? { ...i, qty: i.qty + qty } : i
        );
      } else {
        updatedCart = [...prevItems, { ...item, qty }];
      }

      updateLocalStorage(updatedCart);
      alert("Sản Phẩm Đã Được Thêm Vào Giỏ Hàng !");
      return updatedCart;
    });
  };

  const removeFromCart = (itemId) => {
    const updatedCart = cartItems.filter((i) => i.id !== itemId);
    setCartItems(updatedCart);
    updateLocalStorage(updatedCart);
  };

  const handleIncreaseItem = (product, qty = 1) => {
    const existingItem = cartItems.find((item) => item.id === product.id);
    const currentQtyInCart = existingItem ? existingItem.qty : 0;

    if (currentQtyInCart + qty > product.qtyStock) {
      alert("Số lượng sản phẩm trong kho không đủ!");
      return;
    }

    addToCart(product, qty);
  };

  const handleDecreaseItem = (itemId) => {
    const existingItem = cartItems.find((i) => i.id === itemId);
    if (!existingItem || existingItem.qty <= 1) return;

    const updatedCart = cartItems.map((i) =>
      i.id === itemId ? { ...i, qty: i.qty - 1 } : i
    );
    setCartItems(updatedCart);
    updateLocalStorage(updatedCart);
  };

  const clearCart = (idUser) => {
    console.log("Cart cua user can xoa ", idUser);
    setCartItems([]);
    const savedCart = JSON.parse(localStorage.getItem("itemCart")) || {};
    savedCart[idUser] = [];
    localStorage.setItem("itemCart", JSON.stringify(savedCart));
  };

  const totalItem = cartItems.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.qty * item.unitPrice,
    0
  );

  return (
    <CartContext.Provider
      value={{
        userId,
        setUserId,
        clearCart,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        totalItem,
        totalPrice,
        handleIncreaseItem,
        handleDecreaseItem,
        setTotalPay,
        totalPay,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
