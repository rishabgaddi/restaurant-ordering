import express, { Request, Response } from "express";

import { isAuth } from "../middleware/auth";
import orderModel from "../models/orderModel";
import paymentModel from "../models/paymentModel";

const Router = express.Router();

Router.post(
  "/add",
  isAuth,
  async (req: Request, res: Response): Promise<Response> => {
    const {
      order_id,
      amount,
      payment_type,
      table_id,
      restaurant_id,
      transaction_id,
      user_id,
    } = req.body;
    if (
      order_id &&
      order_id.length > 0 &&
      amount &&
      amount >= 0 &&
      payment_type &&
      payment_type.length > 0 &&
      table_id &&
      table_id.length > 0 &&
      restaurant_id &&
      restaurant_id.length > 0 &&
      transaction_id &&
      transaction_id.length > 0 &&
      user_id &&
      user_id.length > 0
    ) {
      try {
        const payment = await paymentModel.create({
          order: order_id,
          amount,
          payment_type,
          table: table_id,
          restaurant: restaurant_id,
          transaction_id,
          user: user_id,
        });
        await orderModel.findOneAndUpdate(
          {
            _id: order_id,
          },
          {
            status: "paid",
          },
          {
            new: true,
          }
        );
        return res.status(200).json({
          payment,
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
