// Category.js

import { Sequelize, DataTypes } from "sequelize";
import { sequelize } from "../config/DBConnection.js";
// import { v4 as uuidv4 } from "uuid";

const AssetCategory = sequelize.define("AssetCategory", {
  uuid: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
  },
  Categorytype: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

AssetCategory.sync();

export default AssetCategory;
