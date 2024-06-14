import React from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { updateDoc } from "firebase/firestore";
import { db } from "../firebase.config";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  const auth = getAuth();
  const [formDta, setFormDta] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });

  const onLogOut = () => {  
    auth.signOut();
    navigate("/");
  }

  return (
    <>
      <div className="profile">
        <header className="profileHeader">
          <p className="pageHeader">
            My Profile
          </p>
          <button type="button" className="logOut" onClick={onLogOut}>Logout</button>
        </header>
      </div>
    </>
  );
}

export default Profile;
