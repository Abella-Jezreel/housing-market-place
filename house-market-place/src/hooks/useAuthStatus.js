import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const useAuthStatus = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, [auth]);

  return { isLoggedIn, loading };
};
