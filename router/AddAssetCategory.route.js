import express from "express";
import {
  AddAssetCategory,
  ListCategory,
} from "../Controller/AssetCategory.controller.js";
const router = express.Router();

router.post("/createCategory", AddAssetCategory);
router.get("/listCategory", ListCategory);

export default router;
