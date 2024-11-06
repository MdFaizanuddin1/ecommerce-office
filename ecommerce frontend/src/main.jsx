import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "./component/Home";
import SignUp from "./component/auth/SignUp";
import SignIn from "./component/auth/SignIn";
import Logout from "./component/auth/Logout";

import { Provider } from "react-redux";
import { store } from "./app/store";
import HealthCheck from "./component/HealthCheck";
import Cart from "./component/products/Cart";
import ProductDetails from "./component/products/ProductDetails";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<Home />} />
      <Route path="product/:productId" element={<ProductDetails />} />
      <Route path="sign-in" element={<SignIn />} />
      <Route path="sign-up" element={<SignUp />} />
      <Route path="log-out" element={<Logout />} />
      <Route path="cart" element={<Cart />} />

      {/* health check */}
      <Route path="health" element={<HealthCheck />} />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
