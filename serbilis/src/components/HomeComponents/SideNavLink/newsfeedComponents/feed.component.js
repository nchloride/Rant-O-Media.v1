import React, { useState, useEffect, useContext } from "react";

import FeedPost from "./FeedComponent/feedPost.component";
import { CommentRefresher, Refresher } from "../../CommentRefresher/";
import { User } from "../../../UserAuth";

import LoadingScreen from "../../../LoadingScreen";
const followingListPost = async (list, set, loading) => {
  if (list !== null) {
    loading(true);
    list.map(
      async (following) =>
        await fetch("/getUserPosts/profilePosts", {
          mode: "cors",
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: following.username,
          }),
        })
          .then((result) => result.json())
          .then((data) => {
            set((prevData) => [
              ...prevData,
              ...data.map((singleData) => singleData),
            ]);
            loading(false);
          })
          .catch((err) => console.log(err))
    );
  }
};
const FeedComponent = (props) => {
  const [posts, setPosts] = useState();
  const [loading, setLoading] = useState();
  const userInformation = useContext(User);
  const [followingList, setFollowingList] = useState([]);
  const fetchAllPost = async () => {
    setLoading(true);
    await fetch("/postFeed/selectPosts")
      .then((data) => data.json())
      .then((result) => {
        setPosts(result);
        setLoading(false);
        console.log(result);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    if (typeof userInformation !== "undefined") {
      console.log(userInformation);
      followingListPost(
        JSON.parse(userInformation.following),
        setFollowingList,
        setLoading
      );
    }
  }, [userInformation, props.refresh]);

  // useEffect(() => {
  //   fetchAllPost();
  // }, [props.refresh]);
  return (
    <Refresher>
      {/* {loading && <Loader></Loader>} */}
      <div className="feed">
        {loading ? (
          <LoadingScreen />
        ) : (
          followingList &&
          followingList.map((post, id) => <FeedPost post={post} key={id} />)
          // followingList
          //   .sort(
          //     (date1, date2) =>
          //       new Date(date2.postDate) - new Date(date1.postDate)
          //   )
          //   .map((post, id) => <FeedPost post={post} key={id} />)
        )}
      </div>
    </Refresher>
  );
};

export default FeedComponent;
