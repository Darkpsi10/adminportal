import { getTypes } from "./typesControllers";
import bodyParser from "body-parser";
import express from "express";

export const type_route = express.Router();
type_route.use(bodyParser.urlencoded({ extended: true }));
type_route.use(bodyParser.json());
type_route.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

type_route.get("/alltypes", async function (req, res, next) {
  getTypes(req, res, next);
});
