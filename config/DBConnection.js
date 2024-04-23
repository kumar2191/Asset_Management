import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("kt", "postgres", "1044", {
  host: "localhost",
  dialect: "postgres",
});

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Db Connected successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
