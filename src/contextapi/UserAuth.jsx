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
  const [loadingAuth, setLoadingAuth] = useState(true); // ✅ Track auth loading
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true); // ✅ For group loading

  const navigate = useNavigate();

  // ✅ Delete group function
  const deleteGroup = async (groupId) => {
    try {
      const response = await fetch(`http://localhost:5000/groups/${groupId}`, {
        // ✅ Fix API URL
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json(); // ✅ Parse error message
        throw new Error(errorData.error || "Failed to delete group");
      }

      setGroups((prevGroups) =>
        prevGroups.filter((group) => group._id !== groupId)
      );
    } catch (error) {
      console.error("❌ Error deleting group:", error.message);
    }
  };

  // ✅ Check auth state on app load
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        await currentUser.reload();
        setUser({
          uid: currentUser.uid,
          name: currentUser.displayName || "",
          email: currentUser.email,
        });
        setLoggedIn(true);
      } else {
        setUser(null);
        setLoggedIn(false);
        setGroups([]); // ✅ Ensure groups are cleared on logout
      }
      setLoadingAuth(false); // ✅ Stop auth loading
    });

    return () => unsubscribe();
  }, []);

  // ✅ Signup function with improved error handling
  const signup = async (name, email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(userCredential.user, { displayName: name });
      await userCredential.user.reload();

      setUser({
        uid: userCredential.user.uid,
        name,
        email: userCredential.user.email,
      });

      setLoggedIn(true);
      return userCredential.user;
    } catch (error) {
      console.error("Signup error:", error);
      throw error;
    }
  };

  // ✅ Login function
  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      await user.reload();

      let name = user.displayName;
      if (!name) {
        name = email.split("@")[0];
        await updateProfile(user, { displayName: name });
        await user.reload();
      }

      setUser({ uid: user.uid, name, email: user.email });
      setLoggedIn(true);
      return user;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  // ✅ Logout function
  const logout = async () => {
    setGroups([]); // ✅ Clear groups immediately before logging out
    await signOut(auth);
    setUser(null);
    setLoggedIn(false);
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loggedIn,
        signup,
        login,
        logout,
        groups,
        setGroups,
        loading,
        setLoading,
        deleteGroup,
        loadingAuth, // ✅ Expose loading state
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
