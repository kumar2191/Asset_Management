import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../schema/User.js";
import { STATUS_CODE } from "../utils/StatusCode.js";

const CreateUser = async (req, res) => {
  try {
    let userData = req.body;
    console.log(userData);
    userData.username = userData?.username?.toLowerCase();
    let exUser = await User.findOne({
      where: {
        email: userData?.email,
      },
    });

    if (exUser) {
      return res.status(STATUS_CODE.badRequest).send(exUser);
    }

    let hashPassword = await bcrypt.hash(userData.password, 10);

    userData.password = hashPassword;

    let user = await User.create(userData);
    res.status(STATUS_CODE.created).send({
      message: "User Created Sucessfully",
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(STATUS_CODE.badRequest).send({
      message: "User Creation failed",
      error,
    });
  }
};

const LoginUser = async (req, res) => {
  let loginData = req?.body;
  try {
    let exUser = await User.findOne({
      where: {
        email: loginData?.email,
      },
    });

    if (!exUser) {
      return res.status(STATUS_CODE.badRequest).send({
        message: "email doesnot exist",
      });
    }
    let validpassword = await bcrypt.compare(
      loginData.password,
      exUser.dataValues?.password
    );
    if (!validpassword) {
      return res.status(STATUS_CODE.Forbidden).send({
        message: "not a valid password",
      });
    }

    const userToken = jwt.sign(
      { id: exUser.dataValues.uuid, email: exUser.dataValues?.email },
      process.env.JWT_KEY
    );

    res.status(STATUS_CODE.success).header("auth", userToken).send({
      message: "login sucessfull",
      data: exUser,
      token: userToken,
    });
  } catch (error) {
    res.status(STATUS_CODE.badRequest).send({
      message: "login failed",
      error,
    });
  }
};

const ListUser = async (req, res) => {
  try {
    // example payload
    //   {
    //     "where":{
    //         "isActive":true,
    //         "username":"anitha"
    //     }
    // }
    let payload = req.body;

    let UserData = await User.findAll(payload);
    res.status(STATUS_CODE.success).send({
      message: "User data fetch sucessfull",
      data: UserData,
    });
  } catch (error) {
    console.log(error);
    res.status(STATUS_CODE.badRequest).send({
      message: "login failed",
      error,
    });
  }
};

const GetPerticularData = async (req, res) => {
  try {
    console.log(req.user);
    let result = await User.findOne({
      where: {
        uuid: req.user.id,
      },
    });
    delete (await result.password);
    res.status(STATUS_CODE.success).send({
      message: "User data fetch sucessfull",
      data: result,
    });
  } catch (error) {
    res.status(STATUS_CODE.badRequest).send({
      message: "failed to load",
      error,
    });
  }
};
export { CreateUser, LoginUser, ListUser, GetPerticularData };
