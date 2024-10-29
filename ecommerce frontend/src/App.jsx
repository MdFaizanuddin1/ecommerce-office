import { Outlet } from "react-router-dom";
import "./App.css";
// import { Button } from "./components/ui/button.jsx";
import Navbar from "./component/Navbar";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getCurrentUser } from "./redux/userSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  return (
    <div className="">
      <Navbar />

      <Outlet />

      {/* <Button>Click me</Button> */}
    </div>
  );
}

export default App;
