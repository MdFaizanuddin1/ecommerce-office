
import { logout } from "@/redux/userSlice";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const auth = useSelector((state) => state.user);
  const dispatch = useDispatch();

  return (
    <div className="flex justify-between items-center bg-blue-400 py-6 gap-2">
      <div>
        <NavLink
          className=""
          to="/"
        >
          Home
        </NavLink>
        <NavLink to='/cart'>Cart</NavLink>
      </div>
      <div className=" flex gap-2">
        {auth.currentUser === null && (
          <Fragment>
            <NavLink className="" to="/sign-in">
              sign-in
            </NavLink>
            <NavLink className="" to="/sign-up">
              sign-up
            </NavLink>
          </Fragment>
        )}
        {auth.currentUser && (
          <NavLink className="" to="/">
            <span onClick={() => dispatch(logout())}>Log Out</span>
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default Navbar;
