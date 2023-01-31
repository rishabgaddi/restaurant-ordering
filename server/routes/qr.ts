import express, { Response } from "express";
import QRCode from "qrcode";
import { ownsRestaurant } from "../middleware/access";

import { isAuth } from "../middleware/auth";
import tableModel from "../models/tableModel";
import { Table } from "../types/table";

const Router = express.Router();

Router.get(
  "/generate",
  isAuth,
  ownsRestaurant,
  async (req: any, res: Response): Promise<Response> => {
    const data = req.query;
    if (data && data.restaurant_id && data.table_id) {
      try {
        const table = <Table>await tableModel
          .findOne({ _id: data.table_id })
          .populate({
            path: "restaurant",
            match: { _id: data.restaurant_id },
            select: "name id",
          })
          .lean();

        if (table) {
          const qrData = JSON.stringify({
            restaurant_id: table.restaurant._id,
            resturant_name: table.restaurant.name,
            table_id: table._id,
            table_number: table.number,
          });

          const url = await QRCode.toDataURL(qrData);
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
