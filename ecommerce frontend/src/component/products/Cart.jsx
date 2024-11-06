import {
  addToCart,
  clearCart,
  decreaseQuantity,
  getCartData,
} from "@/redux/cartSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Cart = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);

  // const itemCount = useSelector((state) => state.cart.itemsQuantityCount);
  // console.log("items is", items);
  useEffect(() => {
    dispatch(getCartData());
  }, [items, dispatch]); // Log only when 'items' changes
  //   console.log("item count is", itemCount);

  const handleDecrement = (product) => {
    // console.log("id is", product.productId);
    dispatch(decreaseQuantity(product));
  };

  const handleIncrement = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <div className="p-4 bg-gray-100">
      <h2 className="text-lg font-bold">
        Cart ({items.length ? `${items.length} items` : `Cart is Empty`} )
      </h2>
      <ul className="">
        {items.length > 0 &&
          items.map((item) => (
            <li
              key={item._id}
              className="flex justify-between items-center p-2 border-b"
            >
              <p>{item.productname}</p>

              <p className=" flex gap-3">
                <span>Quantity</span> x{item.quantity}
                <button onClick={() => handleIncrement(item)}>+</button>
                <button onClick={() => handleDecrement(item)}>-</button>
              </p>
              <p>${item.price * item.quantity}</p>
            </li>
          ))}
      </ul>
      <p className="mt-4 font-semibold">
        Total:
        {items.length > 0 &&
          items
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
