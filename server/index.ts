require("dotenv").config();
import express, { Request, Response } from "express";

const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const mongoose = require("mongoose");
let session = require("express-session");

const app = express();

app.use(morgan("combined"));
app.use(helmet());
app.use(express.json());
app.use(cors());

import authRouter from "./routes/auth";
import qrRouter from "./routes/qr";
import restaurantRouter from "./routes/restaurant";
import tableRouter from "./routes/table";
import cuisineRouter from "./routes/cuisine";
import dishRouter from "./routes/dish";
import orderRouter from "./routes/order";
import paymentRouter from "./routes/payment";

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);

mongoose.connect(
  `${process.env.MONGO_DB}`,
  {
    useNewUrlParser: true,
  },
  (error: any) => {
    if (error) {
      console.log("Error: " + error);
    } else {
      console.log("DB connect");
    }
  }
);

app.use("/auth", authRouter);
app.use("/qr", qrRouter);
app.use("/restaurant", restaurantRouter);
app.use("/table", tableRouter);
app.use("/cuisine", cuisineRouter);
app.use("/dish", dishRouter);
app.use("/order", orderRouter);
app.use("/payment", paymentRouter);

app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "Backend server for Restaurant App",
  });
});

app.listen(process.env.APP_PORT, () => {
  console.log(`Server is running on port ${process.env.APP_PORT}`);
});
