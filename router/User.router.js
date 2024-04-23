import express from "express";
import {
  CreateUser,
  GetPerticularData,
  ListUser,
  LoginUser,
} from "../Controller/User.controller.js";
import auth from "../auth/auth.js";
const router = express.Router();

router.post("/createUser", CreateUser);
router.post("/login", LoginUser);
router.post("/listall", ListUser);
router.get("/getuser", auth, GetPerticularData);
export default router;
