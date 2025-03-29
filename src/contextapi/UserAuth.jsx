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
import axios from "axios"; // ✅ Import axios
import chroma from "chroma-js";
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loadingAuth, setLoadingAuth] = useState(true); // ✅ Track auth loading
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true); // ✅ For group loading
  const [changed, setChanged] = useState(false);
  const navigate = useNavigate();
  const getRandomLightColor = () => {
    const hue = Math.floor(Math.random() * 360);
    return `hsl(${hue}, 79%, 82%)`;
  };
  const getRandomDarkColor = () => {
    const hue = Math.floor(Math.random() * 360); // Random hue between 0-360
    return `hsl(${hue}, 80%, 25%)`;
  };

  // const colors = generateRandomColors(5); // Generate 5 colors
  // console.log(colors); // Example output: ["#e74c3c", "#3498db", "#2ecc71", "#f39c12", "#9b59b6"]

  // ✅ Fetch Groups Function
  const fetchGroups = async () => {
    if (!user || !user.email) return; // Ensure user exists

    try {
      setLoading(true); // ✅ Start loading
      console.log(`📡 Fetching groups for: ${user.email}`);

      const res = await axios.get("http://localhost:5000/groups", {
        params: { email: user.email },
      });

      console.log("📤 Received groups:", res.data);

      if (Array.isArray(res.data)) {
        setGroups(res.data);
      } else {
        console.warn("⚠️ API response is not an array. Ignoring update.");
      }
    } catch (error) {
      console.error("❌ Error fetching groups:", error);
      setGroups([]); // Ensure no stale data remains
    } finally {
      setLoading(false); // ✅ Stop loading
    }
  };

  // ✅ Ensure fetchGroups runs only when `user.email` changes
  useEffect(() => {
    if (user && user.email) {
      fetchGroups();
    }
  }, [user]);

  // ✅ Delete group function
  const deleteGroup = async (groupId) => {
    try {
      const response = await fetch(`http://localhost:5000/groups/${groupId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
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

  // ✅ Signup function
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
      fetchGroups(); // ✅ Fetch groups after signup
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
      fetchGroups(); // ✅ Fetch groups after login
      return user;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  // ✅ Logout function
  const logout = async () => {
    setGroups([]); // ✅ Clear groups before logging out
    await signOut(auth);
    setUser(null);
    setLoggedIn(false);
    navigate("/");
  };

  function updateGroupMembers(groupId, updatedMembers, updatedEmails) {
    setGroups((prevGroups) =>
      prevGroups.map((group) =>
        group._id === groupId
          ? { ...group, members: updatedMembers, emails: updatedEmails }
          : group
      )
    );
  }

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
        loadingAuth,
        updateGroupMembers,
        fetchGroups,
        getRandomLightColor,
        getRandomDarkColor, // ✅ Expose fetchGroups
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
