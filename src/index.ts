import express, { Express, Request, Response, Application } from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';

//For env file
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

app.get("/", (req: Request, res: Response) => {
  res.send("welcome to Express & Typescript Server");
});



connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server is Fire at http://localhost:${port}`);
  });
})

