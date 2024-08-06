import express, { Express, Request, Response, Application } from 'express';
import dotenv from 'dotenv';

//For env file
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

app.get('/', (req: Request, res: Response) => {
  res.send('welcome to Express & Typescript Server');
});

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});