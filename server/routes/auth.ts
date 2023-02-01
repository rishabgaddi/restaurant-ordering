import express, { Request, Response } from "express";

import userModel from "../models/userModel";
import { createToken } from "../utils/token";

const Router = express.Router();

Router.post(
  "/register",
  async (req: Request, res: Response): Promise<Response> => {
    const { name, email, gender, dob, country_code, phone } = req.body;
    if (
      name &&
      name.length > 0 &&
      email &&
      email.length > 0 &&
      gender &&
      gender.length > 0 &&
      dob &&
      dob.length > 0 &&
      country_code &&
      country_code.length > 0 &&
      phone &&
      phone.length > 0
    ) {
      try {
        const user = await userModel.create({
          name,
          email,
          gender,
          dob,
          country_code,
          phone,
        });
        const token = createToken({ user });
        await userModel.updateOne({ _id: user._id }, { $set: { token } });
        user["token"] = token;
        return res.status(200).json({
          user,
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

Router.get("/otp", async (req: Request, res: Response): Promise<Response> => {
  const { phone, country_code } = req.body;
  if (phone && phone.length > 0 && country_code && country_code.length > 0) {
    const newOTP = Math.floor(1000 + Math.random() * 9000);
    console.log(newOTP);
    return res.status(200).json({
      otp_code: newOTP,
    });
  }
  return res.status(400).json({
    message: "Invalid request.",
  });
});

Router.post(
  "/login",
  async (req: Request, res: Response): Promise<Response> => {
    const { phone, country_code, otp_code } = req.body;
    if (
      phone &&
      phone.length > 0 &&
      country_code &&
      country_code.length > 0 &&
      otp_code &&
      otp_code.length > 0
    ) {
      if (otp_code === "1234") {
        const user = await userModel
          .findOne({
            phone,
            country_code,
          })
          .lean();
        if (user) {
          const token = createToken({ user });
          await userModel.updateOne({ _id: user._id }, { $set: { token } });
          user["token"] = token;
          return res.status(200).json({
            user,
          });
        }
        return res.status(400).json({
          message: "Invalid phone number.",
        });
      }
      return res.status(400).json({
        message: "Invalid OTP code.",
      });
    }
    return res.status(400).json({
      message: "Invalid request.",
    });
  }
);

export default Router;
