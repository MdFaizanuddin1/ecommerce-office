import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  items: [], // Array of cart items with details

  status: "idle",
  error: "",

  itemsQuantityCount: 0, // Total quantity of all items in cart
};

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (product, thunkAPI) => {
    try {
      const response = await axios.post(
        `/api/v1/cart/addToCart/${product._id}`
      );
      //   console.log("response is", response.data);
      //   itemsQuantityCount += itemsQuantityCount;
      return response.data.data;
    } catch (error) {
      console.log("error is", error);
      return thunkAPI.rejectWithValue(error.response.data.errors);
    }
  }
);

export const clearCart = createAsyncThunk(
  "cart/clearCart",
  async (_, thunkAPI) => {
    try {
      const response = await axios.delete(`/api/v1/cart/clearCart`);
    //   console.log("response is", response.data);
      //   itemsQuantityCount = 0;
      return response.data.data;
    } catch (error) {
      console.log("error is", error);
      return thunkAPI.rejectWithValue(error.response.data.errors);
    }
  }
);

export const decreaseQuantity = createAsyncThunk(
  "cart/decreaseQuantity",
  async (product, thunkAPI) => {
    try {
      const response = await axios.put(
        `/api/v1/cart/decreaseQuantity/${product._id}`
      );
      console.log("response is", response.data);
      //   itemsQuantityCount -= itemsQuantityCount;
      return response.data.data;
    } catch (error) {
      console.log("error is", error);
      return thunkAPI.rejectWithValue(error.response.data.errors);
    }
  }
);

export const getCartData = createAsyncThunk(
  "cart/getCartData",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`/api/v1/cart/getCartData`);
    //   console.log("response is", response.data);
      return response.data.data;
    } catch (error) {
      console.log("error is", error);
      return thunkAPI.rejectWithValue(error.response.data.errors);
    }
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.fulfilled, (state, action) => {
        const existingItem = state.items.find(
          (item) => item._id === action.payload._id
        );
        if (existingItem) {
          // If the item already exists, increase its quantity
          existingItem.quantity += 1;
        } else {
          // If the item doesn't exist, add it with quantity 1
          state.items.push({ ...action.payload, quantity: 1 });
        }
        state.itemsQuantityCount += 1; // Incrementing the quantity count
      })
      .addCase(decreaseQuantity.fulfilled, (state, action) => {
        // Handle local item removal if necessary
      })
      .addCase(getCartData.fulfilled, (state, action) => {
        state.items = action.payload; // Setting the fetched cart items
        state.itemsQuantityCount = action.payload.reduce(
          (total, item) => total + item.quantity,
          0
        ); // Calculating total quantity
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.items = []; // Clear items
        state.itemsQuantityCount = 0; // Reset quantity count
      })
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.status = "loading"; // Set loading status
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.status = "failed"; // Set failed status
          state.error = action.error.message; // Capture error message
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/fulfilled"),
        (state) => {
          state.status = "succeeded"; // Set succeeded status
        }
      );
  },
  reducers: {
    // // Add an item to the cart (or increase quantity if it exists)
    // addItem: (state, action) => {
    //   const item = action.payload;
    //   const existingItem = state.items.find((i) => i._id === item._id);
    //   if (existingItem) {
    //     existingItem.quantity += 1;
    //   } else {
    //     state.items.push({ ...item, quantity: 1 });
    //   }
    //   state.itemsQuantityCount += 1; // Increment total item quantity
    // },
    // // Decrease item quantity by one
    // decreaseQuantity: (state, action) => {
    //   const itemId = action.payload;
    //   const existingItem = state.items.find((i) => i._id === itemId);
    //   if (existingItem) {
    //     if (existingItem.quantity > 1) {
    //       existingItem.quantity -= 1;
    //       state.itemsQuantityCount -= 1;
    //     } else {
    //       // If quantity is 1, remove item entirely
    //       state.items = state.items.filter((i) => i._id !== itemId);
    //       state.itemsQuantityCount -= 1;
    //     }
    //   }
    // },
    // // Remove all items from the cart (clear cart)
    // clearCart: (state) => {
    //   state.items = [];
    //   state.itemsQuantityCount = 0;
    // },
  },
});

// export const { addItem, clearCart, decreaseQuantity } = cartSlice.actions;
export const {} = cartSlice.actions;

export default cartSlice.reducer;

