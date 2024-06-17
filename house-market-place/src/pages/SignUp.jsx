import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore"; 
import { db } from "../firebase.config.js";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
import visibilityIcon from "../assets/svg/visibilityIcon.svg";
import OAuth from "../components/OAuth.jsx";

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = formData;

  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      const userCredentialPromise = createUserWithEmailAndPassword(auth, email, password);
      toast.promise(
        userCredentialPromise,
        {
          pending: 'Signing up...',
          success: 'Signed up successfully!',
          error: 'Oops! Something went wrong. Please try again.',
          }
          );
          const userCredential = await userCredentialPromise
          const user = userCredential.user;
      await updateProfile(user, {
        displayName: name,
      });
    //   await db.collection("users").doc(user.uid).set({
    //     name: name,
    //     email: email,
    //   });

      const formDataCopy = { ...formData };
    //   delete formDataCopy.password;
      formDataCopy.timestamp = serverTimestamp();

      await setDoc(doc(db, "users", user.uid), formDataCopy)
      navigate("/sign-in");
    } catch (error) {
      console.error(error, 'sign up error');
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(`Error code: ${errorCode}, Error message: ${errorMessage}`);
      if (errorCode === 'auth/email-already-in-use') {
        toast.error('The email address is already in use by another account.');
      }
    }
  };

  console.log(formData, "formData");

  return (
    <>
      <div className="pageContainer">
        <header>
          <p className="pageHeader">Welcome Back</p>
        </header>

        <form onSubmit={onSubmit}>
          <input
            type="name"
            className="nameInput"
            placeholder="Name"
            id="name"
            value={name}
            onChange={onChange}
          />
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
            <Link to="/forgot-password" className="forgotPasswordLink">
              Forgot Password
            </Link>
            <div className="signUpBar">
              <p className="signUpText">Sign Up</p>
              <button className="signUpButton">
                <ArrowRightIcon fill="#fff" width="34px" height="34px" />
              </button>
            </div>
          </div>
        </form>

        <OAuth />
        <Link to="/sign-in" className="registerLink">
          Sign In Instead
        </Link>
      </div>
    </>
  );
}

export default SignUp;
