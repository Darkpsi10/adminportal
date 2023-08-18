import { routes } from "./config/mainRoutes";
import { sequelize } from "./config/config";
import express from "express";

const app = express();

app.use("/", routes);

const port = 3000;
app.listen(port, async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});
