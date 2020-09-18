const express = require("express");
const app = express.Router();
const connection = require("./database");

app.post("/profilePosts", (req, res) => {
  const username = req.body.username;
  console.log(username);
  const profilePosts = `select newsfeedpost.*,userlogin.fullname from newsfeedpost,userlogin where postUsername = '${username}' AND newsfeedpost.postUsername = userlogin.username ORDER by postDate desc `;
  connection.getConnection((err, tempCon) => {
    if (err) {
      tempCon.release();
      res.send(err);
    } else {
      tempCon.query(profilePosts, (error, results, field) => {
        if (err) res.send(error);
        else {
          res.send(results);
        }
      });
      tempCon.release();
    }
  });
});

module.exports = app;
