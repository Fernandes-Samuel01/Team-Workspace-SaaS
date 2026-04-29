import dotenv from "dotenv"
dotenv.config();

import express from "express";
import { connectDB } from "./db/connectDB.js";
import authRoutes from "./routes/auth.route.js"
import cookieParser from "cookie-parser";
import cors from "cors";
import workspaceRoutes from "./routes/workspaceRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS);

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    optionsSuccessStatus: 200,
}))
app.use(express.json());
app.use(cookieParser());

app.get('/', (req,res)=>{
    res.send("Hello World!!");
});

app.use("/api/auth", authRoutes)
app.use("/api/workspaces", workspaceRoutes);
app.use("/api/tasks", taskRoutes);

app.listen(port,()=>{
    connectDB();
    console.log(`Server is running in http://localhost:${port}`);
})
