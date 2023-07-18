/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import useAxiosSecure from "../hooks/useAxiosSecure";

export const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {
  //* hooks
  const [user, setUser] = useState(null);

  //* variables

  //* functions

  const logOut = () => {};

  const authInfo = {
    user,
    setUser,
    logOut,
  };

  useEffect(() => {
    if (user) {
      axios
        .post("http://localhost:5000/jwt", {
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
    }
  }, [user]);
  return (
    <>
      <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    </>
  );
};

export default AuthProvider;
