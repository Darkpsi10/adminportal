import {
  deleteUser,
  getUser,
  getUsers,
  loginUser,
  registerUser,
  updateUser,
} from "./userControllers";
import { upload } from "./userMiddlewares";
import bodyParser from "body-parser";
import express from "express";

export const user_route = express.Router();
user_route.use(bodyParser.urlencoded({ extended: true }));
user_route.use(bodyParser.json());
user_route.use(express.static("public"));
user_route.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
  next();
});

user_route.post(
  "/register",
  upload.single("image"),
  async function (req, res, next) {
    registerUser(req, res, next);
  }
);

user_route.get("/user/:id", async function (req, res, next) {
  getUser(req, res, next);
});

user_route.get("/allusers", async function (req, res, next) {
  getUsers(req, res, next);
});

user_route.delete("/delete/:id", async function (req, res, next) {
  deleteUser(req, res, next);
});

user_route.put(
  "/update/:id",
  upload.single("image"),
  async function (req, res, next) {
    updateUser(req, res, next);
  }
);

user_route.post("/login", async function (req, res, next) {
  loginUser(req, res, next);
});

module.exports = { user_route };
