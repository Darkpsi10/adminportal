import express from "express";
import { user_route } from "../user/userRoutes";
import { ind_route } from "../industry/indRoutes";
import { type_route } from "../types/typesRoutes";

export const routes = express.Router();

routes.use(user_route);
routes.use(ind_route);
routes.use(type_route);
