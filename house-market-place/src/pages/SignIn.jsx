import React, { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
import visibilityIcon from "../assets/svg/visibilityIcon.svg";

function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: e.target.value 
    }));
};

const onSubmit = async (e) => {
    e.preventDefault();
    try {
        const auth = getAuth();
        const userCredentialPromise = signInWithEmailAndPassword(auth, email, password);
        toast.promise(
          userCredentialPromise,
          {
            pending: 'Signing in...',
            success: 'Signed in successfully!',
            error: 'Oops! Something went wrong. Please try again.',
          }
        );
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log(user, "user");
        if(user) {
            navigate("/profile");
        } else {
            navigate("/sign-in");
        }
    } catch (error) {
        console.log(error, "error");
        if (error.code === 'auth/email-already-in-use') {
          toast.error('The email address is already in use by another account.');
        }
    }
}
  console.log(formData, "formData");

  return (
    <>
      <div className="pageContainer">
        <header>
          <p className="pageHeader">Welcome Back</p>
        </header>

        <form onSubmit={onSubmit}>
          <input
            type="email"
            className="emailInput"
            placeholder="Email"
            id="email"
            value={email}
            onChange={onChange}
          />
          <div className="passwordInputDiv">
            <input
              type={showPassword ? "text" : "password"}
              className="passwordInput"
              placeholder="Password"
              id="password"
              value={password}
              onChange={onChange}
            />
            <img
              src={visibilityIcon}
              alt="visibilityIcon"
              className="showPassword"
              onClick={() => setShowPassword(!showPassword)}
            />
            <Link to='/forgot-password' className="forgotPasswordLink">
                Forgot Password
            </Link>
            <div className="signInBar">
                <p className="signInText">
                    Sign In
                </p>
                <button className="signInButton">
                    <ArrowRightIcon fill="#fff" width="34px" height="34px" />
                </button>
            </div>
          </div>
        </form>

        {/* Google OAuth */}
        <Link to="/sign-up" className="registerLink">
            Sign up Instead
        </Link>
      </div>
    </>
  );
}

export default SignIn;
