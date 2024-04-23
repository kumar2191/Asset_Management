import jwt from "jsonwebtoken";
import { STATUS_CODE } from "../utils/StatusCode";

const auth = async (req, res, next) => {
  const token = req.headers.token;
  if (!token)
    return res
      .status(STATUS_CODE.Unauthorized)
      .send("Access Denide no token provide");
  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.user = decoded;
    console.log(req.user);
    next();
  } catch (error) {
    res.send("invalid token");
  }
};

export default auth;
