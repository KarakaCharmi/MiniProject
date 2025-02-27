import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../firebase";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [groups, setGroups] = useState([]);
  // Check auth state on app load
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        await currentUser.reload(); // Ensure latest data is fetched
        setUser({
          uid: currentUser.uid,
          name: currentUser.displayName || "", // Ensure name is set
          email: currentUser.email,
        });
        setLoggedIn(true); // ✅ Mark as logged in
      } else {
        setUser(null);
        setLoggedIn(false); // ✅ Mark as logged out
      }
    });

    return () => unsubscribe();
  }, []);

  // Signup function (includes updating display name)
  const signup = async (name, email, password) => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    // Ensure displayName is set
    await updateProfile(userCredential.user, { displayName: name });

    // Reload user to ensure the update is applied
    await userCredential.user.reload();

    // Set user state
    setUser({
      uid: userCredential.user.uid,
      name: userCredential.user.displayName, // Fetch updated name
      email: userCredential.user.email,
    });

    setLoggedIn(true); // ✅ Mark as logged in

    return userCredential.user;
  };

  // Login function
  const login = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Reload user to get updated data
    await user.reload();

    // If displayName is missing, set a default name
    if (!user.displayName) {
      const nameFromEmail = email.split("@")[0]; // Extract name from email
      await updateProfile(user, { displayName: nameFromEmail });
      await user.reload(); // Reload to apply changes
    }

    // Update user state
    setUser({
      uid: user.uid,
      name: user.displayName || nameFromEmail,
      email: user.email,
    });

    setLoggedIn(true); // ✅ Mark as logged in

    return user;
  };

  // Logout function
  const logout = async () => {
    await signOut(auth);
    setUser(null);
    setLoggedIn(false);
    navigate("/"); // ✅ Mark as logged out
  };

  return (
    <AuthContext.Provider
      value={{ user, loggedIn, signup, login, logout, groups, setGroups }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
