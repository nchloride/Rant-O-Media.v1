const bcrypt = require("bcryptjs");
const connecton = require("../database");
const LocalStrategy = require("passport-local").Strategy;

module.exports = function (passport) {
  passport.use(
    new LocalStrategy((username, password, done) =>
      connecton.getConnection((error, tempCon) => {
        if (error) {
          tempCon.release();
          console.log(error);
        } else {
          // console.log(username);

          tempCon.query(
            `SELECT * FROM userlogin where username ='${username}'`,
            (err, rows, field) => {
              if (err) console.log(err);
              if (rows[0] === undefined) {
                return done(err, false);
              } else if (rows[0] != null) {
                bcrypt.compare(password, rows[0].password, (err, result) => {
                  if (err) console.log(err);
                  if (result === true) {
                    return done(null, rows[0]);
                  } else {
                    return done(null, false);
                  }
                });
              }
            }
          );
        }
      })
    )
  );
  passport.serializeUser((userss, done) => done(null, userss));
  passport.deserializeUser((user, done) =>
    connecton.query(
      `select * from userlogin where username ='${user.username}'`,
      (err, username) => done(err, username)
    )
  );
};
