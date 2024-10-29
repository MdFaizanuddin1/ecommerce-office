import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { logout } from "@/redux/userSlice";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const auth = useSelector((state) => state.user);
  const dispatch = useDispatch();

  return (
    <div className=" flex justify-center">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavLink className={navigationMenuTriggerStyle()} to="/">
              Home
            </NavLink>
            {auth.currentUser === null && (
              <Fragment>
                <NavLink className={navigationMenuTriggerStyle()} to="/sign-in">
                  sign-in
                </NavLink>
                <NavLink className={navigationMenuTriggerStyle()} to="/sign-up">
                  sign-up
                </NavLink>
              </Fragment>
            )}
            {auth.currentUser && (
              <NavLink className={navigationMenuTriggerStyle()} to="/">
                <span onClick={() => dispatch(logout())}>Log Out</span>
              </NavLink>
            )}
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default Navbar;
