import multer from "multer";
import jsonwebtoken from "jsonwebtoken";
import { jwtConfig } from "../config/config";
import { RequestHandler } from "express";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/userImages");
  },
  filename: function (req, file, cb) {
    const name = Date.now() + "-" + file.originalname;
    cb(null, name);
  },
});

export const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg formats are allowed"));
    }
  },
});

export const verifyToken: RequestHandler = async (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["Authorization"];
  if (!token) {
    res.status(400).send({ success: false, message: "No Token Found" });
    console.log("Failed");
  } else {
    try {
      const decode = jsonwebtoken.verify(token, jwtConfig.secretKey);
      res
        .status(200)
        .send({ success: true, message: "Token Valid", data: decode });
    } catch (Error: any) {
      res.status(500).send(Error.toString());
    }
    return next();
  }
};

module.exports = { upload, verifyToken };
