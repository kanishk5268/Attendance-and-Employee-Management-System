import express,{json,urlencoded} from "express";
import cors from "cors";
import adminRoute from "./routes/admin.route";
import { urlencoded } from "express";

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

//Routes
app.use("/api/v1/admin", adminRoute);

export default app;
