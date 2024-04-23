import { DataTypes, Sequelize } from "sequelize";
import { sequelize } from "../config/DBConnection.js";
import Employee from "./User.js";
import AssetMaster from "./assetMaster.js";
const AssetHistory = sequelize.define("AssetHistory", {
  uuid: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
  },
  asset_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  action: {
    type: DataTypes.ENUM("Issued", "Returned", "Scrapped"),
    allowNull: false,
  },
  employee_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  notes: {
    type: DataTypes.TEXT,
  },
});
AssetHistory.belongsTo(Employee, {
  foreignKey: "employee_id",
  targetKey: "uuid",
  as: "employee",
});

AssetHistory.belongsTo(AssetMaster, {
  foreignKey: "asset_id",
  targetKey: "uuid",
  as: "assetMaster",
});
AssetHistory.sync();

export default AssetHistory;
