import React, { useState, createContext } from "react";
export const ProfileView = createContext();
export function ProfileViewer(props) {
  const [viewProfile, setViewProfile] = useState({
    showProfile: false,
    profileInfo: {},
  });
  return (
    <ProfileView.Provider value={[viewProfile, setViewProfile]}>
      {props.children}
    </ProfileView.Provider>
  );
}
