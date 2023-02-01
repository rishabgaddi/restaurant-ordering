import express, { Request, Response } from "express";
import { ownsRestaurant } from "../middleware/access";

import { isAuth } from "../middleware/auth";
import cuisineModel from "../models/cuisineModel";
import dishModel from "../models/dishModel";
import restaurantModel from "../models/restaurantModel";

const Router = express.Router();

Router.post(
  "/create",
  isAuth,
  ownsRestaurant,
  async (req: Request, res: Response): Promise<Response> => {
    const { name, restaurant_id } = req.body;
    if (name && name.length > 0 && restaurant_id && restaurant_id.length > 0) {
      try {
        const restaurant = await restaurantModel.findOne({
          _id: restaurant_id,
        });
        if (!restaurant) {
          return res.status(400).json({
            message: "Restaurant not found.",
          });
        }
        const cuisine = await cuisineModel.create({
          name,
          restaurant: restaurant_id,
        });
        return res.status(200).json({
          cuisine,
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
        const cuisines = await cuisineModel.find({ restaurant: id });
        return res.status(200).json({
          cuisines,
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
  "/dishes/restaurant/:id",
  isAuth,
  async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    if (id && id.length > 0) {
      try {
        const dishes = await dishModel.find({ restaurant: id }).populate({
          path: "cuisine",
          match: { restaurant: id },
          select: "name",
        });
        if (dishes.length > 0) {
          const cuisines: any[] = [];
          dishes.forEach((dish: any) => {
            if (dish.cuisine) {
              const cuisine = cuisines.find(
                (cuisine) => cuisine.name === dish.cuisine.name
              );
              if (cuisine) {
                cuisine.dishes.push(dish);
              } else {
                cuisines.push({
                  name: dish.cuisine.name,
                  dishes: [dish],
                });
              }
            }
          });
          console.log(cuisines);
          return res.status(200).json(cuisines);
        }
        return res.status(200).json({
          cuisines: [],
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
