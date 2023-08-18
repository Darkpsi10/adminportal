import { sequelize } from "../user/userModels";
import { jwtConfig } from "../config/config";
import { RequestHandler } from "express";
import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcrypt";
import path from "path";
// import fs from "fs";

const formatString = async (text: string) => {
  try {
    if (!text) return;
    const doubleslash = text.replace("/", "//");
    const filename = doubleslash.substring(7);
    return filename;
  } catch (Error: any) {
    console.error(Error);
  }
};

const securePassword = async (password: string) => {
  try {
    const passwordHash = await bcrypt.hash(password, 10);
    return passwordHash;
  } catch (Error: any) {
    console.error(Error);
  }
};

const generateToken = async (id: number) => {
  try {
    const token = jsonwebtoken.sign({ id: id }, jwtConfig.secretKey, {
      expiresIn: "2h",
    });
    return token;
  } catch (Error: any) {
    console.error(Error);
  }
};

export let registerUser: RequestHandler = async (req, res) => {
  try {
    const spassword = await securePassword(req.body.password);
    const email = await sequelize.models.User.findOne({
      where: { email: req.body.email },
    });
    const path = await formatString(req.file?.path!);
    const user = sequelize.models.User.build({
      username: req.body.username,
      password: spassword,
      email: req.body.email,
      image_name: req.file?.filename,
      image_path: path,
    });

    if (email === null) {
      await user.save();
      res.status(200).send({ success: true, data: user });
    } else {
      res.status(400).send({ success: false, message: "Email already in Use" });
      console.log("Failed");
    }
  } catch (Error: any) {
    res.status(500).send(Error.toString());
  }
};

export let getUser: RequestHandler = async (req, res) => {
  try {
    const user = await sequelize.models.User.findByPk(req.params.id);
    if (user === null) {
      res.status(400).send({ success: false, messasge: "No User Found" });
      console.log("Failed");
    } else {
      res.status(200).send({ success: true, data: user });
    }
  } catch (Error: any) {
    res.status(500).send(Error.toString());
  }
};

export let getUsers: RequestHandler = async (req, res) => {
  try {
    const users = await sequelize.models.User.findAll();
    if (users.length < 1) {
      res.status(400).send({ success: false, message: "Empty Database" });
      console.log("Failed");
    } else {
      res.status(200).send(users);
    }
  } catch (Error: any) {
    res.status(500).send(Error.toString());
  }
};

export let deleteUser: RequestHandler = async (req, res) => {
  try {
    const user = await sequelize.models.User.findByPk(req.params.id);
    if (user === null) {
      res.status(400).send({ success: false, message: "No User Found" });
      console.log("Failed");
    } else {
      // const filepath = path.join(
      //   "D:\\Dikshant\\portal_backend\\src\\public",
      //   user.getDataValue("image_path")
      // );
      // fs.unlink(filepath, () => {
      //   console.log("Image Deleted");
      // });
      await sequelize.models.User.destroy({
        where: { id: req.params.id },
      });
      res.status(200).send({ success: true, message: "User Deleted" });
    }
  } catch (Error: any) {
    res.status(500).send(Error.toString());
  }
};

export let updateUser: RequestHandler = async (req, res) => {
  try {
    const user = await sequelize.models.User.findByPk(req.params.id);
    if (user == null) {
      res.status(400).send({ success: false, message: "No User Found" });
    } else {
      if (
        req.file == undefined &&
        req.body.password === user.getDataValue("password")
      ) {
        user.update(req.body);
        res.status(200).send({
          success: true,
          message: "User details Updated",
        });
      } else if (
        req.file != undefined &&
        req.body.password === user.getDataValue("password")
      ) {
        // const filepath = path.join(
        //   "D:\\Dikshant\\portal_backend\\src\\public",
        //   user.getDataValue("image_path")
        // );
        // fs.unlink(filepath, () => {
        //   console.log("Image Deleted");
        // });
        const dbpath = await formatString(req.file?.path!);
        user.update({ image_path: dbpath });
        user.update(req.body);
        res
          .status(200)
          .send({ success: true, message: "User details Updated" });
      } else if (
        req.file === undefined &&
        req.body.password != user.getDataValue("password")
      ) {
        user.update(req.body);
        const pass = await securePassword(req.body.password);
        user.update({ password: pass });
        res
          .status(200)
          .send({ success: true, message: "User details Updated" });
      } else if (
        req.file != undefined &&
        req.body.password != user.getDataValue("password")
      ) {
        // const filepath = path.join(
        //   "D:\\Dikshant\\portal_backend\\src\\public",
        //   user.getDataValue("image_path")
        // );
        // fs.unlink(filepath, () => {
        //   console.log("Image Deleted");
        // });
        const dbpath = await formatString(req.file?.path!);
        user.update({ image_path: dbpath });
        user.update(req.body);
        const pass = await securePassword(req.body.password);
        user.update({ password: pass });
        res
          .status(200)
          .send({ success: true, message: "User details Updated" });
      }
    }
  } catch (Error: any) {
    res.status(500).send(Error.toString());
  }
};

export let loginUser: RequestHandler = async (req, res) => {
  try {
    const exists = await sequelize.models.User.findOne({
      where: { username: req.body.username },
    });
    if (exists === null) {
      res.status(400).send({ success: false, message: "Credentials Invalid" });
      console.log("Failed");
    } else {
      const passwordTrue = await bcrypt.compare(
        req.body.password,
        exists.getDataValue("password")
      );
      if (passwordTrue) {
        const userToken = await generateToken(exists.getDataValue("id"));
        const tokendata = userToken;
        const response = {
          success: true,
          message: "Login Successful",
          data: exists,
          token: tokendata,
          expiresIn: "2h",
        };
        res.status(200).send(response);
      } else {
        res.status(400).send({
          success: false,
          message: "Credentials Invalid",
        });
        console.log("Failed");
      }
    }
  } catch (Error: any) {
    res.status(500).send(Error.toString());
  }
};

module.exports = {
  registerUser,
  getUsers,
  getUser,
  deleteUser,
  updateUser,
  loginUser,
};
