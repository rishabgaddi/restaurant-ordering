import express, { Request, Response } from "express";
import { ownsRestaurant } from "../middleware/access";

import { isAuth } from "../middleware/auth";
import cuisineModel from "../models/cuisineModel";
import dishModel from "../models/dishModel";

const Router = express.Router();

Router.post(
  "/create",
  isAuth,
  ownsRestaurant,
  async (req: Request, res: Response): Promise<Response> => {
    const { name, description, price, cuisine_id, restaurant_id } = req.body;
    if (
      name &&
      name.length > 0 &&
      description &&
      description.length > 0 &&
      price &&
      price >= 0 &&
      cuisine_id &&
      cuisine_id.length > 0 &&
      restaurant_id &&
      restaurant_id.length > 0
    ) {
      try {
        const cuisine = await cuisineModel.findOne({
          _id: cuisine_id,
          restaurant: restaurant_id,
        });
        if (!cuisine) {
          return res.status(400).json({
            message: "Cuisine or restaurant not found.",
          });
        }
        const dish = await dishModel.create({
          name,
          description,
          price,
          cuisine: cuisine_id,
          restaurant: restaurant_id,
        });
        return res.status(200).json({
          dish,
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
  "/restaurant/:id",
  isAuth,
  async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    if (id && id.length > 0) {
      try {
        const dishes = await dishModel.find({ restaurant: id }).populate({
          path: "cuisine",
          select: "name id",
        });
        return res.status(200).json({
          dishes,
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
