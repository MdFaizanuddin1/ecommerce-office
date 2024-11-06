import { logout } from "@/redux/userSlice";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const auth = useSelector((state) => state.user);
  const dispatch = useDispatch();

  return (
    <div className="flex justify-between items-center bg-blue-300 py-5 gap-2">
      <div className="ml-6 flex gap-3">
        <NavLink
          className="font-bold text-blue-900 hover:text-blue-950 hover:underline"
          to="/"
        >
          Home
        </NavLink>
        <NavLink
          className="font-bold text-blue-900 hover:text-blue-950 hover:underline"
          to="/cart"
        >
          Cart
        </NavLink>
      </div>
      <div className=" flex gap-3 mr-6">
        {auth.currentUser === null && (
          <Fragment>
            <NavLink
              className="font-bold text-blue-900 hover:text-blue-950 hover:underline"
              to="/sign-in"
            >
              sign-in
            </NavLink>
            <NavLink
              className="font-bold text-blue-900 hover:text-blue-950 hover:underline"
              to="/sign-up"
            >
              sign-up
            </NavLink>
          </Fragment>
        )}
        {auth.currentUser && (
          <NavLink
            className="font-bold text-blue-900 hover:text-blue-950 hover:underline"
            to="/"
          >
            <span onClick={() => dispatch(logout())}>Log Out</span>
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default Navbar;
