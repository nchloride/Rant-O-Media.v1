const connection = require("./database");
const express = require("express");
const app = express.Router();
const bcrypt = require("bcryptjs");
app.post("/", async (req, res) => {
  const { username, password, fullname, address, clientType, bio } = req.body;
  const hashPassword = await bcrypt.hash(password, 10);
  const queryValidation = `select username from userlogin where username='${username}'`;
  connection.getConnection((error, tempCon) => {
    if (error) {
      tempCon.release();
      console.log(error);
    } else {
      console.log("Connected");
      tempCon.query(queryValidation, (err, rows, field) => {
        tempCon.release();
        if (err) {
          return res.send("ERROR on QUERY");
        } else {
          if (rows[0] != null) {
            return res.send({ message: "username already taken" });
          } else {
            connection.query(
              `insert into userlogin(username,password,fullname,address,clienttype,bio) values ('${username}','${hashPassword}','${fullname}','${address}','${clientType}','${bio}')`,
              (err, results) => {
                if (err) {
                  return res.send({ message: "data insertion failed" });
                } else {
                  return res.send({ message: "user succesfully created" });
                }
              }
            );
          }
        }
      });
    }
  });
});
module.exports = app;
