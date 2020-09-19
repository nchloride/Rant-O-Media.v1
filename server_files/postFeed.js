const express = require("express");
const app = express.Router();
const connection = require("./database");
const jwt = require("jsonwebtoken");
const jwtVerifier = (req, res, next) => {
  if (req.body.username) {
    jwt.verify(req.body.token, "appSecretKey", (err, auth) => {
      if (err) {
        res.send({ message: "FAILED" });
      } else {
        next();
      }
    });
  } else {
    res.send({ message: "tangina" });
  }
};

app.post("/addPost", jwtVerifier, (req, res) => {
  jwt.verify(req.body.token, "appSecretKey", (err, auth) => {
    if (err) {
      res.send({ message: "token not found" });
    } else {
      const { message, type, date, username } = req.body;
      const addQry = `INSERT into newsfeedpost (postMessage,postType,postDate,postUsername) values ('${message}','${type}',CURDATE(),'${username}')`;
      connection.query(addQry, (err, results) => {
        if (err) {
          res.send(err);
        } else {
          res.send({ message: "DATA inserted successfully", auth });
        }
      });
    }
  });
});

app.post("/getComment", (req, res) => {
  const selectComment = ` select * from postcomment where postID = ${req.body.postID}`;
  connection.getConnection((err, tempCon) => {
    if (err) {
      tempCon.release();
      res.send(err);
    } else {
      tempCon.query(selectComment, (error, results, field) => {
        if (error) {
          res.send(error);
        } else {
          res.send(results);
        }
      });
      tempCon.release();
    }
  });
});

app.post("/insertComment", (req, res) => {
  const { username, postid, comment, commentUsernameID } = req.body;
  const insertQuery = `insert into postcomment (postID,username,comment,commentUsernameID) values('${postid}','${username}','${comment}','${commentUsernameID}')`;
  connection.getConnection((err, tempCon) => {
    if (err) {
      tempCon.release();
      res.send(err);
    } else {
      tempCon.query(insertQuery, (error, results, field) => {
        tempCon.release();
        if (error) {
          res.send(error);
        } else {
          res.send({ message: "data inserted successfully" });
        }
      });
    }
  });
});
app.post("/deleteComment", (req, res) => {
  const { commentID } = req.body;
  const deleteCommentQuery = `delete from postcomment where commentID = '${commentID}' `;

  connection.getConnection((err, tempCon) => {
    if (err) {
      res.send(err);
      tempCon.release();
    } else {
      tempCon.query(deleteCommentQuery, (error, result) => {
        if (error) res.send(error);
        else {
          res.send({ message: "comment deleted" });
        }
      });
      tempCon.release();
    }
  });
});

app.get("/selectPosts", (req, res) => {
  const selectAll = `select newsfeedpost.*,userlogin.fullname from newsfeedpost,userlogin where newsfeedpost.postUsername = userlogin.username ORDER by postID DESC`;
  connection.query(selectAll, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json(results);
    }
  });
});

app.post("/likePost", (req, res) => {
  const { fullname, postID, username } = req.body;
  const updateLikes = (postLikes) => {
    const newLikes = JSON.stringify(postLikes);
    let ar = newLikes;
    const updateLikes = `update newsfeedpost set postLikes ='${ar}' where postID=${postID} `;
    connection.query(updateLikes, (err, results) => {
      if (err) res.send(err);
      else {
        res.send({ message: "you liked this post" });
      }
    });
  };
  const selectPost = `select postLikes from newsfeedpost where postID =${postID}`;
  connection.getConnection((err, tempCon) => {
    if (err) {
      tempCon.release();
      res.send(err);
    } else {
      tempCon.query(selectPost, (error, result, fields) => {
        if (error) res.send(error);
        else if (result) {
          let { postLikes } = result[0];
          if (postLikes === null) {
            postLikes = { fullname, username };
            updateLikes([postLikes]);
          } else {
            let newLikes = JSON.parse([postLikes]);
            let handler = newLikes.filter((val) => val.username === username);
            if (handler.length > 0) {
              newLikes = newLikes.filter((val) => val.username !== username);
              console.log("newLikes:", newLikes);
            } else {
              newLikes.push({ fullname, username });
              console.log("newLikes:", newLikes);
            }
            updateLikes(newLikes);
          }
        }
      });

      tempCon.release();
    }
  });
});

module.exports = app;
