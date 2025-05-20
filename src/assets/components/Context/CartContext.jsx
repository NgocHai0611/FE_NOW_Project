import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthUtils/AuthContexts";
import axios from "axios";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [userId, setUserId] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [totalPay, setTotalPay] = useState();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user && user.id) {
      console.log("User Add To Cart: ", user);
      setUserId(user.id);
      fetchCartFromRedis(user.id);
    }
  }, [user]);

  const fetchCartFromRedis = async (uid) => {
    try {
      const res = await axios.get(`http://localhost:3005/cart/${uid}`);
      if (res.data.success) {
        console.log("Cart item trong redis : ", res.data);
        setCartItems(res.data.cart);
      }
    } catch (error) {
      console.error("Lỗi khi lấy giỏ hàng từ Redis:", error);
    }
  };

  const addToCart = async (item, qty = 1) => {
    console.log("User ID Khi Add ", userId);

    try {
      const res = await axios.post(`http://localhost:3005/cart/add`, {
        userId,
        item,
        qty,
      });
      if (res.data.success) {
        setCartItems(res.data.cart);
        alert("Sản phẩm đã được thêm vào giỏ hàng!");
      }
    } catch (error) {
      console.error("Lỗi khi thêm sản phẩm vào Redis:", error);
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      const res = await axios.delete(
        `http://localhost:3005/cart/remove/${userId}/${itemId}`
      );
      if (res.data.success) {
        setCartItems(res.data.cart);
      }
    } catch (error) {
      console.error("Lỗi khi xoá sản phẩm:", error);
    }
  };

  const handleIncreaseItem = async (item, increaseQty = 1) => {
    const currentItem = cartItems.find((i) => i.id === item.id);
    const newQty = (currentItem?.qty || 0) + increaseQty;

    if (newQty > item.qtyStock) {
      alert("Số lượng trong kho không đủ!");
      return;
    }

    await updateItemQty(item.id, newQty);
  };

  const handleDecreaseItem = async (itemId) => {
    const currentItem = cartItems.find((i) => i.id === itemId);
    if (!currentItem || currentItem.qty <= 1) return;

    await updateItemQty(itemId, currentItem.qty - 1);
  };

  const updateItemQty = async (itemId, qty) => {
    try {
      const res = await axios.put(`http://localhost:3005/cart/updateQty`, {
        userId,
        itemId,
        qty,
      });
      if (res.data.success) {
        setCartItems(res.data.cart);
      }
    } catch (error) {
      console.error("Lỗi cập nhật số lượng:", error);
    }
  };

  const clearCart = async () => {
    try {
      const res = await axios.delete(
        `http://localhost:3005/cart/clear/${userId}`
      );
      if (res.data.success) {
        setCartItems([]);
      }
    } catch (error) {
      console.error("Lỗi khi xoá toàn bộ giỏ hàng:", error);
    }
  };

  const totalItem = cartItems.length;

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
