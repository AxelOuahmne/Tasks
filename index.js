import { db } from "./config.js";
import express from "express";
import mongoose from "mongoose";
import taskRouter from "./routes/tasksRoute.js";
import cors from 'cors';
import path from 'path'; // Import the 'path' module
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Use import.meta.url to get the current file's URL
const __filename = fileURLToPath(import.meta.url);
// Use dirname to get the directory name
const __dirname = dirname(__filename);



const app = express();

// Use path.resolve to get the absolute path
app.use(express.static(path.resolve(__dirname, "public")));
app.use(cors());
app.use('/tasks', taskRouter);

mongoose.connect(db).then(() => {
    app.listen(5000, () => {
        console.log("App is running on port 5000");
    });
}).catch(error => {
    console.log(error);
});

