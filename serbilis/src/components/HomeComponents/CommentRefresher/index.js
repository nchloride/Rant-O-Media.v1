import React, { useState, createContext } from "react";
export const CommentRefresher = createContext();
export const Refresher = (props) => {
  const [refresh, setRefresh] = useState(false);
  return (
    <CommentRefresher.Provider value={[refresh, setRefresh]}>
      {props.children}
    </CommentRefresher.Provider>
  );
};
