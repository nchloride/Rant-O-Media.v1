import React, { useContext, useEffect, useState } from "react";
import { ProfileView } from "../../../ViewProfile";
import { User } from "../../../UserAuth";

const isFollow = (following, username) => {
  if (following !== null) {
    console.log(following, username);
    let isFollowed = following.filter(
      (userFollowing) => userFollowing.username === username
    );
    console.log(isFollowed);
    console.log(isFollowed.length > 0 ? true : false);
    return isFollowed.length > 0 ? true : false;
  }
  return false;
};
export default function ResultComponent({ user, functionClass }) {
  const [viewProfile, setViewProfile] = useContext(ProfileView);
  const userInformation = useContext(User);
  const [followingList, setFollowingList] = useState(
    JSON.parse(userInformation.following)
  );
  const [following, setFollowing] = useState(
    isFollow(followingList, viewProfile.profileInfo.username)
  );
  const handleSetProfile = () => {
    const userProfile = {
      fullname: user.fullname,
      username: user.username,
      bio: user.bio,
    };
    setViewProfile({ showProfile: true, profileInfo: userProfile });
  };
  const onFollowUser = async () => {
    setFollowing(!following);
    setFollowingList([
      ...followingList,
      { fullname: user.fullnamme, username: user.username },
    ]);
    await fetch("/follow", {
      method: "post",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: sessionStorage.getItem("token"),
        usernameFollower: userInformation.username,
        fullnameFollower: userInformation.fullname,
        usernameFollowing: viewProfile.profileInfo.username,
        fullnameFollowing: viewProfile.profileInfo.fullname,
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    setFollowing(isFollow(followingList, viewProfile.profileInfo.username));
  }, [user]);
  useEffect(() => {
    return () => setViewProfile({ showProfile: false, profileInfo: {} });
  }, []);
  return (
    <div className={functionClass}>
      <div>
        <h1>{user.fullname}</h1>
        <h2>@{user.username}</h2>
        <p>{user.bio}</p>
        {/* <p>{following ? "Following" : "Follow"}</p> */}
      </div>
      {functionClass === "result-profile" ? (
        <button onClick={onFollowUser}>
          {following ? "Following" : "Follow"}
        </button>
      ) : (
        <button onClick={handleSetProfile}>View Profile</button>
      )}
    </div>
  );
}
