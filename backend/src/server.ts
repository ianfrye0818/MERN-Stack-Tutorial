//initialize dotenv
import dotenv from 'dotenv';
dotenv.config();
//library imports
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import mongoose, { ConnectOptions } from 'mongoose';
//custom imports

//global variables
const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI as string;

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());

//connect to db and start listening for requests
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true } as ConnectOptions)
  .then(() => {
    console.log('Connected to the database');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
