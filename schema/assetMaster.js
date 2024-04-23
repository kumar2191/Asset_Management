import { DataTypes, Sequelize } from "sequelize";
import { sequelize } from "../config/DBConnection.js";
import Category from "./Category.js";

const AssetMaster = sequelize.define(
  "AssetMaster",
  {
    uuid: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    asset_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    asset_serial_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    asset_type_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    make: {
      type: DataTypes.STRING,
    },
    model: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.ENUM("In Stock", "Out off Stock"),
      defaultValue: "In Stock",
    },
    Stock: {
      type: DataTypes.INTEGER,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },

  {
    hooks: {
      beforeValidate: (asset, options) => {
        return AssetMaster.count().then((count) => {
          const paddedCount = String(count + 1).padStart(3, "0");
          asset.asset_serial_number = paddedCount;
        });
      },
    },
  }
);

AssetMaster.belongsTo(Category, {
  foreignKey: "asset_type_id",
  targetKey: "uuid",
  as: "assetType",
});

AssetMaster.sync();

export default AssetMaster;
