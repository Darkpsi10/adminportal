import { RequestHandler } from "express";
import { sequelize } from "./typesModels";

export let getTypes: RequestHandler = async (req, res) => {
  try {
    const types = await sequelize.models.Types.findAll();
    if (types.length < 1) {
      res.status(400).send({ success: false, message: "Empty Database" });
      console.log("Failed");
    } else {
      res.status(200).send(types);
    }
  } catch (Error: any) {
    res.status(500).send(Error.toString());
  }
};

module.exports = { getTypes };
