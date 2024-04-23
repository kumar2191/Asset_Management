import express from "express";
import {
  CreatAssetIssue,
  ListIssue,
} from "../Controller/AssetIssued.controller.js";
const router = express.Router();

router.post("/createAssetIssue", CreatAssetIssue);
router.get("/listissue", ListIssue);

export default router;
