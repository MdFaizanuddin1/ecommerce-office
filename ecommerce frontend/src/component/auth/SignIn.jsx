import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { login } from "@/redux/userSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch()

  const handleSignUpButtonClick = () => {
    // console.log('button clicked');
    // Navigate to a new route
    navigate("/sign-up");
  };
  function onSubmit(e) {

    
    e.preventDefault();
    console.log('login', email,password);
    let userCredentials = {
      email,
      password,
    };
    
    dispatch (login(userCredentials)).then ((action)=>{
      localStorage.setItem ('accessToken', action.payload.data.token)
    })


    navigate("/");
  }
  return (
    <div className="flex items-center justify-center mt-20">
      <div className="flex flex-col w-full max-w-sm items-center space-y-2">
        <form
          className="flex flex-col w-full max-w-sm items-start space-y-2 gap-1"
          onSubmit={onSubmit}
        >
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
          <Button variant="" type="submit">
            Sign In
          </Button>

          <Button variant="" type="submit" onClick={handleSignUpButtonClick}>
            Sign Up
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
