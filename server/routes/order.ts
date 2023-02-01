import express, { Request, Response } from "express";

import { isAuth } from "../middleware/auth";
import orderModel from "../models/orderModel";

const Router = express.Router();

Router.post(
  "/create",
  isAuth,
  async (req: Request, res: Response): Promise<Response> => {
    const {
      restaurant_id,
      user_id,
      items,
      total_items,
      table_id,
      amount,
      tax,
      total_amount,
    } = req.body;
    if (
      restaurant_id &&
      restaurant_id.length > 0 &&
      user_id &&
      user_id.length > 0 &&
      items &&
      items.length > 0 &&
      total_items &&
      total_items > 0 &&
      table_id &&
      table_id.length > 0 &&
      amount &&
      amount >= 0 &&
      tax &&
      tax >= 0 &&
      total_amount &&
      total_amount >= 0
    ) {
      try {
        const dishes = [];
        for (const item of items) {
          dishes.push({
            dish: item.item_id,
            quantity: item.item_qty,
          });
        }
        const order = await orderModel.create({
          restaurant: restaurant_id,
          user: user_id,
          dishes,
          total: total_items,
          table: table_id,
          amount,
          tax,
          total_amount,
        });
        return res.status(200).json({
          order,
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

Router.put(
  "/update/status",
  isAuth,
  async (req: Request, res: Response): Promise<Response> => {
    const { order_id, status } = req.body;
    if (order_id && order_id.length > 0 && status && status.length > 0) {
      try {
        const order = await orderModel.findOneAndUpdate(
          {
            _id: order_id,
          },
          {
            status,
          },
          {
            new: true,
          }
        );
        if (!order) {
          return res.status(400).json({
            message: "Order not found.",
          });
        }
        return res.status(200).json({
          order,
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
