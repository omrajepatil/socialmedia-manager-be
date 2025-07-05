import express from "express"
import userRouter from "./routes/user.js";
import mongoose, { mongo } from "mongoose";

const app = express();


const port = 3000;

mongoose.connect("mongodb://localhost:27017/social-media-manager").then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.error("Failed to connect to MongoDB", err);
});

app.use(express.json());
app.use("/user", userRouter)

app.listen(port, () => {
    console.log(`server started at ${port}`)
})