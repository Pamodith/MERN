import express from "express";
import { PORT, mogoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./model/bookModel.js";
import booksRoute from './routes/bookRoute.js'
import cors from 'cors'

const app = express();
app.use(express.json());
app.use(cors())
app.get('/', (request, response) => {
    console.log(request);
    return response.status(200).send('Backend Working');
});

app.use('/books',booksRoute)


mongoose
    .connect(mogoDBURL)
    .then(() => {
        console.log("App connected to the database");
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });
