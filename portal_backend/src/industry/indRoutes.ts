import { addInd, getInd, getInds, updateInd, deleteInd } from "./indController";
import bodyParser from "body-parser";
import express from "express";

export const ind_route = express.Router();
ind_route.use(bodyParser.urlencoded({ extended: true }));
ind_route.use(bodyParser.json());
ind_route.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
  next();
});

ind_route.post("/addind", async function (req, res, next) {
  addInd(req, res, next);
});

ind_route.get("/ind/:id", async function (req, res, next) {
  getInd(req, res, next);
});

ind_route.get("/allinds", async function (req, res, next) {
  getInds(req, res, next);
});

ind_route.delete("/delind/:id", async function (req, res, next) {
  deleteInd(req, res, next);
});

ind_route.put("/updind/:id", async function (req, res, next) {
  updateInd(req, res, next);
});

module.exports = { ind_route };
