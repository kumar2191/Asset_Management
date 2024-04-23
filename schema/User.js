// User.js

import { Sequelize, DataTypes } from "sequelize";
import { sequelize } from "../config/DBConnection.js";
// import { v4 as uuidv4 } from "uuid";

const User = sequelize.define("User", {
  uuid: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

User.sync();

export default User;
