import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
export const UserDataContext = createContext();

function UserContext({ children }) {
  const [user, setUser] = useState(null)
  const [loading,setLoading]=useState(true)

   useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false); // No token, stop loading
      return;
    }

    // Try fetching user info
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/api/users/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
     
        setUser(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("❌ Token invalid or expired", err.message);
        localStorage.removeItem("token");
        setUser(null);
        setLoading(false);
      });
  }, []);
  

  return (
    <UserDataContext.Provider value={{ user, setUser,loading }}>
      {children}
    </UserDataContext.Provider>
  );
}

export default UserContext;
