import React from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase.config";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Profile() {
  const navigate = useNavigate();
  const auth = getAuth();
  const [changeDetails, setChangeDetails] = useState(false);
  const [formData, setFormDta] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });

  const onLogOut = () => {
    auth.signOut();
    navigate("/");
  };

  const onSubmit = async () => {
    // updateProfile(auth.currentUser, {
    //   displayName: formDta.name,
    // });
    // updateDoc(db, "users", auth.currentUser.uid, {
    //   name: formDta.name,
    //   email: formDta.email,
    // });

    try {
      if(auth.currentUser.displayName !== formData.name) {
        const updateProfilePromise =  updateProfile(auth.currentUser, {
          displayName: formData.name,
        });

        toast.promise(
          updateProfilePromise,
          {
            pending: 'Updating profile...',
            success: 'Profile updated successfully!',
            error: 'Oops! Something went wrong. Please try again.',
          }
        );

        await updateProfilePromise;
      
        const userRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(userRef, {
          name: formData.name,
        });
      
      }

    } catch (error) {
      // toast.error("Oops! Something went wrong. Please try again.");
      console.log(error.message)
    }

    console.log("Profile updated successfully");
  };

  const onChangeDetails = () => {
    if (changeDetails && typeof onSubmit === "function") {
      onSubmit();
    }
    setChangeDetails((prevChangeDetails) => !prevChangeDetails);
  };

  const onChange = (e) => {
    setFormDta((prevFormDta) => ({
      ...prevFormDta,
      [e.target.id]: e.target.value,
    }));
  }

  return (
    <>
      <div className="profile">
        <header className="profileHeader">
          <p className="pageHeader">My Profile</p>
          <button type="button" className="logOut" onClick={onLogOut}>
            Logout
          </button>
        </header>

        <main>
          <div className="profileDetailsHeader">
            <p className="profileDetailsText">Personal Details</p>
            <p className="changePersonalDetails" onClick={onChangeDetails}>
              {changeDetails ? "Save" : "Change"}
            </p>
          </div>
          <div className="profileCard">
            <form>
              <input
                type="text"
                id="name"
                className={!changeDetails ? "profileName" : "profileNameActive"}
                disabled={!changeDetails}
                value={formData.name}
                onChange={onChange}
              />
              <input
                type="text"
                id="email"
                className={!changeDetails ? "profileEmail" : "profileEmailActive"}
                disabled={!changeDetails}
                value={formData.email}
                onChange={onChange}
              />
            </form>
          </div>
        </main>
      </div>
    </>
  );
}

export default Profile;
