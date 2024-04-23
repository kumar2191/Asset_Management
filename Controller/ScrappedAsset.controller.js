import ScrappedAsset from "../schema/ScrappedAsset.js";
import User from "../schema/User.js";
import AssetMaster from "../schema/assetMaster.js";
import { STATUS_CODE } from "../utils/StatusCode.js";

const CreatScrappedAsset = async (req, res) => {
  try {
    let payload = req.body;
    console.log(payload);
    let AssetData = await AssetMaster.findByPk(payload?.asset_id);
    AssetData.Stock = Number(AssetData.Stock) + 1;
    AssetData.save();
    let createScrap = await ScrappedAsset.create(payload);
    console.log(AssetData?.Stock, "---------------------");
    res.status(STATUS_CODE.created).send({
      message: "Scrapp Created ",
      data: createScrap,
    });
  } catch (error) {
    console.log(error);
    res.status(STATUS_CODE.badRequest).send({
      message: "Failed to Create Scrapp",
      error,
    });
  }
};

const ListScrapped = async (req, res) => {
  try {
    let ListData = await ScrappedAsset.findAll({
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
      message: "listed Sucessfully",
      data: ListData,
    });
  } catch (error) {
    res.status(STATUS_CODE.badRequest).send({
      message: "listed failed",
      error,
    });
  }
};

export { CreatScrappedAsset, ListScrapped };
