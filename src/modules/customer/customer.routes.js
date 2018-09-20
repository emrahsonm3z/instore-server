import { Router } from "express";

import { create, getUserInfo } from "./customer.controller";
import { customerAuth } from "./customer";

const routes = Router();

routes.post("/", create);
routes.get("/hello", customerAuth, (req, res) => {
  console.log("req.user", req.user);
  res.send(`Hello ${req.user.firstName}`);
});

routes.get("/me", customerAuth, getUserInfo);

export default routes;
