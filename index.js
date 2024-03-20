import { config } from "dotenv";
import connectDB from "./database/connectDB.js";
import app  from "./app.js";

config({ path: "./.env" });

connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port: ${process.env.PORT}`);
    });
  })
  .catch((error) => {if(error){console.log(error)}});
