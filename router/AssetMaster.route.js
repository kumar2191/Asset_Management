import express from "express";
import {
  AddAssetMaster,
  ListAssetMaster,
  UpdateAssetMaster,
} from "../Controller/AssetMaster.controller.js";
const router = express.Router();

router.post("/createAssetMaster", AddAssetMaster);
router.post("/listassetMaster", ListAssetMaster);
router.put("/updateAssetMaster", UpdateAssetMaster);

export default router;
