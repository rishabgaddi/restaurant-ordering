import { Response } from "express";
import userModel from "../models/userModel";
import { verifyToken } from "../utils/token";

export const isAuth = async (req: any, res: Response, next: any) => {
  const token = req.headers["x-access-token"];
  if (token) {
    try {
      const decoded = <any>verifyToken(token);
      const user = await userModel.findOne({ _id: decoded.user._id });
      if (user) {
        req.user = user;
        next();
      } else {
        return res.status(401).json({
          message: "Unauthorized",
        });
      }
    } catch (error) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
  } else {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
};
