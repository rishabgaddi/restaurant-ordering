import express, { Request, Response } from "express";
const app = express();

// Parse JSON
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "Hello, this is Node.js, Express.js and TypeScript.",
  });
});

app.listen(process.env.APP_PORT, () => {
  console.log(`Server is running on port ${process.env.APP_PORT}`);
});
