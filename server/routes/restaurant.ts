import express, { Request, Response } from "express";
import { isAuth } from "../middleware/auth";
import restaurantModel from "../models/restaurantModel";
import userModel from "../models/userModel";

const Router = express.Router();

Router.post(
  "/create",
  isAuth,
  async (req: Request, res: Response): Promise<Response> => {
    const { name, user_id } = req.body;
    if (name && name.length > 0 && user_id && user_id.length > 0) {
      try {
        const user = await userModel.findOne({
          _id: user_id,
        });
        if (!user) {
          return res.status(400).json({
            message: "User not found.",
          });
        }
        const restaurant = await restaurantModel.create({
          name,
          user: user_id,
        });
        return res.status(200).json({
          restaurant,
        });
      } catch (error) {
        return res.status(500).json({
          message: "Internal server error.\n" + error,
        });
      }
    }
    return res.status(400).json({
      message: "Invalid request.",
    });
  }
);

Router.get(
  "/",
  isAuth,
  async (req: Request, res: Response): Promise<Response> => {
    const token = req.headers["x-access-token"];
    try {
      const user = await userModel.findOne({
        token,
      });
      if (!user) {
        return res.status(400).json({
          message: "User not found.",
        });
      }
      const restaurants = await restaurantModel.find({ user: user._id });
      return res.status(200).json({
        restaurants,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Internal server error.\n" + error,
      });
    }
  }
);

export default Router;
