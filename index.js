const dotenv = require("dotenv");
const connectDB = require("./database/connectDB");
const app = require("./app");

dotenv.config({ path: "./.env" });

connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port: ${process.env.PORT}`);
    });
  })
  .catch((error) => console.log(`Sorry cannot connect to the database`));
