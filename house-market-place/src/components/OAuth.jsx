import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase.config';
import { toast } from 'react-toastify';
import googleIcon from '../assets/svg/googleIcon.svg';

const OAuth = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const onClick = async () => {
        try {
            const auth = getAuth();
            const provider = new GoogleAuthProvider();
            const userCredential = await signInWithPopup(auth, provider);
            const user = userCredential.user;
            console.log(user, "user");

            const userRef = doc(db, "users", user.uid);
            const userDoc = await getDoc(userRef);
            if(!userDoc.exists()) {
                await setDoc(userRef, {
                    name: user.displayName,
                    email: user.email,
                    timestamp: serverTimestamp(),
                });
            }
            navigate("/");
        } catch (error) {
            console.log(error, "error");
            toast.error("Oops! Something went wrong. Please try again.");
        }
    }

  return (
    <div className='socialLogin'>
        <p>Sign {location.pathname === '/sign-up' ? 'up' : 'in'} with</p>
        <button className="socialIconDiv" onClick={onClick}>
            <img className='socialIconImg' src={googleIcon} alt="Google Icon"/>
        </button>
    </div>
  )
}

export default OAuth