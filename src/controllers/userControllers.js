import { User } from "../models/userModel";
import jwt from "jsonwebtoken";
const crypto = require("crypto");

export const loginRequired = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    return res.status(401).json({ message: "Unauthorization User" });
  }
};

export const register = (req, res) => {
  const newUser = new User(req.body);

  var salt = crypto.randomBytes(16).toString("hex");
  console.log("salt -> " + salt);
  console.log("Password -> " + req.body.hashPassword);

  var hash = crypto
    .createHmac("sha256", salt)
    .update(req.body.hashPassword)
    .digest("hex");

  console.log("hash ->" + hash);
  newUser.hashPassword = salt + "$" + hash;
  //newUser.hashPassword = bcrypt.hashSync(req.body.hashPassword, 10);
  User.findOne(
    {
      email: req.body.email,
    },
    (err, user) => {
      if (err) throw err;
      if (user) {
        res
          .status(400)
          .json({ message: "Can't make account. Email already on system" });
      } else if (!user) {
        newUser.save((err, user) => {
          if (err) {
            return res.status(400).send({ message: err });
          } else {
            user.hashPassword = undefined;
            return res
              .status(200)
              .json({ message: "Account successfull created" });
          }
        });
      }
    }
  );
};

export const login = (req, res) => {
  User.findOne(
    {
      email: req.body.email,
    },
    (err, user) => {
      if (err) throw err;
      if (!user) {
        return res
          .status(401)
          .json({ message: "Authentication failed. No user found!" });
      } else if (user) {
        var passwordField = user.hashPassword.split("$");
        var salt = passwordField[0];
        var hash = crypto
          .createHmac("sha256", salt)
          .update(req.body.hashPassword)
          .digest("hex");
        if (!(hash === passwordField[1])) {
          return res
            .status(401)
            .json({ message: "Authentication failed. Wrong password!" });
        } else {
          //jwt
          return res.status(200).json({
            token: jwt.sign({ email: user.email, _id: user.id }, "RESTFULLAPI"),
          });
        }
      }
    }
  );
};

