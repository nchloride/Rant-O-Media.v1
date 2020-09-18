import React, { useState, useEffect, createContext } from "react";
export const User = createContext();
export const UserAuth = (props) => {
  const [userInformation, setUserInfo] = useState();

  useEffect(() => {
    const getUser = async () => {
      const user = await fetch("/islogin");
      const data = await user.json();
      setUserInfo(data.data[0]);
    };
    getUser();
  }, []);
  return (
    <User.Provider value={userInformation}>{props.children}</User.Provider>
  );
};
