import express, { Express, Request, Response, Application } from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import kycRouter from './routes/kycRouter';

//For env file
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

app.use(express.json())
app.use('/api', kycRouter);
app.get("/", (req: Request, res: Response) => {
  res.send("welcome to Express & Typescript Server");
});


connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server is Fire at http://localhost:${port}`);
  });
  console.log("Env", process.env.SUMSUB_SECRET, process.env.SUMSUB_TOKEN);
})

