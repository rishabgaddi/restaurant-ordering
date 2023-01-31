import express, { Request, Response } from "express";
import { isAuth } from "../middleware/auth";
import restaurantModel from "../models/restaurantModel";

const Router = express.Router();

Router.post(
  "/create",
  isAuth,
  async (req: Request, res: Response): Promise<Response> => {
    const { name, user_id } = req.body;
    if (name && name.length > 0 && user_id && user_id.length > 0) {
      try {
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

export default Router;
