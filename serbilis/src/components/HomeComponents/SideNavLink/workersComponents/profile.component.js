import React, { useContext, useEffect, useState } from "react";
import ResultComponent from "./result.component";
import { ProfileView } from "../../../ViewProfile";
import { CommentRefresher, Refresher } from "../../CommentRefresher/";
import FeedPost from "../newsfeedComponents/FeedComponent/feedPost.component";
const ProfileComponent = () => {
  const [viewProfile] = useContext(ProfileView);
  const [userPosts, setUserPosts] = useState();

  useEffect(() => {
    const getPosts = async () => {
      if (viewProfile.profileInfo.username !== undefined)
        await fetch("/getUserPosts/profilePosts", {
          mode: "cors",
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: viewProfile.profileInfo.username }),
        })
          .then((result) => result.json())
          .then((data) => {
            setUserPosts(data);
          })
          .catch((err) => console.log(err));
    };
    getPosts();
  }, [viewProfile.profileInfo.username]);
  return (
    <div className="profile-tab">
      <ResultComponent
        user={viewProfile.profileInfo}
        functionClass={"result-profile"}
      />
      <Refresher>
        {userPosts &&
          userPosts.map((post, id) => <FeedPost post={post} key={id} />)}
      </Refresher>
    </div>
  );
};

export default ProfileComponent;
