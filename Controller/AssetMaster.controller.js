import AssetMaster from "../schema/assetMaster.js";
import Category from "../schema/Category.js";
import { STATUS_CODE } from "../utils/StatusCode.js";

const AddAssetMaster = async (req, res) => {
  try {
    let palyload = req?.body;
    console.log(palyload, "----------------------s");
    let CreateAssetMaster = await AssetMaster.create(palyload);
    res.status(STATUS_CODE.created).send({
      message: "AssetMaster Created Sucessfully",
      data: CreateAssetMaster,
    });
  } catch (error) {
    res.status(STATUS_CODE.badRequest).send({
      message: "AssetMaster Creation failed",
      error,
    });
  }
};

const ListAssetMaster = async (req, res) => {
  try {
    let payload = req.body;
    console.log(payload, "----------------------");
    let AssetMasterData = await AssetMaster.findAll({
      where: {
        isActive: true,
      },
      include: [
        {
          model: Category,
          as: "assetType",
        },
      ],
    });
    res.status(STATUS_CODE.success).send({
      message: "AssetMaster Listed Sucessfully",
      data: AssetMasterData,
    });
  } catch (error) {
    console.log(STATUS_CODE.Forbidden);
    res.status(200).send({
      message: "AssetMaster Creation failed",
      error,
    });
  }
};

const UpdateAssetMaster = async (req, res) => {
  const { assetId, Stock, model, make, asset_type_id } = req.body;
  try {
    const asset = await AssetMaster.findByPk(assetId);

    if (!asset) {
      return res.status(404).send({ message: "Asset not found" });
    }

    asset.asset_type_id = asset_type_id;
    asset.Stock = Stock;
    asset.model = model;
    asset.make = make;
    await asset.save();

    res.status(STATUS_CODE.success).send({
      message: "Asset name updated successfully",
      updatedAsset: asset,
    });
  } catch (error) {
    console.log(error);
    res.status(STATUS_CODE.badRequest).send({
      message: "Failed to update asset name",
      error,
    });
  }
};
export { AddAssetMaster, ListAssetMaster, UpdateAssetMaster };
