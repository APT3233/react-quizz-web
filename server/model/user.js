import { query } from "express";
import apt from "../connector/main.js";

const list = (callbackFn) => apt.query("SELECT * FROM user").then(callbackFn);

const authUser = (username, password, callbackFn) => {
  username = String(username);
  password = String(password);
  if (username.length > 50) return undefined;

  const query =
    "SELECT id, token FROM user WHERE username = ? AND password = ?";

  apt
    .query(query, [username, password])
    .then(function (queryRs) {
      var results = queryRs[0];
      console.log(results);
      callbackFn(results ? results : undefined);
    })
    .catch((err) => {
      callbackFn(undefined);
    });
};
const regUser = (data, callbackFn) => {
  const email = String(data.email);
  const username = String(data.username);
  const password = String(data.password);

  apt
    .query("INSERT INTO `user` (email, username, password) VALUES (?, ?, ?)", [email, username, password])
    .then((result) => {
      callbackFn({ success: true, message: "User registered successfully!", userId: result.insertId });
    })
    .catch((err) => {
      console.error("Error in regUser:", err);
      callbackFn({ success: false, message: "Failed to register user", error: err });
    });
};


export default {
  list,
  authUser,
  regUser
};
