import User from "../schema/User.js";
import AssetHistory from "../schema/assetHistory.js";
import AssetMaster from "../schema/assetMaster.js";
import { STATUS_CODE } from "../utils/StatusCode.js";

const AddAssetHistory = async (req, res) => {
  try {
    let palyload = req?.body;

    let assetdata = await AssetMaster?.findByPk(palyload.asset_id);
    console.log(assetdata.dataValues, "-----------------");
    if (assetdata.dataValues?.status === "Out off Stock") {
      return res.status(400).send({
        message: "Asset is Out off Stock",
      });
    }
    if (assetdata?.Stock > 0) {
      assetdata.Stock = Number(assetdata?.Stock) - 1;
      if (assetdata.Stock === 0) {
        assetdata.status = "Out off Stock";
      }
    }
    await assetdata.save();

    let CreateAssetHistory = await AssetHistory.create(palyload);

    res.status(STATUS_CODE.created).send({
      message: "History Created Sucessfully",
      data: CreateAssetHistory,
    });
  } catch (error) {
    res.status(STATUS_CODE.badRequest).send({
      message: "History Creation failed",
      error,
    });
  }
};

const ListHistory = async (req, res) => {
  try {
    let ListData = await AssetHistory.findAll({
      include: [
        {
          model: User,
          as: "employee",
        },
        {
          model: AssetMaster,
          as: "assetMaster",
        },
      ],
    });
    res.status(STATUS_CODE.success).send({
      message: "History Listed Sucessfully",
      data: ListData,
    });
  } catch (error) {
    console.log(error);
    res.status(STATUS_CODE.badRequest).send({
      message: "History Listed failed",
      error,
    });
  }
};

export { AddAssetHistory, ListHistory };
