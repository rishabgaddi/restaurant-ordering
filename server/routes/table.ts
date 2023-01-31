import express, { Request, Response } from "express";
import { isAuth } from "../middleware/auth";
import tableModel from "../models/tableModel";

const Router = express.Router();

Router.post(
  "/create",
  isAuth,
  async (req: Request, res: Response): Promise<Response> => {
    const { number, restaurant_id } = req.body;
    if (
      number &&
      number.length > 0 &&
      restaurant_id &&
      restaurant_id.length > 0
    ) {
      try {
        const table = await tableModel.create({
          number,
          restaurant: restaurant_id,
        });
        return res.status(200).json({
          table,
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
