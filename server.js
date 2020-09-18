console.log("server is up");
const express = require("express");
const http = require("http");
const userRegister = require("./server_files/register");
const bodyParser = require("body-parser");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const posting = require("./server_files/postFeed");
const connection = require("./server_files/database");
const userFollow = require("./server_files/userFollow");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const morgan = require("morgan");
const profileInfo = require("./server_files/profileInfo");
const { authenticate } = require("passport");
const app = express();
const server = http.createServer(app);
const socketio = require("socket.io");
const io = socketio(server);
const JWT_SECRET_KEY = "appSecretKey";
app.use(morgan("common"));
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(
  session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cookieParser("secretcode"));

const port = 5000;
app.use("/getUserPosts", profileInfo);
app.use("/postFeed", posting);
app.use("/register", userRegister);
app.use("/follow", userFollow);
app.use(passport.initialize());
app.use(passport.session());
require("./server_files/passportConfig")(passport);
app.post("/userlogin", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) console.log(err);
    if (!user) res.send({ loggedIn: false });
    else {
      req.login(user, (err) => {
        if (err) console.log(err);

        // console.log(req.user);
        jwt.sign({ user: req.body }, JWT_SECRET_KEY, (error, token) => {
          res.send({ loggedIn: true, token: token });
        });
      });
    }
  })(req, res, next);
});
app.get("/islogin", (req, res) => {
  if (req.user != null || req.user != undefined) res.send({ data: req.user });
  else {
    res.send({ data: "No User Found" });
  }
});

app.get("/logout", (req, res) => {
  req.logOut();
  res.redirect("/");
});
app.post("/selectUser", (req, res) => {
  const { fullname, token } = req.body;
  console.log("this is te body", req.body);
  jwt.verify(token, JWT_SECRET_KEY, (error, auth) => {
    if (error) res.send(error);
    else {
      connection.query(
        `select fullname,bio,username from userlogin where fullname LIKE '%${fullname}%'`,
        (err, results) => {
          if (err) {
            res.send(err);
          } else {
            res.send({
              results: results,
              message: `${results.length} USERS FOUND`,
            });
            console.log(results);
          }
        }
      );
    }
  });
});
app.listen(port, () => console.log(`SERVER STARTED ON PORT ${port}`));
