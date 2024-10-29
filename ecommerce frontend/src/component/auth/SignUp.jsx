import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { register } from "@/redux/userSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const handleSignUpButtonClick = () => {
    // console.log('button clicked');
    // Navigate to a new route
    navigate("/sign-up");
  };
  const handleSignInButtonClick = () => {
    navigate("/sign-in");
  };

  function onSubmit(e) {
    e.preventDefault();
    let userCredentials = {
      username: userName,
      email,
      password,
    };
    // console.log("register", userCredentials);
    dispatch(register(userCredentials)).then((action) => {
      localStorage.setItem("accessToken", action.payload.data.token);
      navigate ('/')
    });
  }
  return (
    <div className="flex items-center justify-center mt-20">
      <div className="flex flex-col w-full max-w-sm items-center space-y-2">
        <form
          className="flex flex-col w-full max-w-sm items-start space-y-2 gap-1"
          onSubmit={onSubmit}
        >
          <Input
            type="username"
            placeholder="Username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button variant="" type="submit" onClick={handleSignUpButtonClick}>
            Sign Up
          </Button>
          <p className=" pl-2">Already have an account</p>{" "}
          <Button variant="" type="submit" onClick={handleSignInButtonClick}>
            Sign In
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
