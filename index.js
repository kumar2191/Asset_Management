import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";

import { connectDB } from "./config/DBConnection.js";
import UserRouter from "./router/User.router.js";
import AssetCategory from "./router/AddAssetCategory.route.js";
import AssetMaster from "./router/AssetMaster.route.js";
import History from "./router/AssetHistory.router.js";
import Issue from "./router/AssetIssued.router.js";
import ScrappedAsset from "./router/ScrappedAsset.router.js";

const app = express();

dotenv.config();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("view engine", "jade");
app.set("views", "./view");

// jade UI
app.get("/", (req, res) => {
  res.render("index");
});
app.get("/login", (req, res) => {
  res.render("login");
});
app.get("/createmaster", (req, res) => {
  res.render("createAssetmaster");
});
app.get("/listasset", (req, res) => {
  res.render("listAssetMaster");
});
app.get("/issueList", (req, res) => {
  res.render("issue");
});

// routes
app.use("/api", UserRouter);
app.use("/api", AssetCategory);
app.use("/api", AssetMaster);
app.use("/api", History);
app.use("/api", Issue);
app.use("/api", ScrappedAsset);

// DB Connection
connectDB();

app.listen(4000, () => {
  console.log("app is listening in port 4000");
});
