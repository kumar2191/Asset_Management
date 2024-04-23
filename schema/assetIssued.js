// Category.js

import { Sequelize, DataTypes } from "sequelize";
import { sequelize } from "../config/DBConnection.js";
import Employee from "./User.js";
import AssetMaster from "./assetMaster.js";
// import { v4 as uuidv4 } from "uuid";

const AssetIssued = sequelize.define("AssetIssued", {
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
  action: {
    type: DataTypes.ENUM("Upgrade", "Repair", "Resignation", "Issued"),
    allowNull: false,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

AssetIssued.belongsTo(Employee, {
  foreignKey: "employee_id",
  targetKey: "uuid",
  as: "employee",
});

AssetIssued.belongsTo(AssetMaster, {
  foreignKey: "asset_id",
  targetKey: "uuid",
  as: "assetMaster",
});

AssetIssued.sync();

export default AssetIssued;
