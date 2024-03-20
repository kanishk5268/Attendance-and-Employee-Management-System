import express, { json, urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import adminRouter from "./routes/admin.route.js";
import userRouter from "./routes/user.route.js";

//App
const app = express();

// Middlewares
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(
  json({
    limit: "3mb",
  })
);
app.use(
  urlencoded({
    limit: "3mb",
    extended: true,
  })
);
app.use(express.static("public"));
app.use(cookieParser());

//Routes
app.use("/api/v1/user",userRouter);
app.use("/api/v1/admin", adminRouter);

export default app;
