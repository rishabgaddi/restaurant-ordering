import express, { Request, Response } from "express";
import QRCode from "qrcode";
import { isAuth } from "../middleware/auth";
import tableModel from "../models/tableModel";

const Router = express.Router();

Router.get(
  "/generate",
  isAuth,
  async (req: any, res: Response): Promise<Response> => {
    const data = req.query;
    if (data && data.restaurant_id && data.table_id) {
      try {
        const table = await tableModel
          .findOne({
            _id: data.table_id,
            restaurant: data.restaurant_id,
          })
          .lean();
        if (table) {
          const url = await QRCode.toDataURL(
            JSON.stringify({
              restaurant_id: data.restaurant_id,
              table_id: data.table_id,
            })
          );
          return res.status(200).json({
            url,
          });
        }
        return res.status(400).json({
          message: "Invalid request.",
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
