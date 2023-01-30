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

app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "Hello, this is Node.js, Express.js and TypeScript.",
  });
});

app.listen(process.env.APP_PORT, () => {
  console.log(`Server is running on port ${process.env.APP_PORT}`);
});
