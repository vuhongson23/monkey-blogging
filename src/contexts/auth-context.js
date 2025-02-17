import { auth, db } from "components/firebase/firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { collection, onSnapshot, query, where } from "firebase/firestore";

const { createContext, useContext, useState, useEffect } = require("react");

const AuthContext = createContext();
function AuthProvider(props) {
  const [userInfo, setUserInfo] = useState({});
  const value = { userInfo, setUserInfo };
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log("🚀 ~ onAuthStateChanged ~ user:", user);
      const docRef = query(
        collection(db, "users"),
        where("email", "==", user ? user.email : null)
      );
      onSnapshot(docRef, (snapshot) => {
        snapshot.forEach((doc) => {
          setUserInfo({
            user,
            ...doc.data(),
          });
        });
      });
      //setUserInfo(user);
    });
  }, []);
  return <AuthContext.Provider value={value} {...props}></AuthContext.Provider>;
}

function useAuth() {
  const context = useContext(AuthContext);
  if (typeof context === "undefined")
    throw new Error("useAuth must be used within AuthProvider");
  return context;
}

export { AuthProvider, useAuth };
