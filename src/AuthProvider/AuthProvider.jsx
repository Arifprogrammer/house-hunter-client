/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {
  //* hooks
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  //* functions

  const logOut = () => {
    const deleteUser = async () => {
      const res = await axios.delete(
        "https://house-hunter-server-sage.vercel.app/signedinusers",
        {
          email: user.email,
        }
      );
      if (res.data.deletedCount > 0) {
        setUser(null);
      }
    };
    deleteUser();
  };

  const authInfo = {
    user,
    setUser,
    logOut,
  };

  useEffect(() => {
    if (user) {
      axios
        .post("https://house-hunter-server-sage.vercel.app/jwt", {
          email: user.email,
        })
        .then((data) => {
          localStorage.setItem("user_access_token", data.data.token);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      localStorage.removeItem("user_access_token");
      localStorage.removeItem("user");
    }
  }, [user]);

  return (
    <>
      <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    </>
  );
};

export default AuthProvider;
