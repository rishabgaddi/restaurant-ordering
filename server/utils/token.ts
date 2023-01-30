import jwt from "jsonwebtoken";
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

export const createToken = (payload: any) => {
  return jwt.sign(payload, `${JWT_SECRET}`, {
    expiresIn: "2h",
  });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, `${JWT_SECRET}`);
};
