import React, { useState } from "react";
import PostComponent from "../SideNavLink/newsfeedComponents/post.component";
import FeedComponent from "../SideNavLink/newsfeedComponents/feed.component";
import "../../../styles/newsfeed.css";

function NewsFeed() {
  const [refresh, enableRefresh] = useState(false);

  return (
    <div className="newsfeed-main">
      <PostComponent refresh={refresh} enableRefresh={enableRefresh} />
      <FeedComponent refresh={refresh} />
    </div>
  );
}

export default NewsFeed;
