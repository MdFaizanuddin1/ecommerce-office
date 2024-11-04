import { Outlet } from "react-router-dom";
// import { Button } from "./components/ui/button.jsx";
import Navbar from "./component/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCurrentUser } from "./redux/userSlice";
import { getCartData } from "./redux/cartSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  const auth = useSelector((state) => state.user);
  // console.log(auth.currentUser);

  useEffect(() => {
    if (auth.currentUser) {
      dispatch(getCartData());
    }
  }, [dispatch,auth]);

  return (
    <div className="">
      <Navbar />

      <Outlet />

      {/* <Button>Click me</Button> */}
    </div>
  );
}

export default App;
