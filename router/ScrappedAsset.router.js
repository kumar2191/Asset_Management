import {
  CreatScrappedAsset,
  ListScrapped,
} from "../Controller/ScrappedAsset.controller.js";
import express from "express";
const router = express.Router();
router.post("/createScrappe", CreatScrappedAsset);
router.get("/listScrappe", ListScrapped);

export default router;
