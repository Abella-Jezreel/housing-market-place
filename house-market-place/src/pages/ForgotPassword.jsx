import React, { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  
  const onChange = (e) => {
    setEmail(e.target.value);
    };
    
    const onSubmit = async (e) => {
      e.preventDefault();
      try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset email sent successfully!");
    } catch (error) {
      toast.error("Oops! Something went wrong. Please try again.");
    }
  }

  return (
    <div className="pageContainer">
      <header>
        <p className="pageHeader">
          Forgot Password
        </p>
      </header>

      <main>
        <form onSubmit={onSubmit}>
          <input type="email" className="emailInput" placeholder="Email" id="email" value={email} onChange={onChange}/>


        <Link to="/sign-in" className="forgotPasswordLink">
          Sign In
        </Link>

        <div className="signInBar">
          <div className="signInText">
            Send Reset Link
          </div>
          <button className="signInButton">
            <ArrowRightIcon fill="#fff" width='34px' height='34px'/>
          </button>
        </div>
        </form>
      </main>
    </div>
  );
}

export default ForgotPassword;
