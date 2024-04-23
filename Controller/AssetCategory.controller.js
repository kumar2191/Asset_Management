import AssetCategory from "../schema/Category.js";
import { STATUS_CODE } from "../utils/StatusCode.js";

const AddAssetCategory = async (req, res) => {
  try {
    let palyload = req?.body;
    let CreateAssetCategory = await AssetCategory.create(palyload);

    res.status(STATUS_CODE.created).send({
      message: "Category Sucessfully",
      data: CreateAssetCategory,
    });
  } catch (error) {
    res.status(STATUS_CODE.badRequest).send({
      message: "Category Creation failed",
      error,
    });
  }
};

const ListCategory = async (req, res) => {
  try {
    let CategoryData = await AssetCategory.findAll({
      where: {
        isActive: true,
      },
    });
    res.status(STATUS_CODE.created).send({
      message: "AssetCategory Listed Sucessfully",
      data: CategoryData,
    });
  } catch (error) {
    res.status(STATUS_CODE.badRequest).send({
      message: "AssetCategory Listed failed",
      error,
    });
  }
};

export { AddAssetCategory, ListCategory };
