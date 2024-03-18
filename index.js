import { config } from "dotenv";
import connectDB from "./database/connectDB";
import { listen } from "./app";

config({ path: "./.env" });

connectDB()
  .then(() => {
    listen(process.env.PORT, () => {
      console.log(`Server is running on port: ${process.env.PORT}`);
    });
  })
  .catch((error) => console.log(`Sorry cannot connect to the database`));
