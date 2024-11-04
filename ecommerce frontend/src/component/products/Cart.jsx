import { clearCart, decreaseQuantity } from "@/redux/cartSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Cart = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const itemCount = useSelector((state) => state.cart.itemsQuantityCount);
  //   console.log("items is", items);
  //   console.log("item count is", itemCount);

  return (
    <div className="p-4 bg-gray-100">
      <h2 className="text-lg font-bold">Cart ({items.length} items)</h2>
      <ul>
        {items.map((item) => (
          <li
            key={item._id}
            className="flex justify-between items-center p-2 border-b"
          >
            <span>{item.productname}</span>

            <span>x{item.quantity}</span>
            <span>${item.price * item.quantity}</span>
          </li>
        ))}
      </ul>
      <p className="mt-4 font-semibold">
        Total:
        {items
          .reduce((acc, item) => acc + item.price * item.quantity, 0)
          .toFixed(2)}
      </p>
      <button
        className=" bg-red-800 rounded-lg border"
        onClick={() => {
          dispatch(clearCart());
        }}
      >
        Clear cart
      </button>
    </div>
  );
};

export default Cart;
