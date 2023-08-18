import { sequelize } from "../industry/indModels";
import { RequestHandler } from "express";

export let addInd: RequestHandler = async (req, res) => {
  try {
    const email = await sequelize.models.Ind.findOne({
      where: { email: req.body.email },
    });
    const ind = sequelize.models.Ind.build({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      ind_name: req.body.ind_name,
      ind_type: req.body.ind_type,
      address: req.body.address,
      address2: req.body.address2,
      email: req.body.email,
      email2: req.body.email2,
      phone: req.body.phone,
      phone2: req.body.phone2,
      DOB: req.body.DOB,
      status: req.body.status,
      salary: req.body.salary,
    });
    if (email === null) {
      await ind.save();
      res.status(200).send({ success: true, data: ind });
    } else {
      res.status(400).send({ success: false, message: "Email already in Use" });
      console.log("Failed");
    }
  } catch (Error: any) {
    res.status(500).send(Error.toString());
  }
};

export let getInd: RequestHandler = async (req, res) => {
  try {
    const ind = await sequelize.models.Ind.findByPk(req.params.id);
    if (ind === null) {
      res.status(400).send({ success: false, messasge: "No User Found" });
      console.log("Failed");
    } else {
      const result = await sequelize.query(
        `SELECT industry.ind_type, types.name
        FROM industry
        INNER JOIN types ON industry.ind_type = types.id
        WHERE industry.ind_type = ${ind.getDataValue("ind_type")}
        LIMIT 1;`
      );
      const date = await sequelize.query(
        `SELECT DATE_FORMAT(DOB, '%d/%m/%Y') AS formatted_date
        FROM industry
        WHERE industry.id = ${ind.getDataValue("id")}
        LIMIT 1;`
      );
      const date_format: any = date[0][0];
      const firstRow: any = result[0][0];
      res.status(200).send({
        success: true,
        data: Object.assign({}, ind.dataValues, firstRow, date_format),
      });
    }
  } catch (Error: any) {
    res.status(500).send(Error.toString());
  }
};

export let getInds: RequestHandler = async (req, res) => {
  try {
    const inds = await sequelize.models.Ind.findAll();
    if (inds.length < 1) {
      res.status(400).send({ success: false, message: "Empty Database" });
      console.log("Failed");
    } else {
      const result = await sequelize.query(
        `SELECT industry.ind_type, types.name
        FROM industry
        INNER JOIN types ON industry.ind_type = types.id
        ORDER BY industry.id;`
      );
      const date = await sequelize.query(
        `SELECT DATE_FORMAT(DOB, '%d/%m/%Y') AS formatted_date
        FROM industry
        ORDER BY industry.id;`
      );
      const date_format: any = date[0];
      const row: Array<any> = result[0];
      const format = inds.map((item, index) => {
        return {
          ...item.dataValues,
          ...row[index],
          ...date_format[index],
        };
      });
      res.status(200).send({
        success: true,
        data: format,
      });
    }
  } catch (Error: any) {
    res.status(500).send(Error.toString());
  }
};

export let deleteInd: RequestHandler = async (req, res) => {
  try {
    const ind = await sequelize.models.Ind.findByPk(req.params.id);
    if (ind === null) {
      res.status(400).send({ success: false, message: "No User Found" });
      console.log("Failed");
    } else {
      await sequelize.models.Ind.destroy({
        where: { id: req.params.id },
      });
      res.status(200).send({ success: true, message: "User Deleted" });
    }
  } catch (Error: any) {
    res.status(500).send(Error.toString());
  }
};

export let updateInd: RequestHandler = async (req, res) => {
  try {
    const ind = await sequelize.models.Ind.findByPk(req.params.id);
    if (ind === null) {
      res.status(400).send({ success: false, message: "No User Found" });
      console.log("Failed");
    } else {
      ind.update(req.body);
    }
    res.status(200).send({ success: true, message: "User details Updated" });
  } catch (Error: any) {
    res.status(500).send(Error.toString());
  }
};

module.exports = {
  addInd,
  getInd,
  getInds,
  updateInd,
  deleteInd,
};
