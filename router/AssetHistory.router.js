import express from "express";
import {
  AddAssetHistory,
  ListHistory,
} from "../Controller/AssetHistory.controller.js";
const router = express.Router();

router.post("/createHistory", AddAssetHistory);
router.get("/listHistory", ListHistory);

export default router;
