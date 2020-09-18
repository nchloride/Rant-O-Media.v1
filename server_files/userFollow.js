const express = require("express").Router();
const app = express;
const connection = require("./database");
const tokenChecker = (req, res, next) => {
  const { token } = req.body.token;
  if (token !== null || token !== undefined) {
    next();
  } else {
    res.send({ message: "token not found" });
  }
};

app.post("/", tokenChecker, (req, res) => {
  const {
    usernameFollower,
    fullnameFollower,
    usernameFollowing,
    fullnameFollowing,
  } = req.body;
  const multipleQuery = `select following from userlogin where username = ?;select followers from userlogin where username = ?;`;

  const updateFollows = (dbQuery, message, column) => {
    connection.query(dbQuery, (error, result, field) => {
      if (error) res.send(error);
      else {
        if (column !== "followers") res.send({ message });
      }
    });
  };
  const handleFollows = (arr, username, fullname, dataOwner, column) => {
    let USER_ACTION;
    if (arr === null) {
      arr = [{ fullname, username }];
      USER_ACTION = `YOU FOLLOWED ${fullname}`;
    } else {
      arr = JSON.parse([arr]);
      let isFollowed = arr.filter((follow) => follow.username === username);
      if (isFollowed.length > 0) {
        arr = arr.filter((follow) => follow.username !== username);
        USER_ACTION = `YOU UNFOLLOW ${fullname}`;
        console.log("stupiiid");
      } else {
        arr = [...arr, { fullname, username }];
        USER_ACTION = `YOU FOLLOWED ${fullname}`;
      }
    }

    arr = JSON.stringify(arr);
    //Update JSON
    updateFollows(
      `update userlogin set ${column} = '${arr}' where username='${dataOwner}'`,
      USER_ACTION,
      column
    );
  };
  connection.getConnection((err, tempCon) => {
    if (err) {
      tempCon.release();
      res.send(err);
    } else {
      tempCon.query(
        multipleQuery,
        [usernameFollower, usernameFollowing],
        (error, result, field) => {
          if (error) res.send(error);
          else {
            let { following } = result[0][0];
            let { followers } = result[1][0];
            handleFollows(
              following,
              usernameFollowing,
              fullnameFollowing,
              usernameFollower,
              "following"
            );
            handleFollows(
              followers,
              usernameFollower,
              fullnameFollower,
              usernameFollowing,
              "followers"
            );
          }
        }
      );
      tempCon.release();
    }
  });
});

module.exports = app;
