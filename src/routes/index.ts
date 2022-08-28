import { Router } from "express";
import routeAccount from "./account";
const routes = Router();

routes.use("/account", routeAccount);

export default routes;
