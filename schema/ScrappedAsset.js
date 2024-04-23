// Category.js

import { Sequelize, DataTypes } from "sequelize";
import { sequelize } from "../config/DBConnection.js";
import Employee from "./User.js";
import AssetMaster from "./assetMaster.js";
// import { v4 as uuidv4 } from "uuid";

const AssetScrapped = sequelize.define("AssetScrapped", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
  },
  asset_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  employee_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },

  scrap_reason: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

AssetScrapped.belongsTo(Employee, {
  foreignKey: "employee_id",
  targetKey: "uuid",
  as: "employee",
});

AssetScrapped.belongsTo(AssetMaster, {
  foreignKey: "asset_id",
  targetKey: "uuid",
  as: "assetMaster",
});

AssetScrapped.sync();

export default AssetScrapped;
