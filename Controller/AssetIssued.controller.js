import AssetIssued from "../schema/assetIssued.js";
import AssetHistory from "../schema/assetHistory.js";
import AssetMaster from "../schema/assetMaster.js";
import User from "../schema/User.js";
import AssetCategory from "../schema/Category.js";
import { STATUS_CODE } from "../utils/StatusCode.js";

const CreatAssetIssue = async (req, res) => {
  try {
    let payload = req.body;
    let assetMasterDate = await AssetMaster.findByPk(payload?.asset_id);
    console.log(assetMasterDate, "-------------------");
    if (assetMasterDate?.status === "Out off Stock") {
      res.status(STATUS_CODE.empty).send({
        message: "Asset is Out off Stock",
      });
    }
    if (assetMasterDate.Stock > 0) {
      assetMasterDate.Stock = Number(assetMasterDate?.Stock) - 1;

      if (Number(assetMasterDate.Stock) < 1) {
        assetMasterDate.status = "Out off Stock";
      }
    }
    let historyPayload = {
      asset_id: payload?.asset_id,
      action: "Issued",
      employee_id: payload?.employee_id,
      notes: payload?.notes,
    };
    let assetIssuedPayload = {
      asset_id: payload?.asset_id,
      action: "Issued",
      return_date: "",
      employee_id: payload?.employee_id,
    };
    await assetMasterDate.save();
    await AssetHistory.create(historyPayload);
    let result = await AssetIssued.create(assetIssuedPayload);
    res.status(STATUS_CODE.created).send({
      message: "created sucessfull",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Failed create asset",
      error,
    });
  }
};

const ListIssue = async (req, res) => {
  try {
    let data = await AssetHistory.findAll({
      include: [
        {
          model: AssetMaster,
          as: "assetMaster",
          include: [
            {
              model: AssetCategory,
              as: "assetType",
            },
          ],
        },
        {
          model: User,
          as: "employee",
        },
      ],
    });
    res.status(STATUS_CODE.success).send({
      message: "Listed sucessfull",
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Failed List",
      error,
    });
  }
};

export { CreatAssetIssue, ListIssue };
