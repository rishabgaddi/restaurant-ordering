import { Request, Response } from "express";
import restaurantModel from "../models/restaurantModel";

export const ownsRestaurant = async (
  req: Request,
  res: Response,
  next: any
) => {
  const token = req.headers["x-access-token"];
  let { restaurant_id } = req.body;
  if (!restaurant_id) {
    const data = req.query;
    restaurant_id = data.restaurant_id;
  }
  if (token && restaurant_id) {
    const restaurant = await restaurantModel
      .findOne({
        _id: restaurant_id,
      })
      .populate({
        path: "user",
        match: { token },
      });
    if (restaurant && restaurant.user) {
      next();
    } else {
      return res.status(403).json({
        message: "You do not have access to this resource.",
      });
    }
  }
};
